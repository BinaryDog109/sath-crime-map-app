import { useReducer, useEffect, useState, useRef } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

// A general-purpose CRUD hook.
// Usage:
// const {response, addDoc, deleteDoc, updateDoc, getDoc} = useCRUD()
// add/delete/update/getDoc are functions
// The variable "response" is a set of state that represents the result of each CRUD operation
// E.g, response.isPending can show if the add/delete/update/getDoc function is pending
// const {response, addDoc, deleteDoc, updateDoc, getDoc} = useCRUD()
// addDoc({name:"xxx", address: "aaa", description: "xxx"})
const initState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case "PENDING":
      return { ...state, isPending: true, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: "added",
        error: null,
      };
    case "BATCH_ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: "batch_added",
        error: null,
      };
    case "UPDATED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        success: "updated",
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: "deleted",
        error: null,
      };
    case "GOT_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: "get",
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const useCRUD = (collection, id, subCollection) => {
  const [response, dispatch] = useReducer(storeReducer, initState);
  const [hasAborted, setHasAborted] = useState(false);
  // collection ref
  let ref = projectFirestore.collection(collection);
  if (id && subCollection) {
    ref = ref.doc(id).collection(subCollection);
  }

  const dispatchIfNotAborted = (action) => {
    if (!hasAborted) {
      dispatch(action);
    }
  };

  const _addDoc = async (doc) => {
    dispatchIfNotAborted({ type: "PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      console.log("Added document", addedDocument);
      dispatchIfNotAborted({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR", payload: error.message });
    }
  };
  // delete a document
  const _deleteDoc = async (id) => {
    dispatch({ type: "PENDING" });

    try {
      await ref.doc(id).delete();
      dispatchIfNotAborted({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotAborted({ type: "ERROR", payload: err.message });
    }
  };
  const _getDoc = (id) => {
    dispatch({ type: "PENDING" });
    try {
      const unsub = ref.doc(id).onSnapshot((docSnapshot) => {
        dispatchIfNotAborted({
          type: "GOT_DOCUMENT",
          payload: { ...docSnapshot.data() },
        });
      });
      return unsub;
    } catch (err) {
      dispatchIfNotAborted({ type: "ERROR", payload: err.message });
    }
  };

  const _updateDoc = async (id, data) => {
    dispatchIfNotAborted({ type: "PENDING" });
    const updatedAt = timestamp.fromDate(new Date());
    try {
      await ref.doc(id).update({ ...data, updatedAt });
      const doc = await ref.doc(id).get();
      dispatchIfNotAborted({
        type: "UPDATED_DOCUMENT",
      });
    } catch (error) {
      console.log("error", error);
      dispatchIfNotAborted({ type: "ERROR", payload: error.message });
    }
  };
  const _batchAdd = async (data) => {
    try {
      const batch = projectFirestore.batch();
      data.forEach((d) => {
        const createdAt = timestamp.fromDate(new Date());
        const newDocRef = ref.doc();
        batch.set(newDocRef, { ...d, createdAt });
      });
      const doc = await batch.commit();
      console.log("batch added:", doc);
      dispatchIfNotAborted({ type: "BATCH_ADDED_DOCUMENT", payload: doc });
    } catch (error) {
      dispatchIfNotAborted({ type: "ERROR", payload: error.message });
    }
  };
  useEffect(() => {
    return () => setHasAborted(true);
  }, []);
  // Cache these fucntions so that they do not get re-defined when rerendered.
  const getDoc = useRef(_getDoc).current;
  const addDoc = useRef(_addDoc).current;
  const deleteDoc = useRef(_deleteDoc).current;
  const updateDoc = useRef(_updateDoc).current;
  const batchAdd = useRef(_batchAdd).current;
  return { response, addDoc, deleteDoc, updateDoc, getDoc, batchAdd };
};

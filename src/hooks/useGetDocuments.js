import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/config";

// Get a collection or a sub-collection in a document
// Usage:
// const {docs, error} = useGetDocuments("Restaurants")
// // const {docs, error} = 
//    useGetDocuments("Restaurants", null, null, ["status", "==", "register"])

// useGetDocuments("Restaurants", "<userId>", "Food")
// 
export const useGetDocuments = (collection, id, subCollection, _query, _orderBy) => {
  const [error, setError] = useState(null);
  const [docs, setDocs] = useState(null);
  const [isPending, setPending] = useState(false);
  const query = useRef(_query).current 
  const orderBy = useRef(_orderBy).current 
  useEffect(() => {
    let ref = projectFirestore.collection(collection);
    if (id && subCollection) {
      ref = ref.doc(id).collection(subCollection);
    }
    if (query) {
      ref = ref.where(...query)
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy)
    }
    setPending(true)
    const unsub = ref.onSnapshot(
      (snapShot) => {
        let results = [];
        snapShot.docs.forEach((doc) => {          
          results.push({ ...doc.data(), id: doc.id });
        });
        setDocs(results);
        setError(null);
        setPending(false)
      },
      (err) => {setError(err.message); setPending(false)}
    );

    return () => {unsub()};
  }, [collection, id, subCollection, query, orderBy]);

  return { docs, error, isPending };
};

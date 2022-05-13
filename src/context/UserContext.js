import { createContext, useEffect, useRef, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const email = sessionStorage.getItem("email");
  const uid = sessionStorage.getItem("uid");
  const username = sessionStorage.getItem("username");
  const ethnicity = sessionStorage.getItem("ethnicity");
  const user = { email, uid, username, ethnicity };
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

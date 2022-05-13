import { createContext, useEffect, useRef, useState } from "react";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const email = sessionStorage.getItem("email")
  console.log(email)
  return  (
    <UserContext.Provider value={{ roles: "guest" }}>
      {children}
    </UserContext.Provider>
  );
};


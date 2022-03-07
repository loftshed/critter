import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const receiveUserFromServer = (data) => {
    setUser({ ...data });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        receiveUserFromServer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

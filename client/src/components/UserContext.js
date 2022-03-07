import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userHandle, setUserHandle] = useState(null);

  const receiveUserFromServer = (data) => {
    setUser({ ...data });
  };

  const getUserProfile = (userHandle) => {
    console.log(
      `Fetching profile for user with handle '${userHandle}' from server`
    );

    fetch(`/api/${userHandle}/profile`)
      .then((res) => res.json())
      .then((data) => {
        receiveUserFromServer(data);
        console.log(data);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userHandle,
        setUserHandle,
        receiveUserFromServer,
        getUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

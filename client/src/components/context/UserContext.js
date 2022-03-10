import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [errorStatus, setErrorStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [follows, setFollows] = useState(null);

  const receiveCurrentUserFromServer = (data) => {
    setCurrentUser({ ...data });
  };

  const receiveUserFromServer = (data) => {
    setUser({ ...data });
  };
  const receiveFollowsFromServer = (data) => {
    setFollows({ ...data });
  };

  const getUserProfile = (handle) => {
    console.log(
      `Fetching profile for user with handle '${handle}' from server`
    );
    fetch(`/api/${handle}/profile`)
      .then((res) => res.json())
      .then((data) => {
        receiveUserFromServer(data.profile);
      });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        receiveUserFromServer,
        getUserProfile,
        receiveFollowsFromServer,
        follows,
        currentUser,
        setCurrentUser,
        errorStatus,
        setErrorStatus,
        receiveCurrentUserFromServer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

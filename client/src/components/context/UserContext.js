import React, { useState, createContext } from "react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [user, setUser] = useState(null);
  const [userHandle, setUserHandle] = useState(null);
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

  const getUserProfile = (userHandle) => {
    console.log(
      `Fetching profile for user with handle '${userHandle}' from server`
    );

    fetch(`/api/${userHandle}/profile`)
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
        userHandle,
        setUserHandle,
        receiveUserFromServer,
        getUserProfile,
        receiveFollowsFromServer,
        follows,
        currentUser,
        setCurrentUser,
        status,
        setStatus,
        receiveCurrentUserFromServer,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

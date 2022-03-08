import { useState, createContext } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");

  const receiveCurrentUserFromServer = (data) => {
    setCurrentUser({ ...data });
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        status,
        setStatus,
        receiveCurrentUserFromServer,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

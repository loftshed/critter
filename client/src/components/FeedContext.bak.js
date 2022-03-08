import { useState, createContext } from "react";

export const FeedContext = createContext(null);

export const FeedProvider = ({ children }) => {
  const [feedItems, setFeedItems] = useState(null);
  const [profileFeedItems, setProfileFeedItems] = useState(null);

  // const getProfileFeed = (user) => {
  //   console.log("Fetching profile feed from server");
  //   fetch(`/api/${user.profile.handle}/feed`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       receiveFeedItemsFromServer(data);
  //     });
  // };

  const receiveFeedItemsFromServer = (data) => {
    setFeedItems({ ...data });
  };

  const receiveProfileFeedItemsFromServer = (data) => {
    setProfileFeedItems({ ...data });
  };

  return (
    <FeedContext.Provider
      value={{
        receiveFeedItemsFromServer,
        feedItems,
        receiveProfileFeedItemsFromServer,
        setProfileFeedItems,
        // getProfileFeed,
        profileFeedItems,
      }}
    >
      {children}
    </FeedContext.Provider>
  );
};

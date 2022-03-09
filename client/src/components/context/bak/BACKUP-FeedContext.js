import { useState, createContext } from "react";

export const FeedContext = createContext(null);

export const FeedProvider = ({ children }) => {
  const [feedItems, setFeedItems] = useState(null);
  const [tweet, setTweet] = useState(null);

  const receiveFeedItemsFromServer = (data) => {
    setFeedItems({ ...data });
  };

  return (
    <FeedContext.Provider
      value={{ receiveFeedItemsFromServer, feedItems, tweet, setTweet }}
    >
      {children}
    </FeedContext.Provider>
  );
};

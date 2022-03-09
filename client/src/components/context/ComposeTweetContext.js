import { useContext, useState, createContext } from "react";

export const ComposeTweetContext = createContext(null);

export const ComposeTweetProvider = ({ children }) => {
  const [remainingChars, setRemainingChars] = useState(280);
  const [tweetString, setTweetString] = useState(null);
  const [feedItems, setFeedItems] = useState(null);
  const [tweet, setTweet] = useState(null);

  const handleAfterPostTweet = () => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  };

  const handlePostTweet = (data) => {
    console.log(data);
    fetch("/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ status: tweetString }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleAfterPostTweet();
      });
  };

  const receiveFeedItemsFromServer = (data) => {
    setFeedItems({ ...data });
  };

  return (
    <ComposeTweetContext.Provider
      value={{
        remainingChars,
        setRemainingChars,
        tweetString,
        setTweetString,
        handlePostTweet,
        receiveFeedItemsFromServer,
        feedItems,
        tweet,
        setTweet,
      }}
    >
      {children}
    </ComposeTweetContext.Provider>
  );
};

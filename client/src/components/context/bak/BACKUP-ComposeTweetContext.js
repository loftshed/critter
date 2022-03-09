import { useContext, useState, createContext } from "react";
import { FeedContext } from "./BACKUP-FeedContext";

export const ComposeTweetContext = createContext(null);

export const ComposeTweetProvider = ({ children }) => {
  const { receiveFeedItemsFromServer } = useContext(FeedContext);
  const [remainingChars, setRemainingChars] = useState(280);
  const [tweetString, setTweetString] = useState(null);

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

  return (
    <ComposeTweetContext.Provider
      value={{
        remainingChars,
        setRemainingChars,
        tweetString,
        setTweetString,
        handlePostTweet,
      }}
    >
      {children}
    </ComposeTweetContext.Provider>
  );
};

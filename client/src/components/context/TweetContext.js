import { useContext, useState, createContext } from "react";
import { UserContext } from "./UserContext";

export const TweetContext = createContext(null);

export const TweetProvider = ({ children }) => {
  const { setErrorStatus } = useContext(UserContext);
  const [tweetString, setTweetString] = useState(""); // state that handles tweet input box
  const [feedItems, setFeedItems] = useState(null); // state that holds a given feed's tweets after they are retrieved from the server
  const [tweet, setTweet] = useState(null); // state for individual tweet (for TweetDetails.js)

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
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  const handleAfterPostTweet = () => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  const receiveFeedItemsFromServer = (data) => {
    setFeedItems({ ...data });
  };

  return (
    <TweetContext.Provider
      value={{
        tweetString,
        setTweetString,
        handlePostTweet,
        handleAfterPostTweet,
        receiveFeedItemsFromServer,
        feedItems,
        tweet,
        setTweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

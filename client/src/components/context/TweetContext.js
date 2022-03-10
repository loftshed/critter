import { useContext, useState, createContext } from "react";

export const TweetContext = createContext(null);

export const TweetProvider = ({ children }) => {
  const [tweetsArray, setTweetsArray] = useState([]);
  const [tweetString, setTweetString] = useState("");
  const [feedItems, setFeedItems] = useState(null);
  const [tweet, setTweet] = useState(null);

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

  const handleAfterPostTweet = () => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
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
        receiveFeedItemsFromServer,
        feedItems,
        tweet,
        setTweet,
        tweetsArray,
        setTweetsArray,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

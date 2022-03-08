// FROM REACT ANIMATION WORKSHOP

import { createContext, useState } from "react";
import moment from "moment";
import avatar from "../assets/carmen-sandiego.png";

export const TweetContext = createContext(null);

export const TweetProvider = ({ children }) => {
  const [numOfLikes, setNumOfLikes] = useState(460);
  const [numOfRetweets, setNumOfRetweets] = useState(65);
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);

  const tweetData = {
    tweetContents: "Where in the world am I?",
    displayName: "Carmen Sandiego ✨",
    username: "carmen-sandiego",
    avatarSrc: avatar,
    isRetweetedByCurrentUser: isRetweeted,
    isLikedByCurrentUser: isLiked,
  };

  const date = moment().format("h:mm a - MMMM Do, YYYY");

  const handleToggleLike = () => {
    // note to self - ONE ternary inside ONE set State hook
    // **not** two set state hooks inside one ternary
    setNumOfLikes(!isLiked ? numOfLikes + 1 : numOfLikes - 1);
    setIsLiked(!isLiked);
  };

  const handleToggleRetweet = () => {
    setNumOfRetweets(!isRetweeted ? numOfRetweets + 1 : numOfRetweets - 1);
    setIsRetweeted(!isRetweeted);
  };

  return (
    <TweetContext.Provider
      value={{
        tweetData,
        date,
        setNumOfLikes,
        numOfLikes,
        setNumOfRetweets,
        numOfRetweets,
        setIsLiked,
        isLiked,
        setIsRetweeted,
        isRetweeted,
        handleToggleLike,
        handleToggleRetweet,
      }}
    >
      {children}
    </TweetContext.Provider>
  );
};

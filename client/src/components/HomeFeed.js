import React, { useContext } from "react";
import styled from "styled-components";
import Tweet from "./Tweet";
import { CurrentUserContext } from "./CurrentUserContext";
import { FeedContext } from "./FeedContext";
import { COLORS } from "../constants";

const HomeFeed = () => {
  const { feedItems } = useContext(FeedContext);
  // const { currentUser } = useContext(CurrentUserContext);

  if (feedItems === null) {
    return null;
  }

  // console.log(feedItems.tweetsById);
  const tweets = Object.values(feedItems.tweetsById);

  return (
    <Wrapper>
      {tweets.map((tweet) => {
        return <Tweet tweet={tweet} key={tweet.id}></Tweet>;
      })}
    </Wrapper>
  );
};

export default HomeFeed;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

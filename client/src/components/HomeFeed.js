import React, { useContext } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
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
        return <SmallTweet tweet={tweet} key={tweet.id}></SmallTweet>;
      })}
    </Wrapper>
  );
};

export default HomeFeed;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

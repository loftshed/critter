import React, { useContext } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import { CurrentUserContext } from "./CurrentUserContext";
import { FeedContext } from "./FeedContext";
import { COLORS } from "../constants";
import TweetInput from "./TweetInput";

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
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <HeaderContainer>
        <Header>Home</Header>
      </HeaderContainer>
      <TweetInput />
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

const HeaderContainer = styled.div`
  font-weight: 700;
  font-size: 32px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  margin: 0.5em 1em;
`;

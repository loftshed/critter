import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import { FeedContext } from "./context/FeedContext";
import { COLORS } from "../constants";
import TweetInput from "./TweetInput";
import LoadingSpinner from "./LoadingSpinner";

const HomeFeed = () => {
  const { feedItems, receiveFeedItemsFromServer } = useContext(FeedContext);

  useEffect(() => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  }, []);

  if (feedItems === null) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  const tweets = Object.values(feedItems.tweetsById);
  // console.log(tweets);

  return (
    <Wrapper>
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <HeaderContainer>
        <Header>Home</Header>
      </HeaderContainer>
      <TweetInput />
      <Tweets>
        {tweets.map((tweet) => {
          return <SmallTweet tweet={tweet} key={tweet.id}></SmallTweet>;
        })}
      </Tweets>
    </Wrapper>
  );
};

export default HomeFeed;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const HeaderContainer = styled.div`
  font-weight: 700;
  font-size: 32px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  padding: 0.5em 1em;
`;

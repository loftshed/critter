import React, { useContext, useEffect } from "react";
import styled from "styled-components";

// my components
import { COLORS } from "../constants";
import { TweetContext } from "./context/TweetContext";
import SmallTweet from "./tweet/SmallTweet";
import TweetInput from "./tweet/TweetInput";
import LoadingSpinner from "./etc/LoadingSpinner";
import { UserContext } from "./context/UserContext";
import { useParams } from "react-router-dom";

const HomeFeed = () => {
  const { feedItems, receiveFeedItemsFromServer, tweetsArray, setTweetsArray } =
    useContext(TweetContext);

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
      <Wrapper style={{ height: "100%" }}>
        <HeaderContainer>
          <Header>Home</Header>
        </HeaderContainer>
        <div style={{ height: "calc(100vh - 75px)" }}>
          <LoadingSpinner size="100px" />
        </div>
      </Wrapper>
    );
  }

  const tweets = Object.values(feedItems.tweetsById);

  return (
    <Wrapper>
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <HeaderContainer>
        <Header>Home</Header>
      </HeaderContainer>
      <TweetInput />
      <Tweets>
        {tweets.map((tweet) => {
          return <SmallTweet mappedTweet={tweet} key={tweet.id}></SmallTweet>;
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
  height: 100%;
`;

const HeaderContainer = styled.div`
  font-weight: 700;
  font-size: 32px;
  height: 73px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  padding: 0.5em 1em;
`;

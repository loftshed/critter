import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import SmallTweet from "./tweet/SmallTweet";
import { TweetContext } from "./context/TweetContext";
import { COLORS } from "../constants";
import TweetInput from "./tweet/TweetInput";
import LoadingSpinner from "./etc/LoadingSpinner";

const HomeFeed = () => {
  const { feedItems, receiveFeedItemsFromServer } = useContext(TweetContext);
  // const [status, setStatus] = useContext("");

  useEffect(() => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
    // error message thing
    //   .catch((err) => {
    //     setStatus("error");
    //     throw new Error(err);
    //     console.log(err);
    //   });
    // // error message thing
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

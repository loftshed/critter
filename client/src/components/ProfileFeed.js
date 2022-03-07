import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import { CurrentUserContext } from "./CurrentUserContext";
import { FeedContext } from "./FeedContext";
import { COLORS } from "../constants";
// import TweetInput from "./TweetInput";

const ProfileFeed = () => {
  const { feedItems, receiveFeedItemsFromServer } = useContext(FeedContext);
  // const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("Fetching home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  }, []);

  if (feedItems === null) {
    return null;
  }

  const tweets = Object.values(feedItems.tweetsById);
  console.log(tweets);

  return (
    <Wrapper>
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <HeaderContainer>
        <Header>
          <div>Tweets</div>
          <div>Media</div>
          <div>Likes</div>
        </Header>
      </HeaderContainer>
      {/* <TweetInput /> maybe make this display if currentuser*/}
      {tweets.map((tweet) => {
        return <SmallTweet tweet={tweet} key={tweet.id}></SmallTweet>;
      })}
    </Wrapper>
  );
};

export default ProfileFeed;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

const HeaderContainer = styled.div`
  margin-top: 1em;
  font-weight: 700;
  font-size: 18px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
  border-top: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.5em 1em;
`;

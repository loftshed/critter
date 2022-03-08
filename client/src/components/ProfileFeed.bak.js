import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import TweetInput from "./TweetInput";
import { UserContext } from "./UserContext";
import { FeedContext } from "./FeedContext";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";

const ProfileFeed = ({ userHandle }) => {
  const { receiveProfileFeedItemsFromServer, profileFeedItems } =
    useContext(FeedContext);
  const { currentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    console.log("Fetching profile feed from server");
    fetch(`/api/${userHandle}/feed`)
      .then((res) => res.json())
      .then((data) => {
        receiveProfileFeedItemsFromServer(data);
        console.log(data);
      });
  }, []);

  console.log();
  // // scrolls to top whenever a new feed is loaded
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  if (!profileFeedItems) {
    return null;
  }

  const tweets = Object.values(profileFeedItems.tweetsById);

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
      {/* {userHandle === currentUser.profile.handle && <TweetInput />} */}
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

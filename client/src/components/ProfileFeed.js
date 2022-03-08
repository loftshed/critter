import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import SmallTweet from "./SmallTweet";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { FeedContext } from "./context/FeedContext";
import { COLORS } from "../constants";

const ProfileFeed = ({ feedItems }) => {
  // const { receiveFeedItemsFromServer } = useContext(FeedContext);
  // const { currentUser } = useContext(CurrentUserContext);

  if (feedItems === null) {
    return null;
  }

  const tweets = Object.values(feedItems.tweetsById);
  // console.log(tweets);

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

      <Tweets>
        {tweets.map((tweet) => {
          return <SmallTweet tweet={tweet} key={tweet.id}></SmallTweet>;
        })}
      </Tweets>
    </Wrapper>
  );
};

export default ProfileFeed;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

const Tweets = styled.div`
  display: flex;
  flex-direction: column-reverse;
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

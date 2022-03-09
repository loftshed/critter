import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SmallTweet from "../tweet/SmallTweet";
import { FeedContext } from "../context/FeedContext";
import { COLORS } from "../../constants";
import ProfileMenuBar from "./ProfileBar";

const ProfileFeed = ({ tweets }) => {
  // const { receiveFeedItemsFromServer } = useContext(FeedContext);

  if (tweets === null) {
    return null;
  }

  return (
    <Wrapper>
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <ProfileMenuBar tweets={tweets} />
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

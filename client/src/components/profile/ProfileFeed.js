import React from "react";
import styled from "styled-components";

// my components
import { COLORS } from "../../constants";
import SmallTweet from "../tweet/SmallTweet";
import ProfileMenuBar from "./ProfileMenuBar";

const ProfileFeed = ({ tweets }) => {
  if (tweets === null) {
    return null;
  }

  return (
    <Wrapper>
      {/* TODO! turn header into a component that can be used on all pages & has an arrow if you navigate to a tweet */}
      <ProfileMenuBar tweets={tweets} />
      <Tweets>
        {tweets.map((tweet) => {
          return <SmallTweet mappedTweet={tweet} key={tweet.id}></SmallTweet>;
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

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiRepeat as RetweetIcon } from "react-icons/fi";
import styled from "styled-components";
import moment from "moment";

/// my components
import { UserContext } from "../context/UserContext";
import { COLORS, FONTWEIGHT } from "../../constants";
import ActionBar from "./ActionBar";

const SmallTweet = ({ tweet }) => {
  const { getUserProfile } = useContext(UserContext);
  const timestamp = moment(tweet.timestamp).format("MMMM Do");
  /// https://v5.reactrouter.com/web/api/history
  const history = useHistory();

  // handlers for useHistory shiz
  const handleContainerClick = (ev, tweetId) => {
    ev.stopPropagation();
    history.push(`/tweet/${tweetId}`);
  };
  const handleNestedClick = (ev) => {
    ev.stopPropagation();
    history.push(`/${tweet.author.handle}`);
  };

  return (
    <Wrapper onClick={(ev) => handleContainerClick(ev, tweet.id)}>
      <Avatar
        onClick={(ev) => {
          handleNestedClick(ev);
          getUserProfile(tweet.author.handle);
        }}
        src={tweet.author.avatarSrc}
      />

      <TweetContainer>
        {/* <TweetContainer onClick={() => handleClick(tweet.id)}> */}
        <TweetBody>
          {tweet.retweetFrom && (
            <Header style={{ color: `${COLORS.darkSubtext}` }}>
              <RetweetIcon />
              Retweeted by @{tweet.retweetFrom.handle}
            </Header>
          )}
          <AuthorInfo>
            <DisplayName
              onClick={(ev) => {
                handleNestedClick(ev);
                getUserProfile(tweet.author.handle);
              }}
            >
              {tweet.author.displayName}
            </DisplayName>
            <Handle>@{tweet.author.handle}</Handle>
            <>•</>
            <Timestamp>{timestamp}</Timestamp>
          </AuthorInfo>
          <Status>{tweet.status}</Status>
          {tweet.media[0] && <Image src={tweet.media[0].url} />}
        </TweetBody>
        <ActionBar viewType={"small"} tweet={tweet} />
        <div style={{ paddingBottom: "0.5em" }}></div>
      </TweetContainer>
    </Wrapper>
  );
};

export default SmallTweet;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  gap: 1em;
  padding: 1em 3em;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: -10px;
  font-size: 15px;
`;

const TweetContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 1em;
  background-color: ${COLORS.darkTweetBg};
  border-radius: 10px;
  /* width: 100%; */
  &:hover {
    outline: rgba(255, 255, 255, 0.2) 2px solid;
    cursor: pointer;
  }
`;

// Tweet content begins
const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  gap: 1em;
  color: ${COLORS.darkSubtext};
`;

const Avatar = styled.img`
  margin-top: 1em;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  &:hover {
    outline: ${COLORS.primary} 2px solid;
    cursor: pointer;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
  font-weight: ${FONTWEIGHT.bold};
`;
const DisplayName = styled.div`
  font-size: 20px;
  color: ${COLORS.darkText};
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${COLORS.primary};
  }
`;
const Handle = styled.div``;
const Timestamp = styled.div``;
const Status = styled.div`
  font-size: 18px;
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.darkText};
`;
const Image = styled.img`
  width: 100%;
  border-radius: 25px;
`;

// Tweet content ends

import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FiRepeat as RetweetIcon } from "react-icons/fi";
import styled from "styled-components";
import moment from "moment";

/// my components
import { UserContext } from "../context/UserContext";
import { COLORS, FONTWEIGHT } from "../../constants";
import ActionBar from "./ActionBar";

const SmallTweet = ({ mappedTweet }) => {
  const { getUserProfile } = useContext(UserContext);
  const timestamp = moment(mappedTweet.timestamp).format("MMMM Do");
  /// https://v5.reactrouter.com/web/api/history
  const history = useHistory();

  // handlers for useHistory shiz
  const handleContainerClick = (ev, tweetId) => {
    ev.stopPropagation();
    history.push(`/tweet/${tweetId}`);
  };
  const handleNestedClick = (ev) => {
    ev.stopPropagation();
    history.push(`/${mappedTweet.author.handle}`);
  };

  return (
    <Wrapper>
      <Tweet onClick={(ev) => handleContainerClick(ev, mappedTweet.id)}>
        <Avatar
          onClick={(ev) => {
            handleNestedClick(ev);
            getUserProfile(mappedTweet.author.handle);
          }}
          src={mappedTweet.author.avatarSrc}
        />

        <TweetContainer>
          <TweetBody>
            {mappedTweet.retweetFrom && (
              <Header style={{ color: `${COLORS.darkSubtext}` }}>
                <RetweetIcon />
                Retweeted by @{mappedTweet.retweetFrom.handle}
              </Header>
            )}
            <AuthorInfo>
              <DisplayName
                onClick={(ev) => {
                  handleNestedClick(ev);
                  getUserProfile(mappedTweet.author.handle);
                }}
              >
                {mappedTweet.author.displayName}
              </DisplayName>
              <Handle
                onClick={(ev) => {
                  handleNestedClick(ev);
                  getUserProfile(mappedTweet.author.handle);
                }}
              >
                @{mappedTweet.author.handle}
              </Handle>
              <>???</>
              <Timestamp>{timestamp}</Timestamp>
            </AuthorInfo>
            <Status>{mappedTweet.status}</Status>
            {mappedTweet.media[0] && <Image src={mappedTweet.media[0].url} />}
          </TweetBody>
          <ActionBar viewType={"small"} mappedTweet={mappedTweet} />
          <div style={{ paddingBottom: "0.5em" }}></div>
        </TweetContainer>
      </Tweet>
    </Wrapper>
  );
};

export default SmallTweet;

const Wrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
`;

const Tweet = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em 2em;
  width: 100%;
  transition: ease 0.1s all;
  &:hover {
    cursor: pointer;
    box-shadow: inset 0px 0px 75px #21252b;
  }
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
  border-radius: 25px;
  /* width: 100%; */
  /* &:hover {
    outline: rgba(255, 255, 255, 0.2) 2px solid;
    cursor: pointer;
  } */
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

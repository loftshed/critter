import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTWEIGHT } from "../constants";
import ActionBar from "./ActionBar";
import moment from "moment";
import { UserContext } from "./context/UserContext";
import { FiRepeat as RetweetIcon } from "react-icons/fi";

const SmallTweet = ({ tweet }) => {
  const { getUserProfile } = useContext(UserContext);
  const author = tweet.author;
  const timestamp = moment(tweet.timestamp).format("MMMM Do");
  // reminder, this const needed to be in square bracket to destructure the array
  const [media] = tweet.media;

  ////
  let history = useHistory();

  const handleClick = () => {
    history.push("/home");
  };
  ////
  console.log();

  return (
    <>
      <Wrapper>
        <div>
          <StyledLink
            to={`/${author.handle}`}
            onClick={() => getUserProfile(author.handle)}
          >
            <Avatar src={author.avatarSrc} />
          </StyledLink>
        </div>
        <div>
          <TweetContainer onClick={() => handleClick()}>
            <TweetBody>
              {/* {tweet.isRetweeted && (
                <Header style={{ color: `${COLORS.darkSubtext}` }}>
                <RetweetIcon />
                  Retweeted by @{author.handle}!
                </Header>
              )} */}
              <AuthorInfo>
                <StyledLink
                  to={`/${author.handle}`}
                  onClick={() => getUserProfile(author.handle)}
                >
                  <DisplayName>{author.displayName}</DisplayName>
                </StyledLink>
                <Handle>@{author.handle}</Handle>
                <>•</>
                <Timestamp>{timestamp}</Timestamp>
              </AuthorInfo>
              <Status>{tweet.status}</Status>
              {media && <Image src={media.url} />}
            </TweetBody>
            <ActionBar />
          </TweetContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default SmallTweet;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em 2em;
  width: 90%;
`;

const Header = styled.div`
  margin-bottom: -10px;
`;

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  background-color: #15141a;
  border-radius: 10px;
  &:hover {
    outline: white 2px solid;
    cursor: pointer;
  }
`;

// Tweet content begins
const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: ${COLORS.darkSubtext};
`;

const Avatar = styled.img`
  margin-top: 1em;
  border-radius: 50%;
  width: 100px;
  height: 100px;
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

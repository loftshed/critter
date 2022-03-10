import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";

// my components
import { UserContext } from "../context/UserContext";
import { TweetContext } from "../context/TweetContext";
import { COLORS, FONTWEIGHT } from "../../constants";
import ActionBar from "./ActionBar";

const BigTweet = () => {
  const { getUserProfile } = useContext(UserContext);
  const { tweet, setTweet } = useContext(TweetContext);
  const timestamp = moment(tweet.timestamp).format("h:mm A • MMM D YYYY");

  console.log();

  return (
    <Wrapper>
      <TweetContainer>
        <TweetBody>
          <TweetHeader>
            <StyledLink
              to={`/${tweet.author.handle}`}
              onClick={() => getUserProfile(tweet.author.handle)}
            >
              <Avatar src={tweet.author.avatarSrc} />
            </StyledLink>
            <AuthorInfo>
              <StyledLink
                to={`/${tweet.author.handle}`}
                onClick={() => getUserProfile(tweet.author.handle)}
              >
                <DisplayName>{tweet.author.displayName}</DisplayName>
              </StyledLink>
              <Handle>@{tweet.author.handle}</Handle>
            </AuthorInfo>
          </TweetHeader>
          <Status>{tweet.status}</Status>
          {tweet.media[0] && <Image src={tweet.media[0].url} />}
        </TweetBody>
        <Timestamp>
          {timestamp}
          <> • </>
          Critter web app
        </Timestamp>
        <ActionBar viewType={"big"} tweet={tweet} setTweet={setTweet} />
      </TweetContainer>
    </Wrapper>
  );
};

export default BigTweet;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  padding-left: 25px;
`;

// contains the whole shebang
const TweetContainer = styled.div`
  background-color: ${COLORS.darkTweetBg};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  gap: 1em;
  min-height: fit-content;
  max-height: 95vh;
`;

// Tweet content begins
const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: ${COLORS.darkSubtext};
  height: 100%;
`;

const TweetHeader = styled.div`
  display: flex;
  margin-bottom: -10px;
  gap: 1em;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
  &:hover {
    outline: ${COLORS.primary} 2px solid;
    cursor: pointer;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
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
const Timestamp = styled.div`
  color: ${COLORS.darkText};
`;
const Status = styled.div`
  font-size: 22px;
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.darkText};
`;
const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  border-radius: 25px;
  max-height: 60vh;
  object-fit: cover;
  object-position: center;
`;

// Tweet content ends

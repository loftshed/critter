import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTWEIGHT } from "../constants";
import ActionBar from "./ActionBar";
import moment from "moment";
import { UserContext } from "./context/UserContext";
import { FiRepeat as RetweetIcon, FiHeart as HeartIcon } from "react-icons/fi";

const BigTweet = ({ thisTweet }) => {
  const { getUserProfile } = useContext(UserContext);
  const { tweet } = thisTweet;
  const author = tweet.author;
  const timestamp = moment(tweet.timestamp).format("h:mm A • MMM D YYYY");
  // // reminder, this const needed to be in square bracket to destructure the array
  const [media] = tweet.media;

  return (
    <>
      <Wrapper>
        <div>
          <TweetContainer>
            <TweetBody>
              <Header>
                <StyledLink
                  to={`/${author.handle}`}
                  onClick={() => getUserProfile(author.handle)}
                >
                  <Avatar src={author.avatarSrc} />
                </StyledLink>
                <AuthorInfo>
                  <StyledLink
                    to={`/${author.handle}`}
                    onClick={() => getUserProfile(author.handle)}
                  >
                    <DisplayName>{author.displayName}</DisplayName>
                  </StyledLink>
                  <Handle>@{author.handle}</Handle>
                </AuthorInfo>
              </Header>
              <Status>{tweet.status}</Status>
              {media && <Image src={media.url} />}
            </TweetBody>
            <Timestamp>
              {timestamp}
              <> • </>
              Critter web app
            </Timestamp>
            <ActionBar />
          </TweetContainer>
        </div>
      </Wrapper>
    </>
  );
};

export default BigTweet;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  /* display: flex; */
  gap: 1em;
  padding: 1em 2em;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  margin-bottom: -10px;
  gap: 1em;
`;

const TweetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  width: 100%;
  background-color: #15141a;
  border-radius: 10px;
`;

// Tweet content begins
const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: ${COLORS.darkSubtext};
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 50px;
  height: 50px;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: ${FONTWEIGHT.bold};
`;
const DisplayName = styled.div`
  font-size: 20px;
  color: ${COLORS.darkText};
`;
const Handle = styled.div``;
const Timestamp = styled.div``;
const Status = styled.div`
  font-size: 22px;
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.darkText};
`;
const Image = styled.img`
  width: 100%;
  border-radius: 25px;
`;

// Tweet content ends

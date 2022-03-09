import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS, FONTWEIGHT } from "../../constants";
import ActionBar from "./ActionBar";
import moment from "moment";
import { UserContext } from "../context/UserContext";

const BigTweet = ({ thisTweet, setTweet }) => {
  const { getUserProfile } = useContext(UserContext);
  const { tweet } = thisTweet;
  const author = tweet.author;
  const timestamp = moment(tweet.timestamp).format("h:mm A • MMM D YYYY");
  // // reminder, this const needed to be in square bracket to destructure the array
  const [media] = tweet.media;

  // use this for retweeted by heading...?
  // console.log(tweet.retweetFrom);

  // console.log(tweet);

  // if (!media) {
  //   return (
  //     <Wrapper>
  //       <LoadingSpinner />
  //     </Wrapper>
  //   );
  // }

  return (
    <Wrapper>
      <TweetContainer>
        <TweetBody>
          <TweetHeader>
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
          </TweetHeader>
          <Status>{tweet.status}</Status>
          {media && <Image src={media.url} />}
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

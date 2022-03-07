import React from "react";
import styled from "styled-components";
import { COLORS, FONTWEIGHT } from "../constants";
import ActionBar from "./ActionBar";
import moment from "moment";

const SmallTweet = ({ tweet }) => {
  // console.log(tweet);
  const author = tweet.author;
  // reminder, this const needed to be in square bracket to destructure the array
  const [media] = tweet.media;
  const timestamp = moment(tweet.timestamp).format("MMMM Do");
  console.log();

  return (
    <>
      <Wrapper>
        {tweet.isRetweeted && <Header></Header>}
        <Avatar src={author.avatarSrc}></Avatar>
        <TweetContainer>
          <TweetBody>
            <AuthorInfo>
              <DisplayName>{author.displayName}</DisplayName>
              <Handle>@{author.handle}</Handle>
              <>•</>
              <Timestamp>{timestamp}</Timestamp>
            </AuthorInfo>
            <Status>{tweet.status}</Status>
            {media && <Image src={media.url} />}
          </TweetBody>
          <ActionBar />
        </TweetContainer>
      </Wrapper>
    </>
  );
};

export default SmallTweet;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em 2em;
  width: 90%;
`;

const Header = styled.div``;

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
  padding-top: 1em;
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

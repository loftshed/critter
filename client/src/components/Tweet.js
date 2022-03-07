import React from "react";
import styled from "styled-components";
import { COLORS, FONTWEIGHT } from "../constants";

const Tweet = ({ tweet }) => {
  // console.log(tweet);
  const author = tweet.author;

  const [media] = tweet.media;
  // reminder, this const needed to be in square bracket to destructure the array

  return (
    <>
      <Wrapper>
        <Header></Header>
        <Avatar src={author.avatarSrc}></Avatar>
        <TweetBody>
          <AuthorInfo>
            <DisplayName>{author.displayName}</DisplayName>
            <Handle>@{author.handle}</Handle>
            <>•</>
            <Timestamp>{tweet.timestamp}</Timestamp>
          </AuthorInfo>
          <Status>{tweet.status}</Status>
          {media && <Image src={media.url} />}
        </TweetBody>
      </Wrapper>
    </>
  );
};

export default Tweet;

const Wrapper = styled.div`
  display: flex;
  gap: 1em;
  padding: 1em 0em;
`;

const Header = styled.div``;

// Tweet content begins
const TweetBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  color: ${COLORS.darkSubtext};
`;

const Avatar = styled.img`
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
  font-weight: ${FONTWEIGHT.bold};
`;
const Image = styled.img`
  width: 90%;
  border-radius: 25px;
`;

// Tweet content ends

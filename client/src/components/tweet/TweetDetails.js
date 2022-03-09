import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BigTweet from "./BigTweet";

const TweetDetails = () => {
  const [tweet, setTweet] = useState(null);
  const params = useParams();
  const receiveTweetFromServer = (receivedTweet) => {
    setTweet(receivedTweet);
  };

  useEffect(() => {
    console.log("Fetching tweet from server");
    fetch(`/api/tweet/${params.tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        receiveTweetFromServer(data);
      });
  }, []);

  if (tweet === null) {
    return null;
  }
  return (
    <>
      <Wrapper>
        <BigTweet thisTweet={tweet} />
      </Wrapper>
    </>
  );
};

export default TweetDetails;

const Wrapper = styled.div``;

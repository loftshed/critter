import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import BigTweet from "./BigTweet";
import { FeedContext } from "../context/FeedContext";

const TweetDetails = () => {
  const params = useParams();
  const receiveTweetFromServer = (receivedTweet) => {
    setTweet(receivedTweet);
  };

  const { tweet, setTweet } = useContext(FeedContext);

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
        <BigTweet setTweet={setTweet} thisTweet={tweet} />
      </Wrapper>
    </>
  );
};

export default TweetDetails;

const Wrapper = styled.div``;

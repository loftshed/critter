import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// my components
import { TweetContext } from "../context/TweetContext";
import { UserContext } from "../context/UserContext";
import BigTweet from "./BigTweet";

const TweetDetails = () => {
  const { tweet, setTweet } = useContext(TweetContext);
  const { errorStatus, setErrorStatus } = useContext(UserContext);
  const params = useParams();

  console.log(tweet);

  // grabs a single tweet from the server on component mount
  useEffect(() => {
    console.log(`Fetching tweet with id ${params.tweetId} from server`);
    fetch(`/api/tweet/${params.tweetId}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data.tweet);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  }, []);

  // if tweet has not yet been loaded,

  if (tweet === null) {
    return null;
  }
  return (
    <>
      <Wrapper>
        <BigTweet />
      </Wrapper>
    </>
  );
};

export default TweetDetails;

const Wrapper = styled.div``;

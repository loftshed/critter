import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { FeedContext } from "../context/FeedContext";
import {
  FiMessageSquare as ReplyIcon,
  FiRepeat as RetweetIcon,
  FiShare as ShareIcon,
  FiHeart as HeartIcon,
} from "react-icons/fi";
import ActionButton from "./ActionButton";

const ActionBar = ({ viewType, tweet }) => {
  const smolTrue = viewType === "small";
  // const { feedItems } = useContext(FeedContext);
  // console.log(tweet.isLiked);
  //  const { tweet, setTweet } = useContext(FeedContext);

  const likeTweet = () => {
    console.log("Liking a tweet");
    fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        // error message shit will go here
      });
  };

  const unlikeTweet = () => {
    console.log("Unliking a tweet");
    fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        // error message shit will go here
      });
  };

  // error message thing
  //   .catch((err) => {
  //     setStatus("error");
  //     throw new Error(err);
  //     console.log(err);
  //   });
  // // error message thing
  // if (tweet === null) {
  //   return null;
  // }

  return (
    <Wrapper>
      <Bar
        style={{
          justifyContent: smolTrue ? "flex-start" : "center",
          borderRadius: smolTrue ? "none" : "10px",
          padding: smolTrue ? "10px 0px 10px 25px" : "10px 15px",
        }}
      >
        <ButtonContainer>
          <ActionAndNum>
            <ActionButton color="rgba(27, 149, 224, 0.5">
              <ReplyIcon />
            </ActionButton>
          </ActionAndNum>
          <ActionAndNum>
            <ActionButton color="rgba(23, 191, 99, 0.5">
              <RetweetIcon />
            </ActionButton>
            <Num>{tweet?.numRetweets}</Num>
          </ActionAndNum>
          <ActionAndNum>
            <ActionButton
              onClick={!tweet.isLiked ? likeTweet : unlikeTweet}
              color="rgba(224, 36, 94, 0.5)"
            >
              <HeartIcon />
            </ActionButton>
            <Num>{tweet?.numLikes}</Num>
          </ActionAndNum>
          <ActionButton color="rgba(27, 149, 224, 0.5">
            <ShareIcon />
          </ActionButton>
        </ButtonContainer>
      </Bar>
    </Wrapper>
  );
};

export default ActionBar;

const ActionAndNum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const Num = styled.div`
  color: #f0f0f0;
  font-size: 14px;
`;

const Bar = styled.div`
  display: flex;
  background-color: #30363d;
  padding: 10px 0px 10px 25px;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
`;

const Wrapper = styled.div``;

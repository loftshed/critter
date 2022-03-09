import React, { useContext } from "react";
import styled from "styled-components";
import { FeedContext } from "../context/FeedContext";
import { CurrentUserContext } from "../context/CurrentUserContext";
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
  // const { currentUser } = useContext(CurrentUserContext);

  ////
  // console.log(tweet.numLikes);
  // console.log(tweet.numRetweets);
  // console.log(tweet.isLiked);
  // console.log(tweet.isRetweeted);

  const likeTweet = () => {
    console.log("Liking a tweet");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    // error message thing
    //   .catch((err) => {
    //     setStatus("error");
    //     throw new Error(err);
    //     console.log(err);
    //   });
    // // error message thing
  };

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
            <ActionButton color="rgba(224, 36, 94, 0.5)">
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

import React, { useContext } from "react";
import styled from "styled-components";
import {
  FiMessageSquare as ReplyIcon,
  FiRepeat as RetweetIcon,
  FiShare as ShareIcon,
  FiHeart as HeartIcon,
} from "react-icons/fi";

// my components
import { TweetContext } from "../context/TweetContext";
import ActionButton from "./ActionButton";

const ActionBar = ({ viewType, mappedTweet }) => {
  const { tweet, setTweet } = useContext(TweetContext);
  const smolTrue = viewType === "small";
  const tweetSource = smolTrue ? mappedTweet : tweet;

  console.log(tweetSource.id);

  const updateTweet = () => {
    fetch(`/api/tweet/${tweetSource.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data.tweet);
      });
  };

  const likeTweet = (ev) => {
    ev.stopPropagation();
    // setIsLiked(true);
    console.log("Liking a tweet");
    fetch(`/api/tweet/${tweetSource.id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateTweet();
      });
  };

  const unlikeTweet = (ev) => {
    ev.stopPropagation();
    // setIsLiked(false);
    console.log("Unliking a tweet");
    fetch(`/api/tweet/${tweetSource.id}/like`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        updateTweet();
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
            <ActionButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              color="rgba(27, 149, 224, 0.5"
            >
              <ReplyIcon />
            </ActionButton>
          </ActionAndNum>
          <ActionAndNum>
            <ActionButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              color="rgba(23, 191, 99, 0.5"
            >
              <RetweetIcon />
            </ActionButton>
            <Num>{tweetSource?.numRetweets}</Num>
          </ActionAndNum>
          <ActionAndNum>
            <ActionButton
              onClick={!tweetSource?.isLiked ? likeTweet : unlikeTweet}
              color="rgba(224, 36, 94, 0.5)"
            >
              <HeartIcon />
            </ActionButton>
            <Num>{tweetSource?.numLikes}</Num>
          </ActionAndNum>
          <ActionButton
            onClick={(ev) => {
              ev.stopPropagation();
            }}
            color="rgba(27, 149, 224, 0.5"
          >
            <ShareIcon />
          </ActionButton>
        </ButtonContainer>
      </Bar>
    </Wrapper>
  );
};

export default ActionBar;

const Wrapper = styled.div``;

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

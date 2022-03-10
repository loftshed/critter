import React, { useContext } from "react";
import styled from "styled-components";

import FavoriteRounded from "@mui/icons-material/Favorite";
import FavoriteBorderRounded from "@mui/icons-material/FavoriteBorder";
import RepeatRoundedIcon from "@mui/icons-material/RepeatRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";

import IconButton from "@mui/material/IconButton";

// my components
import { COLORS } from "../../constants";
import { TweetContext } from "../context/TweetContext";

const ActionBar = ({ viewType, mappedTweet }) => {
  const { tweet, setTweet, receiveFeedItemsFromServer } =
    useContext(TweetContext);
  const smolTrue = viewType === "small";
  const tweetSource = smolTrue ? mappedTweet : tweet;

  const updateTweet = () => {
    fetch(`/api/tweet/${tweetSource.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data.tweet);
      });
  };

  const updateFeed = () => {
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
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
        smolTrue ? updateFeed() : updateTweet(); // there's gotta be a better way!
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
        smolTrue ? updateFeed() : updateTweet(); // there's gotta be a better way!
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
          <ButtonAndNum>
            <StyledIconButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              size="small"
              iconColor="rgba(27, 149, 224, 0.5)"
            >
              <ReplyIcon fontSize={smolTrue ? "small" : "medium"} />
            </StyledIconButton>
          </ButtonAndNum>
          <ButtonAndNum>
            <StyledIconButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              size="small"
              iconColor="rgba(23, 191, 99, 0.5)"
            >
              <RetweetIcon fontSize={smolTrue ? "small" : "medium"} />
            </StyledIconButton>
            <Num>{tweetSource?.numRetweets}</Num>
          </ButtonAndNum>
          <ButtonAndNum onClick={(ev) => ev.stopPropagation()}>
            <StyledIconButton
              onClick={!tweetSource?.isLiked ? likeTweet : unlikeTweet}
              size="small"
              iconColor="rgba(224, 36, 94, 0.5)"
            >
              {!tweetSource?.isLiked ? (
                <HeartIcon fontSize={smolTrue ? "small" : "medium"} />
              ) : (
                <HeartIconFilled
                  fontSize={smolTrue ? "small" : "medium"}
                  sx={{ color: "rgba(224, 36, 94, 1)" }}
                />
              )}
            </StyledIconButton>
            <Num>{tweetSource?.numLikes}</Num>
          </ButtonAndNum>
          <ButtonAndNum>
            <StyledIconButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              size="small"
              iconColor="rgba(27, 149, 224, 0.5)"
            >
              <ShareIcon fontSize={smolTrue ? "small" : "medium"} />
            </StyledIconButton>
          </ButtonAndNum>
        </ButtonContainer>
      </Bar>
    </Wrapper>
  );
};

export default ActionBar;

const Wrapper = styled.div``;

const ReplyIcon = styled(ChatBubbleOutlineRoundedIcon)``;
const RetweetIcon = styled(RepeatRoundedIcon)``;
const HeartIcon = styled(FavoriteBorderRounded)``;
const HeartIconFilled = styled(FavoriteRounded)``;
const ShareIcon = styled(IosShareRoundedIcon)``;

const StyledIconButton = styled(IconButton)`
  color: ${COLORS.darkText};
  &:hover {
    background-color: ${(props) => props.iconColor};
  }
`;

const ButtonAndNum = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
`;

const Num = styled.div`
  color: #f0f0f0;
  font-size: 18px;
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

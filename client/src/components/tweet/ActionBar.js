import React, { useContext } from "react";
import { useParams } from "react-router-dom";
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

// ActionBar is used by both BigTweet.js and SmallTweet.js and holds functionality for interacting with a tweet
const ActionBar = ({ viewType, mappedTweet }) => {
  const { tweet, setTweet, receiveFeedItemsFromServer } =
    useContext(TweetContext);
  const params = useParams();

  // if prop "viewType" contains the string "small", record that in const smolTrue which will be used throughout the actionbar to determine placement of buttons as well as some other tings
  const smolTrue = viewType === "small";

  // if smolTrue, we will use the tweet data passed down from the .map function (which originates in either HomeFeed.js or Profile.js)
  // if not, we use the data from the state "tweet" (which contains only one tweet)
  const tweetSource = smolTrue ? mappedTweet : tweet;

  // updates the tweet bearing the id contained in tweetSource
  const updateTweet = () => {
    fetch(`/api/tweet/${tweetSource.id}`)
      .then((res) => res.json())
      .then((data) => {
        setTweet(data.tweet);
      });
  };

  // if a profileId is present in params, we must be viewing a profile, so re-fetch that profileId's feed --
  // if not, we must be in home-feed, so re-fetch that feed instead.
  const updateFeed = () => {
    fetch(
      params.profileId ? `/api/${params.profileId}/feed` : `/api/me/home-feed`
    )
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  };

  // likes a tweet
  const likeTweet = (ev) => {
    ev.stopPropagation();
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
        // if smolTrue returns boolean TRUE we're viewing a profile, so update the state of the entire feed
        // if smolTrue returns boolean FALSE we will update just the one tweet we're viewing
        smolTrue ? updateFeed() : updateTweet();
      });
  };

  // unlikes a tweet
  const unlikeTweet = (ev) => {
    ev.stopPropagation();
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
        smolTrue ? updateFeed() : updateTweet();
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
              size={smolTrue ? "small" : "medium"}
              iconcolor="rgba(27, 149, 224, 0.5)"
            >
              <ReplyIcon fontSize={smolTrue ? "small" : "medium"} />
            </StyledIconButton>
          </ButtonAndNum>
          <ButtonAndNum>
            <StyledIconButton
              onClick={(ev) => {
                ev.stopPropagation();
              }}
              size={smolTrue ? "small" : "medium"}
              iconcolor="rgba(23, 191, 99, 0.5)"
            >
              <RetweetIcon fontSize={smolTrue ? "small" : "medium"} />
            </StyledIconButton>
            <Num>{tweetSource?.numRetweets}</Num>
          </ButtonAndNum>
          <ButtonAndNum onClick={(ev) => ev.stopPropagation()}>
            <StyledIconButton
              onClick={!tweetSource?.isLiked ? likeTweet : unlikeTweet}
              size={smolTrue ? "small" : "medium"}
              iconcolor="rgba(224, 36, 94, 0.5)"
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
              size={smolTrue ? "small" : "medium"}
              iconcolor="rgba(27, 149, 224, 0.5)"
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
    background-color: ${(props) => props.iconcolor};
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

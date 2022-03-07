import React, { useContext } from "react";
import styled from "styled-components";
import { FeedContext } from "./FeedContext";
import { CurrentUserContext } from "./CurrentUserContext";
import {
  MdOutlineChatBubbleOutline as ReplyIcon,
  MdRepeat as RetweetIcon,
  MdIosShare as ShareIcon,
} from "react-icons/md";
import { IoMdHeartEmpty as HeartIcon } from "react-icons/io";

const ActionBar = () => {
  const { feedItems } = useContext(FeedContext);
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Wrapper>
      <ReplyIcon />
      <RetweetIcon />
      <ShareIcon />
      <HeartIcon />
    </Wrapper>
  );
};

export default ActionBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #30363d;
  padding: 10px;
  border-radius: 10px;
  color: white;
  /* padding-top: 1em; */
`;

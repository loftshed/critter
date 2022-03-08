import React, { useContext } from "react";
import styled from "styled-components";
import { FeedContext } from "./context/FeedContext";
import { CurrentUserContext } from "./context/CurrentUserContext";
import {
  FiMessageSquare as ReplyIcon,
  FiRepeat as RetweetIcon,
  FiShare as ShareIcon,
  FiHeart as HeartIcon,
} from "react-icons/fi";

const ActionBar = () => {
  const { feedItems } = useContext(FeedContext);
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <Wrapper>
      <Bar>
        <Buttons>
          <ReplyIcon />
          <RetweetIcon />
          <ShareIcon />
          <HeartIcon />
        </Buttons>
      </Bar>
    </Wrapper>
  );
};

export default ActionBar;

const Bar = styled.div`
  display: flex;
  /* justify-content: space-around; */
  background-color: #30363d;
  padding: 10px;
  border-radius: 10px;
  color: white;
  /* padding-top: 1em; */
`;

const Buttons = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Wrapper = styled.div``;

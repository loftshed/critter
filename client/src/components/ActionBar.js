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
import ActionButton from "./ActionButton";

const ActionBar = ({ viewType }) => {
  const smolTrue = viewType === "small";
  // const { feedItems } = useContext(FeedContext);
  // const { currentUser } = useContext(CurrentUserContext);

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
          <ActionButton color="rgba(27, 149, 224, 0.5">
            <ReplyIcon />
          </ActionButton>
          <ActionButton color="rgba(23, 191, 99, 0.5">
            <RetweetIcon />
          </ActionButton>
          <ActionButton color="rgba(27, 149, 224, 0.5">
            <ShareIcon />
          </ActionButton>
          <ActionButton color="rgba(224, 36, 94, 0.5)">
            <HeartIcon />
          </ActionButton>
        </ButtonContainer>
      </Bar>
    </Wrapper>
  );
};

export default ActionBar;

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

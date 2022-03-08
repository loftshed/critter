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
        <ButtonContainer>
          <Button>
            <ReplyIcon />
          </Button>
          <Button>
            <RetweetIcon />
          </Button>
          <Button>
            <ShareIcon />
          </Button>
          <Button>
            <HeartIcon />
          </Button>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Button = styled.button``;

const Wrapper = styled.div``;

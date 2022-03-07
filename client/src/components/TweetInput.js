import React, { useContext, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import styled from "styled-components";
import { COLORS } from "../constants";

const TweetInput = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const [remainingChars, setRemainingChars] = useState(280);
  const [tweetString, setTweetString] = useState(null);

  if (currentUser === null) {
    return null;
  }

  const {
    profile: { avatarSrc },
  } = currentUser;

  const handleInput = (ev) => {
    // returns remaining chars as result of 280 minus length of event target value
    const remainingCharCounter = (length) => {
      return 280 - length;
    };
    setRemainingChars(remainingCharCounter(ev.target.value.length));
    setTweetString(ev.target.value);
  };

  return (
    <Wrapper>
      <InputContainer>
        <Avatar src={avatarSrc} />
        <InputSubmit>
          <Input
            onInput={(ev) => handleInput(ev)}
            maxLength="280"
            placeholder="What's going on?"
          ></Input>
          <SubmitArea>
            <Counter>{remainingChars}</Counter>
            <Button>Meow</Button>
          </SubmitArea>
        </InputSubmit>
      </InputContainer>
      <Separator />
    </Wrapper>
  );
};

export default TweetInput;

const Wrapper = styled.div`
  border-bottom: 10px solid ${COLORS.darkSubtext};
  width: 100%;
`;

//////////////inside inputcontainer
const InputContainer = styled.div`
  display: flex;
  margin: 1em 2em;
  gap: 1em;
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;
const InputSubmit = styled.div`
  gap: 1em;
  width: 100%;
  margin-right: 2em;
  display: flex;
  flex-direction: column;
`;

// text input
const Input = styled.textarea`
  text-align: justify;
  padding: 5px 10px;
  font: inherit;
  font-size: 20px;
  font-weight: 600;
  height: 150px;
  background-color: #15141a;
  border-radius: 10px;
  resize: none;
  color: white;
`;

// submit area
const SubmitArea = styled.div`
  display: flex;
  align-self: flex-end;
  align-items: center;
  gap: 1em;
  font-size: 18px;
`;

const Counter = styled.div`
  color: ${COLORS.darkSubtext};
  font-weight: 700;
`;

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.darkText};
  font: inherit;
  font-weight: 700;
  border-style: none;
  padding: 5px 10px;
  border-radius: 10px;
`;
//////////////inputcontainer ends

const Separator = styled.div``;

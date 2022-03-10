import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import styled from "styled-components";

// my components
import { COLORS } from "../../constants";
import { TweetContext } from "../context/TweetContext";
import { UserContext } from "../context/UserContext";
import LoadingSpinner from "../etc/LoadingSpinner";

const TweetInput = () => {
  const { currentUser } = useContext(UserContext);
  const { tweetString, setTweetString, handlePostTweet } =
    useContext(TweetContext);

  const [remainingChars, setRemainingChars] = useState(280);

  const handleInput = (ev) => {
    // returns remaining chars as result of 280 minus length of event target value
    const remainingCharCounter = (length) => {
      return 280 - length;
    };
    setRemainingChars(remainingCharCounter(ev.target.value.length));
    setTweetString(ev.target.value);
  };

  const getCounterColor = () => {
    let counterColor = COLORS.darkSubtext;
    if (remainingChars <= 55 && remainingChars > 0) {
      counterColor = "yellow";
    }
    if (remainingChars <= 0) {
      counterColor = "red";
    }
    return counterColor;
  };

  // stops things from breaking if user isn't loaded yet
  if (currentUser === null) {
    return (
      <Wrapper style={{ height: "100vh" }}>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <InputContainer>
        <Avatar src={currentUser.avatarSrc} />
        <InputSubmit>
          <Input
            value={tweetString}
            onInput={(ev) => handleInput(ev)}
            placeholder="What's going on?"
          ></Input>
          {}
          <SubmitArea>
            <Counter style={{ color: getCounterColor() }}>
              {remainingChars}
            </Counter>
            <MeowButton
              onClick={() => {
                handlePostTweet(tweetString);
                setTweetString("");
                setRemainingChars(280);
              }}
              disabled={remainingChars < 0 || remainingChars === 280}
              variant="contained"
              sx={{
                opacity:
                  remainingChars < 0 || remainingChars === 280 ? "50%" : "100%",
              }}
            >
              Meow
            </MeowButton>
          </SubmitArea>
        </InputSubmit>
      </InputContainer>
      <Separator />
    </Wrapper>
  );
};

export default TweetInput;
const Wrapper = styled.div`
  display: flex;
  padding-left: 2em;
  justify-content: center;
  border-bottom: 10px solid ${COLORS.darkSubtext};
  margin-bottom: 1em;
  width: 100%;
`;

//////////////inside inputcontainer
const InputContainer = styled.div`
  display: flex;
  padding: 2em 1em;
  gap: 2em;
  width: 100%;
`;
const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;
const InputSubmit = styled.div`
  gap: 1em;
  width: 100%;
  padding-right: 2em;
  display: flex;
  flex-direction: column;
`;

// text input
const Input = styled.textarea`
  text-align: justify;
  padding: 10px 10px;
  font: inherit;
  font-size: 24px;
  font-weight: 400;
  height: 150px;
  background-color: ${COLORS.darkTweetBg};
  border-radius: 10px;
  border: none;
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
  font-weight: 700;
`;

const MeowButton = styled(Button)`
  border-radius: 50px;
  padding: 10px 20px;
  font: inherit;
  font-weight: 800;
  text-transform: none;
  background-color: ${COLORS.primary};
  color: ${COLORS.darkText};
  &:hover {
    background-color: ${COLORS.primary};
    filter: brightness(125%);
  }
  &:disabled {
    background-color: ${COLORS.primary};
    color: ${COLORS.darkText};
  }
`;
//////////////inputcontainer ends

const Separator = styled.div``;

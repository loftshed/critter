import React, { useContext, useState } from "react";
import { TweetContext } from "../context/TweetContext";
import { UserContext } from "../context/UserContext";
import styled from "styled-components";
import { COLORS } from "../../constants";
import LoadingSpinner from "../etc/LoadingSpinner";

const TweetInput = () => {
  const { currentUser } = useContext(UserContext);
  const { tweetString, setTweetString, handlePostTweet } =
    useContext(TweetContext);
  const [remainingChars, setRemainingChars] = useState(280);

  if (currentUser === null) {
    return (
      <Wrapper style={{ height: "100vh" }}>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  const {
    profile: { avatarSrc },
  } = currentUser;

  console.log(currentUser);

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

  return (
    <Wrapper>
      <InputContainer>
        <Avatar src={avatarSrc} />
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
            <Button
              onClick={() => {
                handlePostTweet(tweetString);
                setTweetString("");
                setRemainingChars(280);
              }}
              disabled={remainingChars < 0 || remainingChars === 280}
              style={{
                opacity:
                  remainingChars < 0 || remainingChars === 280 ? "50%" : "100%",
              }}
            >
              Meow
            </Button>
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

const Button = styled.button`
  background-color: ${COLORS.primary};
  color: ${COLORS.darkText};
  font: inherit;
  font-weight: 700;
  border-style: none;
  padding: 10px 20px;
  border-radius: 50px;
`;
//////////////inputcontainer ends

const Separator = styled.div``;

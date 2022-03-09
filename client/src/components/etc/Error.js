import React from "react";
import styled from "styled-components";
import { BiSad } from "react-icons/bi";
import { COLORS } from "../../constants";

const Error = () => {
  return (
    <Wrapper>
      <ErrorContainer>
        <Icon />
        <ErrorHeading>An unknown error has occurred.</ErrorHeading>
        <ErrorMessage>
          Please try refreshing the page, or{" "}
          <a href="mailto:lmao@thereaintnosupport.bruh">contact support</a> if
          the problem persists.
        </ErrorMessage>
      </ErrorContainer>
    </Wrapper>
  );
};

export default Error;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 55%;
`;

const ErrorHeading = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${COLORS.darkText};
`;

const ErrorMessage = styled.div`
  text-align: justify;
`;

const Icon = styled(BiSad)`
  height: 200px;
  width: 200px;
  color: ${COLORS.darkSubtext};
`;

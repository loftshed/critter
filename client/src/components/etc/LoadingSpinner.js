import React from "react";
import styled from "styled-components";
import { FiLoader } from "react-icons/fi";
import { keyframes } from "styled-components";
import { COLORS } from "../../constants";

const LoadingSpinner = ({ size }) => {
  return (
    <Wrapper>
      <Spinner>
        <SpinnerIcon style={{ width: size, height: size }} />
      </Spinner>
    </Wrapper>
  );
};

export default LoadingSpinner;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  display: flex;
`;
const SpinnerIcon = styled(FiLoader)`
  color: ${COLORS.darkSubtext};
  animation: ${spin} 2s linear infinite;
`;

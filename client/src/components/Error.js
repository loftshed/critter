import React from "react";
import styled from "styled-components";
import { BiSad } from "react-icons/bi";

const Error = () => {
  <Wrapper>
    <ErrorContainer>
      <Icon />
    </ErrorContainer>
  </Wrapper>;
};

export default Error;

const Wrapper = styled.div`
  width: 100%;
`;

const ErrorContainer = styled.div`
  width: 50%;
`;

const Icon = styled(BiSad)`
  width: 300px;
`;

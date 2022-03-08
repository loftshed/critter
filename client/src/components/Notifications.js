import React from "react";
import { COLORS } from "../constants";
import styled from "styled-components";
import LoadingSpinner from "./LoadingSpinner";

const Notifications = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Notifications</Header>
      </HeaderContainer>
      <LoadingSpinner />
    </Wrapper>
  );
};

export default Notifications;

const Wrapper = styled.div`
  background-color: #0d1117;
  width: 100%;
  height: 100vh;
`;

const HeaderContainer = styled.div`
  font-weight: 700;
  font-size: 32px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  padding: 0.5em 1em;
`;

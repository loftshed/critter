import React from "react";
import styled from "styled-components";

// my components
import { COLORS } from "../constants";
import LoadingSpinner from "./etc/LoadingSpinner";

const Bookmarks = () => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Bookmarks</Header>
      </HeaderContainer>
      <LoadingSpinner size="100px" />
    </Wrapper>
  );
};

export default Bookmarks;

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

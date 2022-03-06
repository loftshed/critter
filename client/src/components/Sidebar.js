import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Sidebar = () => {
  return (
    <Wrapper>
      <StyledLogo />
      <Navigation>
        <NavigationLink exact to="/">
          Home
        </NavigationLink>
        <NavigationLink to="/:profileId">Profile</NavigationLink>
        <NavigationLink to="/notifications/">Notifications</NavigationLink>
        <NavigationLink to="/bookmarks/">Bookmarks</NavigationLink>
      </Navigation>
    </Wrapper>
  );
};

export default Sidebar;

const StyledLogo = styled(Logo)`
  width: 5rem;
`;

const Navigation = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  font-size: 24px;
  font-weight: 700;
  gap: 10px;
`;

const Wrapper = styled.div`
  padding: 1rem;
  width: 30vw;
  height: 100vh;
  background-color: grey;
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;

  &.active {
    color: ${COLORS.primary};
  }
`;

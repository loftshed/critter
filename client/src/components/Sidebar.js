import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { MdHome, MdPerson, MdNotifications, MdBookmarks } from "react-icons/md";

const Sidebar = () => {
  return (
    <Wrapper>
      <StyledLogo />
      <Navigation>
        <NavigationLink exact to="/">
          <MdHome />
          <Item>Home</Item>
        </NavigationLink>
        <NavigationLink to="/:profileId">
          <MdPerson />
          <Item>Profile</Item>
        </NavigationLink>
        <NavigationLink to="/notifications/">
          <MdNotifications />
          <Item>Notifications</Item>
        </NavigationLink>
        <NavigationLink to="/bookmarks/">
          <MdHome></MdHome>
          <Item>Bookmarks</Item>
        </NavigationLink>
      </Navigation>
    </Wrapper>
  );
};

export default Sidebar;

const StyledLogo = styled(Logo)`
  width: 5rem;
`;

const Item = styled.div`
  margin-left: 1rem;
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
  width: 40vw;
  height: 100vh;
  background-color: #30363d;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #c9d1d9;

  &.active {
    color: ${COLORS.primary};
  }
`;
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { ReactComponent as Logo } from "../assets/logo.svg";

import { MdHome, MdPerson, MdNotifications, MdBookmarks } from "react-icons/md";

const Sidebar = () => {
  return (
    <Wrapper>
      <Navigation>
        <StyledLogo />
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

const Wrapper = styled.div`
  padding: 1rem;
  width: fit-content;
  height: 100;
  background-color: ${COLORS.darkSidebarBg};
`;

const StyledLogo = styled(Logo)`
  width: 50px;
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
  gap: 2rem;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${COLORS.darkLink};

  &.active {
    color: ${COLORS.primary};
  }
`;

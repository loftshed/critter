import React, { useContext, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "./context/UserContext";

import { COLORS } from "../constants";
import { ReactComponent as Logo } from "../assets/logo.svg";
import {
  FiHome as HomeIcon,
  FiUser as ProfileIcon,
  FiBell as NotificationIcon,
  FiBookmark as BookmarksIcon,
} from "react-icons/fi";

const Sidebar = () => {
  const { currentUser } = useContext(UserContext);
  const params = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  return (
    <Wrapper>
      <Navigation>
        <StyledLogo />
        <NavigationLink exact to="/">
          <HomeIcon />
          <Item>Home</Item>
        </NavigationLink>
        <NavigationLink to={`/${currentUser.handle}`}>
          <ProfileIcon />
          <Item>Profile</Item>
        </NavigationLink>
        <NavigationLink to="/notifications/">
          <NotificationIcon />
          <Item>Notifications</Item>
        </NavigationLink>
        <NavigationLink to="/bookmarks/">
          <BookmarksIcon />
          <Item>Bookmarks</Item>
        </NavigationLink>
      </Navigation>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  width: 230px;
  padding: 1rem;
  height: 100%;
  border-right: solid 1px ${COLORS.darkSubtext};
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
  font-size: 22px;
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

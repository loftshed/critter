import React, { useContext, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  FiHome as HomeIcon,
  FiUser as ProfileIcon,
  FiBell as NotificationIcon,
  FiBookmark as BookmarksIcon,
} from "react-icons/fi";
import Button from "@mui/material/Button";

import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/logo.svg";

// my components
import { COLORS } from "../constants";
import { UserContext } from "./context/UserContext";
import { Menu } from "@mui/material";

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
        <MenuButton>
          <NavigationLink exact to="/">
            <HomeIcon style={{ marginRight: "10px" }} />
            Home
          </NavigationLink>
        </MenuButton>
        <MenuButton>
          <NavigationLink to={`/${currentUser.handle}`}>
            <ProfileIcon style={{ marginRight: "10px" }} />
            Profile
          </NavigationLink>
        </MenuButton>
        <MenuButton>
          <NavigationLink to="/notifications/">
            <NotificationIcon style={{ marginRight: "10px" }} />
            Notifications
          </NavigationLink>
        </MenuButton>
        <MenuButton>
          <NavigationLink to="/bookmarks/">
            <BookmarksIcon style={{ marginRight: "10px" }} />
            Bookmarks
          </NavigationLink>
        </MenuButton>
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

const MenuButton = styled(Button)`
  display: flex;
  justify-content: flex-start;
  width: fit-content;
  text-transform: none;
  border-radius: 25px;
  padding: 0.35em 0.75em;
  font-size: 20px;
  font-weight: 700;
  &:hover {
    background-color: ${COLORS.primary};
  }
`;

const StyledLogo = styled(Logo)`
  width: 50px;
`;

const Navigation = styled.div`
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NavigationLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${COLORS.darkLink};

  &.active {
    background-color: ${COLORS.primary};
    margin: -0.35em -0.75em;
    padding: inherit;
    border-radius: inherit;
  }
`;

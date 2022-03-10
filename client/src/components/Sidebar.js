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
        <NavigationLink exact to="/">
          <MenuButton>
            <HomeIcon style={{ marginRight: "10px" }} />
            Home
          </MenuButton>
        </NavigationLink>
        <NavigationLink to={`/${currentUser.handle}`}>
          <MenuButton>
            <ProfileIcon style={{ marginRight: "10px" }} />
            Profile
          </MenuButton>
        </NavigationLink>
        <NavigationLink to="/notifications/">
          <MenuButton>
            <NotificationIcon style={{ marginRight: "10px" }} />
            Notifications
          </MenuButton>
        </NavigationLink>
        <NavigationLink to="/bookmarks/">
          <MenuButton>
            <BookmarksIcon style={{ marginRight: "10px" }} />
            Bookmarks
          </MenuButton>
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

const MenuButton = styled(Button)`
  background-color: white;
  text-transform: none;
  border-radius: 25px;
  padding: 0.35em 0.75em;
  font-size: 20px;
  font-weight: 700;
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
    color: ${COLORS.primary};
  }
`;

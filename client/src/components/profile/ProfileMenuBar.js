import React from "react";
import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";

// my components
import { COLORS } from "../../constants";

// ProfileMenuBar doesn't do much right now
const ProfileMenuBar = ({ tweets }) => {
  const params = useParams();

  return (
    <HeaderContainer>
      <Header>
        <StyledNavLink exact to={`/${params.profileId}`}>
          Tweets
        </StyledNavLink>
        <StyledLink to={`/${params.profileId}`}>Media</StyledLink>
        <StyledLink to={`/${params.profileId}`}>Likes</StyledLink>
      </Header>
    </HeaderContainer>
  );
};

export default ProfileMenuBar;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  width: calc(100% * 1 / 3);
  &.active {
    padding-bottom: 3px;
    margin-bottom: -8px;
    border-bottom: 3px solid ${COLORS.primary};
    text-decoration-color: ${COLORS.primary};
  }
  color: ${COLORS.darkText};
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-align: center;
  width: calc(100% * 1 / 3);
  color: ${COLORS.darkText};
`;

const HeaderContainer = styled.div`
  margin-top: 1em;
  font-weight: 700;
  font-size: 18px;

  color: ${COLORS.darkText};
  border-bottom: 1px solid ${COLORS.darkSubtext};
  border-top: 1px solid ${COLORS.darkSubtext};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0.5em 0em;
`;

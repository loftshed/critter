import React from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import { COLORS } from "../constants";

const ProfileMenuBar = ({ tweets }) => {
  const params = useParams();

  return (
    <HeaderContainer>
      <Header>
        <StyledNavLink exact to={`/${params.profileId}`}>
          Tweets
        </StyledNavLink>
        <StyledNavLink exact to={`/${params.profileId}/media`}>
          Media
        </StyledNavLink>
        <StyledNavLink exact to={`/${params.profileId}/likes`}>
          Likes
        </StyledNavLink>
      </Header>
    </HeaderContainer>
  );
};

export default ProfileMenuBar;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  width: 33%;
  &.active {
    padding-bottom: 3px;
    margin-bottom: -5px;
    border-bottom: 3px solid ${COLORS.primary};
    text-decoration-color: ${COLORS.primary};
  }
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
  margin: 0.5em 1em;
`;

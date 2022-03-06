import React, { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { COLORS } from "../constants";
import styled from "styled-components";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);

  // destructure all these things from profile property of currentUser
  const {
    profile: {
      avatarSrc,
      bannerSrc,
      bio,
      displayName,
      handle,
      isBeingFollowedByYou,
      isFollowingYou,
      joined,
      location,
      numFollowers,
      numFollowing,
      numLikes,
    },
  } = currentUser;

  return (
    <>
      <Wrapper>
        <div>
          <Banner src={bannerSrc} />
          <Avatar src={avatarSrc} />
        </div>
      </Wrapper>
    </>
  );
};

export default Profile;

const Avatar = styled.img`
  margin: -105px 0px 0px 25px;
  border-radius: 50%;
  border: #fff 5px solid;
  width: 200px;
`;

const Banner = styled.img`
  width: 100%;
`;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
`;

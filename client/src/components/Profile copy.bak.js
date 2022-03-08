import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "./CurrentUserContext";
import { UserContext } from "./UserContext";
// import { FeedContext } from "./FeedContext";
import { COLORS, SIZES, FONTWEIGHT } from "../constants";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import {
  FiMapPin as LocationIcon,
  FiCalendar as CalendarIcon,
} from "react-icons/fi";
import ProfileFeed from "./ProfileFeed";

const Profile = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const { user, userHandle, setUserHandle } = useContext(UserContext);

  // uses parameters from the URL to set user handle
  const profileId = useParams();
  console.log(profileId);

  // useEffect(() => {
  //   setUserHandle(currentHandle.profileId.slice(1));
  // }, [currentHandle.profileId]);

  // console.log(useParams());
  // console.log(userHandle);

  if (user === null) {
    return null;
  }

  // destructure all these things from profile property of currentUser
  const {
    profile: {
      avatarSrc,
      bannerSrc,
      bio,
      displayName,
      handle,
      joined,
      location,
      numFollowers,
      numFollowing,
      // numLikes,
    },
  } = user;

  const joinDate = moment(joined).format(" MMMM Do");

  return (
    <>
      <Wrapper>
        <Banner src={bannerSrc} />
        <UserInfo>
          <Avatar src={avatarSrc} />
          <div>
            <DisplayName>{displayName}</DisplayName>
            <Handle>@{handle}</Handle>
          </div>
          <Bio>{bio}</Bio>
          <FlexRow>
            <LocationJoinDate>
              <LocationIcon />
              {location}
            </LocationJoinDate>
            <LocationJoinDate>
              <CalendarIcon />
              Joined
              {joinDate}
            </LocationJoinDate>
          </FlexRow>
          <FlexRow>
            <FollowData>{numFollowing}</FollowData>
            <FollowDataText>Following</FollowDataText>
            <FollowData>{numFollowers}</FollowData>
            <FollowDataText>Followers</FollowDataText>
          </FlexRow>
        </UserInfo>
        <>
          <ProfileFeed userHandle={userHandle} />
        </>
      </Wrapper>
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  background-color: ${COLORS.darkBg};
  width: 100%;
  height: 100vh;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  border: ${COLORS.darkBorder} 5px solid;
  width: 200px;
`;

const Banner = styled.img`
  width: 100%;
  margin-bottom: -110px;
`;

/// start of UserInfo
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0rem 2rem;
  gap: 1em;
  color: ${COLORS.darkText};
`;

const DisplayName = styled.div`
  font-size: 24px;
  font-weight: ${FONTWEIGHT.boldest};
`;

const Handle = styled.div`
  color: ${COLORS.darkSubtext};
  font-weight: ${FONTWEIGHT.bold};
  font-size: 18px;
`;

const Bio = styled.div``;

const LocationJoinDate = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: ${COLORS.darkSubtext};
`;

const FollowData = styled.div`
  font-weight: ${FONTWEIGHT.boldest};
`;

const FollowDataText = styled.div`
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.darkSubtext};
`;
/// end of UserInfo

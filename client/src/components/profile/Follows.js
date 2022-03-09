import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { UserContext } from "../context/UserContext";
import { FeedContext } from "../context/FeedContext";
import { COLORS, FONTWEIGHT } from "../../constants";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import {
  FiMapPin as LocationIcon,
  FiCalendar as CalendarIcon,
} from "react-icons/fi";
import LoadingSpinner from "../etc/LoadingSpinner";

// for now all of this is just a sloppy copy of profile.js with a different feed

const Follows = () => {
  // const { currentUser } = useContext(CurrentUserContext);
  const { feedItems, receiveFeedItemsFromServer } = useContext(FeedContext);
  const {
    user,
    userHandle,
    setUserHandle,
    getUserProfile,
    follows,
    receiveFollowsFromServer,
  } = useContext(UserContext);
  const params = useParams(); // uses parameters from the URL to set user handle
  const [feedItemsArray, setFeedItemsArray] = useState();

  const [showFollows, setShowFollows] = useState(false);

  useEffect(() => {
    getUserProfile(params.profileId);
    setUserHandle(params.profileId);
    window.scrollTo(0, 0);
  }, [params]);

  useEffect(() => {
    console.log("Fetching profile feed from server");
    fetch(`/api/${params.profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  }, [params.profileId, follows]);

  const getFollowing = () => {
    console.log("Fetching profile's following from server");
    fetch(`/api/${params.profileId}/following`)
      .then((res) => res.json())
      .then((data) => {
        receiveFollowsFromServer(data);
        console.log(data);
      });
  };

  const getFollowers = () => {
    console.log("Fetching profile's followers from server");
    fetch(`/api/${params.profileId}/followers`)
      .then((res) => res.json())
      .then((data) => {
        receiveFollowsFromServer(data);
        console.log(data);
      });
  };

  if (user === null) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  setFeedItemsArray(Object.values(feedItems.tweetsById));

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
            <FollowData onClick={getFollowing}>{numFollowing}</FollowData>
            <FollowDataText>Following</FollowDataText>
            <FollowData onClick={getFollowers}>{numFollowers}</FollowData>
            <FollowDataText>
              {numFollowers > 1 ? "Followers" : "Follower"}
            </FollowDataText>
          </FlexRow>
        </UserInfo>
        <></>
      </Wrapper>
    </>
  );
};

export default Follows;

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
  border: ${COLORS.darkBg} 5px solid;
  width: 200px;
  min-height: 200px;
`;

const Banner = styled.img`
  width: 100%;
  min-height: 350px;
  margin-bottom: -110px;
  object-fit: cover;
  object-position: center;
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

const FollowData = styled.button`
  font-size: 16px;
  padding: 0px;
  font-weight: ${FONTWEIGHT.boldest};
  color: ${COLORS.darkText};
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const FollowDataText = styled.div`
  font-weight: ${FONTWEIGHT.bold};
  color: ${COLORS.darkSubtext};
`;
/// end of UserInfo

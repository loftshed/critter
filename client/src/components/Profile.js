import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import {
  FiMapPin as LocationIcon,
  FiCalendar as CalendarIcon,
  FiLink as LinkIcon,
} from "react-icons/fi";

// my components
import { COLORS, FONTWEIGHT } from "../constants";
import { UserContext } from "./context/UserContext";
import { TweetContext } from "./context/TweetContext";
import ProfileFeed from "./profile/ProfileFeed";
import LoadingSpinner from "./etc/LoadingSpinner";

const Profile = () => {
  const { feedItems, receiveFeedItemsFromServer } = useContext(TweetContext);
  const {
    user,
    setUserHandle,
    getUserProfile,
    receiveFollowsFromServer,
    // follows,
  } = useContext(UserContext);
  const params = useParams(); // uses parameters from the URL to set user handle

  // const [feedItemsArray, setFeedItemsArray] = useState();
  // const [showFollows, setShowFollows] = useState(false);

  useEffect(() => {
    getUserProfile(params.profileId);
    setUserHandle(params.profileId);
    window.scrollTo(0, 0);
  }, [params.profileId]);

  useEffect(() => {
    console.log("Fetching profile feed from server");
    fetch(`/api/${params.profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  }, [params.profileId]);

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

  if (!user || !feedItems) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  console.log(user);

  const feedItemsArray = Object.values(feedItems.tweetsById);

  const joinDate = moment(user.joined).format(" MMMM Do");

  return (
    <>
      <Wrapper>
        <Banner src={user.bannerSrc} />
        <UserInfo>
          <Avatar src={user.avatarSrc} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <DisplayName>{user.displayName}</DisplayName>
              <Handle>
                @{user.handle}
                {user.isFollowingYou && <FollowsU>FOLLOWS YOU</FollowsU>}
              </Handle>
            </div>
            {user.isBeingFollowedByYou && <UFollow>Following</UFollow>}
            {/* try to implement followers/ing! */}
            {!user.isBeingFollowedByYou && <UFollow>Follow</UFollow>}
          </div>
          <Bio>{user.bio}</Bio>
          <InfoRow>
            {user.location && (
              <LocationJoinDate>
                <LocationIcon />
                {user.location}
              </LocationJoinDate>
            )}
            {user.url && (
              <LocationJoinDate>
                <LinkIcon />
                <a
                  style={{ textDecoration: "none", color: `${COLORS.primary}` }}
                  href={user.url}
                >
                  {user.url.replace(/^https?:\/\//, "")}
                </a>
              </LocationJoinDate>
            )}
            <LocationJoinDate>
              <CalendarIcon />
              Joined
              {user.joined}
            </LocationJoinDate>
          </InfoRow>
          <FollowRow>
            <FollowData onClick={getFollowing}>{user.numFollowing}</FollowData>
            <FollowDataText>Following</FollowDataText>
            <FollowData onClick={getFollowers}>{user.numFollowers}</FollowData>
            <FollowDataText>
              {user.numFollowers > 1 ? "Followers" : "Follower"}
            </FollowDataText>
          </FollowRow>
        </UserInfo>
        <>
          <ProfileFeed tweets={feedItemsArray} />
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

const InfoRow = styled.div`
  display: flex;
  gap: 10px;
`;
const FollowRow = styled.div`
  display: flex;
  gap: 5px;
`;

const Avatar = styled.img`
  border-radius: 50%;
  border: ${COLORS.darkBg} 5px solid;
  width: 200px;
  min-height: 200px;
`;

const Banner = styled.img`
  width: 100%;
  height: 350px;
  margin-bottom: -110px;
  object-fit: cover;
  object-position: center;
`;

/// start of UserInfo
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0rem 3rem;
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

const FollowsU = styled.span`
  background-color: ${COLORS.darkSubtext};
  color: white;
  font-size: 11px;
  border-radius: 5px;
  padding: 2px 4px;
  margin-left: 5px;
`;

const UFollow = styled.div`
  height: fit-content;
  border-radius: 50px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 700;
  outline: 1px solid white;
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

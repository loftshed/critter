import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import moment from "moment";
import {
  FiMapPin as LocationIcon,
  FiCalendar as CalendarIcon,
  FiLink as LinkIcon,
} from "react-icons/fi";
import Button from "@mui/material/Button";

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
    getUserProfile,
    receiveFollowsFromServer,
    currentUser,
    setErrorStatus,
    errorStatus,
  } = useContext(UserContext);
  // const [showFollows, setShowFollows] = useState(false);

  const params = useParams(); // uses parameters from the URL to set user handle

  useEffect(() => {
    getUserProfile(params.profileId);
    window.scrollTo(0, 0);
  }, [params.profileId]);

  useEffect(() => {
    console.log("Fetching profile feed from server");
    fetch(`/api/${params.profileId}/feed`)
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  }, [params.profileId]);

  const followUser = () => {
    console.log(`Following user ${params.profileId}`);
    fetch(`/api/${params.profileId}/follow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follow: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getUserProfile(params.profileId);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  const unfollowUser = () => {
    console.log(`Unfollowing user ${params.profileId}`);
    fetch(`/api/${params.profileId}/unfollow`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ follow: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getUserProfile(params.profileId);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  const getFollowing = () => {
    console.log("Fetching profile's following from server");
    fetch(`/api/${params.profileId}/following`)
      .then((res) => res.json())
      .then((data) => {
        receiveFollowsFromServer(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  const getFollowers = () => {
    console.log("Fetching profile's followers from server");
    fetch(`/api/${params.profileId}/followers`)
      .then((res) => res.json())
      .then((data) => {
        receiveFollowsFromServer(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus("error");
      });
  };

  if (!user || !feedItems) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  const tweets = Object.values(feedItems.tweetsById);
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
            {user.handle !== currentUser.handle && (
              <>
                {user.isBeingFollowedByYou && (
                  <UFollow onClick={unfollowUser}>Following</UFollow>
                )}
                {!user.isBeingFollowedByYou && (
                  <UFollow onClick={followUser}>Follow</UFollow>
                )}
              </>
            )}
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
              {joinDate}
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
          <ProfileFeed tweets={tweets} />
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

const UFollow = styled(Button)`
  text-transform: none;
  color: ${COLORS.darkText};
  background-color: ${COLORS.darkTweetBg};
  height: fit-content;
  border-radius: 50px;
  padding: 7.5px 20px;
  font-size: 20px;
  font-weight: 700;
  outline: 2px solid ${COLORS.darkText};
  &:hover {
    background-color: ${COLORS.primary};
  }
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

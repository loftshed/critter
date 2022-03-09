import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import HomeFeed from "./components/feeds/HomeFeed";
import Notifications from "./components/Notifications";
import Profile from "./components/profile/Profile";
import TweetDetails from "./components/TweetDetails";
import Sidebar from "./components/Sidebar";
import { CurrentUserContext } from "./components/context/CurrentUserContext";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import LoadingSpinner from "./components/LoadingSpinner";
import Follows from "./components/profile/Follows";

const App = () => {
  const { currentUser, receiveCurrentUserFromServer } =
    useContext(CurrentUserContext);

  useEffect(() => {
    console.log("Fetching current user profile from server");
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        receiveCurrentUserFromServer(data);
      });
  }, []);

  if (currentUser === null) {
    return (
      <>
        <GlobalStyles />
        <LoadingDiv>
          <LoadingSpinner size="50px" />
        </LoadingDiv>
      </>
    );
  }

  return (
    <Router id="root">
      <WholeAssAppWrapper>
        <GlobalStyles />
        <Sidebar />
        <Content>
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route exact path="/notifications">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>
            <Route path="/:profileId/follows">
              <Follows />
            </Route>
          </Switch>
        </Content>
      </WholeAssAppWrapper>
    </Router>
  );
};

export default App;

// wraps the whole ass app
const WholeAssAppWrapper = styled.div`
  display: flex;
  width: 50vw;
  min-width: 1024px;
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 230px;
`;

const LoadingDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

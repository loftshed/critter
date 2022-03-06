import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Bookmarks from "./components/Bookmarks";
import HomeFeed from "./components/HomeFeed";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import TweetDetails from "./components/TweetDetails";
import Sidebar from "./components/Sidebar";
import { CurrentUserContext } from "./components/CurrentUserContext";
import { FeedContext } from "./components/FeedContext";

const App = () => {
  const { currentUser, status, setStatus, receiveCurrentUserFromServer } =
    useContext(CurrentUserContext);

  const { receiveFeedItemsFromServer, feedItems } = useContext(FeedContext);

  useEffect(() => {
    console.log("Fetching user profile from server");
    fetch("/api/me/profile")
      .then((res) => res.json())
      .then((data) => {
        receiveCurrentUserFromServer(data);
      });

    console.log("Fetching currentUser home feed from server");
    fetch("/api/me/home-feed")
      .then((res) => res.json())
      .then((data) => {
        receiveFeedItemsFromServer(data);
      });
  }, []);

  console.log(feedItems);

  return (
    <>
      {/* {<GlobalStyles />} */}
      <Router>
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route exact path="/notifications/">
              <Notifications />
            </Route>
            <Route exact path="/bookmarks/">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route exact path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;

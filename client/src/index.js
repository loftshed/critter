import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./components/UserContext";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { ComposeTweetProvider } from "./components/ComposeTweetContext";
import { FeedProvider } from "./components/FeedContext";

import App from "./App";

ReactDOM.render(
  <CurrentUserProvider>
    <UserProvider>
      <FeedProvider>
        <ComposeTweetProvider>
          <App />
        </ComposeTweetProvider>
      </FeedProvider>
    </UserProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);

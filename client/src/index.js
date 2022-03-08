import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./components/context/UserContext";
import { CurrentUserProvider } from "./components/context/CurrentUserContext";
import { ComposeTweetProvider } from "./components/context/ComposeTweetContext";
import { FeedProvider } from "./components/context/FeedContext";

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

import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./components/context/UserContext";

import { ComposeTweetProvider } from "./components/context/ComposeTweetContext";
import { FeedProvider } from "./components/context/FeedContext";

import App from "./App";

ReactDOM.render(
  <UserProvider>
    <FeedProvider>
      <ComposeTweetProvider>
        <App />
      </ComposeTweetProvider>
    </FeedProvider>
  </UserProvider>,
  document.getElementById("root")
);

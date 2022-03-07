import React from "react";
import ReactDOM from "react-dom";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { ComposeTweetProvider } from "./components/ComposeTweetContext";
import { FeedProvider } from "./components/FeedContext";

import App from "./App";

ReactDOM.render(
  <CurrentUserProvider>
    <FeedProvider>
      <ComposeTweetProvider>
        <App />
      </ComposeTweetProvider>
    </FeedProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);

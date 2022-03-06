import React from "react";
import ReactDOM from "react-dom";
import { CurrentUserProvider } from "./components/CurrentUserContext";
import { FeedProvider } from "./components/FeedContext";
import App from "./App";

ReactDOM.render(
  <CurrentUserProvider>
    <FeedProvider>
      <App />
    </FeedProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);

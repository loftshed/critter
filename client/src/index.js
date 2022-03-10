import React from "react";
import ReactDOM from "react-dom";

// my components
import { UserProvider } from "./components/context/UserContext";
import { TweetProvider } from "./components/context/TweetContext";
import App from "./App";

ReactDOM.render(
  <UserProvider>
    <TweetProvider>
      <App />
    </TweetProvider>
  </UserProvider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { UserProvider } from "./components/context/UserContext";

import { ComposeTweetProvider } from "./components/context/ComposeTweetContext";

import App from "./App";

ReactDOM.render(
  <UserProvider>
    <ComposeTweetProvider>
      <App />
    </ComposeTweetProvider>
  </UserProvider>,
  document.getElementById("root")
);

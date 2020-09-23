import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import { ContextProvider } from "./context";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>,
    document.getElementById("app")
  );
});

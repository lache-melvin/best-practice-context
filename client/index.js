import React from "react";
import { render } from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import reducers from "./reducers";
import App from "./components/App";

document.addEventListener("DOMContentLoaded", () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById("app")
  );
});

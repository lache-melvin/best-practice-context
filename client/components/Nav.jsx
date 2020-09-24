import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { withAuthentication } from "./index";
import { withUserContext } from "../context";

const groupStyle = {
  float: "right",
};

const linkStyle = {
  marginRight: "30px",
};

function Nav({ authenticated, setUserIfLoggedIn, logOff }) {
  useEffect(() => {
    setUserIfLoggedIn()
  }, []);

  return (
    <>
      <div style={groupStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        {authenticated() ? (
          <Link to="#" data-testid="logoff" style={linkStyle} onClick={logOff}>
            Log off
          </Link>
        ) : (
          <>
            <Link to="/register" data-testid="register" style={linkStyle}>
              Register
            </Link>
            <Link to="/signin" data-testid="signin" style={linkStyle}>
              Sign in
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default withAuthentication(withUserContext(Nav));

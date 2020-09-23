import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDecodedToken, logOff } from "authenticare/client";

import { withUserContext } from "../context";

import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

const groupStyle = {
  float: "right",
};

const linkStyle = {
  marginRight: "30px",
};

function Nav({ setUser }) {
  useEffect(() => {
    const token = getDecodedToken();
    if (token) setUser(token);
  }, []);

  return (
    <>
      <div style={groupStyle}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <IfAuthenticated>
          <Link to="#" data-testid="logoff" style={linkStyle} onClick={logOff}>
            Log off
          </Link>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Link to="/register" data-testid="register" style={linkStyle}>
            Register
          </Link>
          <Link to="/signin" data-testid="signin" style={linkStyle}>
            Sign in
          </Link>
        </IfNotAuthenticated>
      </div>
    </>
  );
}

export default withUserContext(Nav);

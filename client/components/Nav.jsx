import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getDecodedToken, logOff } from "authenticare/client";

import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";
import { signedIn } from "../actions/auth";

const groupStyle = {
  float: "right",
};

const linkStyle = {
  marginRight: "30px",
};

function Nav(props) {
  useEffect(() => {
    const token = getDecodedToken();
    if (token) props.signedIn(token.dataValues);
  });

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

const mapDispatchToProps = { signedIn };

export default connect(null, mapDispatchToProps)(Nav);

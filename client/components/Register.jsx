import React, { useState } from "react";
import { connect } from "react-redux";
import { register, isAuthenticated } from "authenticare/client";

import { signedIn } from "../actions/auth";

import config from "../config";

function Register(props) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    const { username, password } = userData;
    return register(
      { username, password },
      { baseUrl: config.baseApiUrl }
    ).then((token) => {
      if (isAuthenticated()) {
        props.signedIn(token);
        props.history.push("/");
      }
      return null;
    });
  };

  const { username, password } = userData;
  return (
    <>
      <h2>Register</h2>
      <div>
        <div>Username:</div>
        <input name="username" value={username} onChange={handleChange} />

        <div>Password:</div>
        <input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />

        <button type="button" onClick={handleClick}>
          Register
        </button>
      </div>
    </>
  );
}

export default Register;

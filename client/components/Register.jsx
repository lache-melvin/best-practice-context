import React, { useState } from "react";

import { withUserContext } from "../context";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "250px",
};

export function Register({ registerUser }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    registerUser(userData);
  };

  const { username, password } = userData;
  return (
    <>
      <h2>Register</h2>
      <div style={formStyle}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          id="username"
          value={username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
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

export default withUserContext(Register);

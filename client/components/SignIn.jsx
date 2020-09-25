import React, { useState } from "react";

import { wrappedWith, userContext } from "../wrappers";

const formStyle = {
  display: "flex",
  flexDirection: "column",
  maxWidth: "250px",
};

export function SignIn({ signInUser }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    signInUser(userData);
  };

  const { username, password } = userData;
  return (
    <>
      <h2>Sign in</h2>
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
          Sign in
        </button>
      </div>
    </>
  );
}

export default wrappedWith([userContext], SignIn);

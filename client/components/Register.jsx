import React, { useState } from "react";

import withUserContext from "./UserContextWrapper";

function Register({ registerUser }) {
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

export default withUserContext(Register);

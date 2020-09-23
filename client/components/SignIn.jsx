import React, { useState } from "react";

import { useUserContext } from "../context";

import { signInUser } from "../coordinators";

function SignIn(props) {
  const { signedIn } = useUserContext();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleClick = () => {
    signInUser(userData, props.history, signedIn);
  };

  const { username, password } = userData;
  return (
    <>
      <h2>Sign in</h2>
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
          Sign in
        </button>
      </div>
    </>
  );
}


export default SignIn;

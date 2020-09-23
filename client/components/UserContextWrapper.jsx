import React from "react";

import { useUserContext } from "../context";
import { registerUser, signInUser } from "../coordinators";

function withUserContext(Component) {
  return function UserContextWrapper(props) {
    const { applyUser, user } = useUserContext();

    const register = (credentials) => {
      registerUser(credentials, props.history, applyUser);
    };

    const signIn = (credentials) => {
      signInUser(credentials, props.history, applyUser);
    };

    const setUser = (token) => {
      applyUser(token);
    };

    return (
      <Component
        user={user}
        registerUser={register}
        signInUser={signIn}
        setUser={setUser}
        {...props}
      />
    );
  };
}

export default withUserContext;

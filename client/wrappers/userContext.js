import React from "react";

import { useUserContext } from "../context";

function makeUserContextWrapper(
  configuredRegister,
  configuredSignIn,
  getDecodedToken,
  isAuthenticated,
  logOff
) {
  return function withUserContext(Component) {
    return function UserContextWrapper(props) {
      const { applyUser, user } = useUserContext();

      const registerUser = (credentials) => {
        configuredRegister(credentials)
          .then((token) => {
            if (isAuthenticated()) {
              applyUser(token);
              props.history.push("/");
            }
            return;
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const signInUser = (credentials) => {
        configuredSignIn(credentials)
          .then((token) => {
            if (isAuthenticated()) {
              applyUser(token);
              props.history.push("/");
            }
            return;
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const setUserIfLoggedIn = () => {
        const token = getDecodedToken();
        token && applyUser(token);
      };

      const logOut = () => {
        logOff();
        applyUser({ dataValues: { id: null, username: null } });
      };

      return (
        <Component
          user={user}
          registerUser={registerUser}
          signInUser={signInUser}
          setUserIfLoggedIn={setUserIfLoggedIn}
          logOut={logOut}
          {...props}
        />
      );
    };
  };
}

export default makeUserContextWrapper;

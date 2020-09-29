import React, { useContext } from "react";

import { UserContext } from "../context";

function makeUserContextWrapper(
  configuredRegister,
  configuredSignIn,
  getDecodedToken,
  isAuthenticated,
  logOff,
  logger = console
) {
  return function withUserContext(Component) {
    return function UserContextWrapper(props) {
      const [user, setUser] = useContext(UserContext);

      const registerUser = (credentials) => {
        return configuredRegister(credentials)
          .then((token) => {
            if (isAuthenticated()) {
              const { id, username } = token.dataValues;
              const userData = { id, username };
              setUser(userData);
              props.history.push("/");
            }
            return;
          })
          .catch((err) => {
            logger.error(err);
          });
      };

      const signInUser = (credentials) => {
        return configuredSignIn(credentials)
          .then((token) => {
            if (isAuthenticated()) {
              const { id, username } = token.dataValues;
              const userData = { id, username };
              setUser(userData);
              props.history.push("/");
            }
            return;
          })
          .catch((err) => {
            logger.error(err);
          });
      };

      const setUserIfLoggedIn = () => {
        const token = getDecodedToken();
        if (token) {
          const { id, username } = token.dataValues;
          const userData = { id, username };
          setUser(userData);
        }
      };

      const logOut = () => {
        logOff();
        setUser({ id: null, username: null });
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

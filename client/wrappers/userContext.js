import React, { useContext } from "react";

import { UserContext } from "../context";

function makeUserContextWrapper(
  configuredRegister,
  configuredSignIn,
  getDecodedToken,
  isAuthenticated,
  logOff
) {
  return function withUserContext(Component) {
    return function UserContextWrapper(props) {
      const [user, setUser] = useContext(UserContext);

      const registerUser = (credentials) => {
        configuredRegister(credentials)
          .then((token) => {
            if (isAuthenticated()) {
              setUser(token);
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
              setUser(token);
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
        token && setUser(token);
      };

      const logOut = () => {
        logOff();
        setUser({ dataValues: { id: null, username: null } });
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

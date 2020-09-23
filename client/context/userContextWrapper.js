import React from "react";

function makeUserContextWrapper(
  getDecodedToken,
  logOff,
  registerUser,
  signInUser,
  useUserContext
) {
  return function withUserContext(Component) {
    return function UserContextWrapper(props) {
      const { applyUser, user } = useUserContext();

      const register = (credentials) => {
        registerUser(credentials, props.history, applyUser);
      };

      const signIn = (credentials) => {
        signInUser(credentials, props.history, applyUser);
      };

      const ifLoggedIn = () => {
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
          registerUser={register}
          signInUser={signIn}
          setUserIfLoggedIn={ifLoggedIn}
          logOff={logOut}
          {...props}
        />
      );
    };
  };
}

export default makeUserContextWrapper;

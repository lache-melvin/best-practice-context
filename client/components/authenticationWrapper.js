import React from "react";

function makeAuthenticationWrapper(isAuthenticated) {
  return function withAuthentication(Component) {
    return function AuthenticationWrapper(props) {
      const authenticated = () => {
        return isAuthenticated();
      };

      return <Component authenticated={authenticated} {...props} />;
    };
  };
}

export default makeAuthenticationWrapper;

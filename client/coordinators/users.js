export function makeRegisterUser(configuredRegister, isAuthenticated) {
  return function (credentials, history, signedIn) {
    return configuredRegister(credentials).then((token) => {
      if (isAuthenticated()) {
        signedIn(token);
        history.push("/");
      }
      return null;
    });
  };
}

export function makeSignInUser(configuredSignIn, isAuthenticated) {
  return function (credentials, history, signedIn) {
    return configuredSignIn(credentials).then((token) => {
      if (isAuthenticated()) {
        signedIn(token);
        history.push("/");
      }
      return null;
    });
  };
}

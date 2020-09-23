export function makeRegisterUser(configuredRegister, isAuthenticated) {
  return function (credentials, history, signedIn) {
    return configuredRegister(credentials)
      .then((token) => {
        if (isAuthenticated()) {
          signedIn(token);
          history.push("/");
          return;
        }
        throw new Error("authentication failure");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

export function makeSignInUser(configuredSignIn, isAuthenticated) {
  return function (credentials, history, signedIn) {
    return configuredSignIn(credentials)
      .then((token) => {
        if (isAuthenticated()) {
          signedIn(token);
          history.push("/");
          return;
        }
        throw new Error("authentication failure");
      })
      .catch((err) => {
        console.error(err);
      });
  };
}

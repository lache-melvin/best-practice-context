export function makeRegisterUser(configuredRegister, isAuthenticated) {
  return function (credentials, history, applyUser) {
    return configuredRegister(credentials)
      .then((token) => {
        if (isAuthenticated()) {
          applyUser(token);
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
  return function (credentials, history, applyUser) {
    return configuredSignIn(credentials)
      .then((token) => {
        if (isAuthenticated()) {
          applyUser(token);
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

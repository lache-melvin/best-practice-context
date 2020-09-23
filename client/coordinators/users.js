export function makeRegisterUser(configuredRegister, isAuthenticated) {
  return function (userData, history, signedIn) {
    const { username, password } = userData;
    return configuredRegister({ username, password }).then((token) => {
      if (isAuthenticated()) {
        signedIn(token);
        history.push("/");
      }
      return null;
    });
  };
}

export function makeSignInUser(configuredSignIn, isAuthenticated) {
  return function (userData, history, signedIn) {
    const { username, password } = userData;
    return configuredSignIn({ username, password }).then((token) => {
      if (isAuthenticated()) {
        signedIn(token);
        history.push("/");
      }
      return null;
    });
  };
}

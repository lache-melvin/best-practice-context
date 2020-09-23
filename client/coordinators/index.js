import { register, signIn, isAuthenticated } from "authenticare/client";

import config from "../config";

import { makeRegisterUser, makeSignInUser } from "./users";

function configuredRegister(userData) {
  return register(userData, { baseUrl: config.baseApiUrl });
}

function configuredSignIn(userData) {
  return signIn(userData, { baseUrl: config.baseApiUrl });
}

export const registerUser = makeRegisterUser(
  configuredRegister,
  isAuthenticated
);
export const signInUser = makeSignInUser(configuredSignIn, isAuthenticated);

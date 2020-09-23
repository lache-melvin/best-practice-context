import { register, signIn, isAuthenticated } from "authenticare/client";

import config from "../config";

import { addEntry } from "../api";

import { makeRegisterUser, makeSignInUser } from "./users";
import { makeSubmitEntry } from "./entries";

function configuredRegister(credentials) {
  const { username, password } = credentials;
  const userData = { username, password };
  return register(userData, { baseUrl: config.baseApiUrl });
}

function configuredSignIn(credentials) {
  const { username, password } = credentials;
  const userData = { username, password };
  return signIn(userData, { baseUrl: config.baseApiUrl });
}

export const registerUser = makeRegisterUser(
  configuredRegister,
  isAuthenticated
);
export const signInUser = makeSignInUser(configuredSignIn, isAuthenticated);

export const submitEntry = makeSubmitEntry(addEntry);

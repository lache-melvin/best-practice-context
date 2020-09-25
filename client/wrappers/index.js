import {
  register,
  signIn,
  getDecodedToken,
  isAuthenticated,
  logOff,
} from "authenticare/client";

import config from "../config";

import { getEntries, getEntryById, addEntry } from "../api";

import makeAuthenticationWrapper from "./authentication";
import makeEntriesContextWrapper from "./entriesContext";
import makeEntryContextWrapper from "./entryContext";
import makeUserContextWrapper from "./userContext";

export const authentication = makeAuthenticationWrapper(isAuthenticated);
export const entriesContext = makeEntriesContextWrapper(getEntries);
export const entryContext = makeEntryContextWrapper(getEntryById, addEntry);
export const userContext = makeUserContextWrapper(
  configuredRegister,
  configuredSignIn,
  getDecodedToken,
  isAuthenticated,
  logOff
);

export function wrappedWith(wrappers, Component) {
  if (!wrappers.length) return Component;
  const rest = (wraps) => {
    wraps.shift();
    return wraps;
  };
  return wrappers[0](wrappedWith(rest(wrappers), Component));
}

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

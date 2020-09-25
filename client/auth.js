import {
  register as authRegister,
  signIn as authSignIn,
  getDecodedToken as authGetDecodedToken,
  isAuthenticated as authIsAuthenticated,
  getAuthorizationHeader as authGetAuthZHeader,
  logOff as authLogOff,
} from "authenticare/client";

import config from "./config";

export function register(credentials) {
  const { username, password } = credentials;
  const userData = { username, password };
  return authRegister(userData, { baseUrl: config.baseApiUrl });
}

export function signIn(credentials) {
  const { username, password } = credentials;
  const userData = { username, password };
  return authSignIn(userData, { baseUrl: config.baseApiUrl });
}

export function getDecodedToken() {
  return authGetDecodedToken();
}

export function isAuthenticated() {
  return authIsAuthenticated();
}

export function getAuthorizationHeader() {
  return authGetAuthZHeader();
}

export function logOff() {
  return authLogOff();
}

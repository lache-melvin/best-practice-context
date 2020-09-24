import React from "react";
import {
  register,
  signIn,
  getDecodedToken,
  isAuthenticated,
  logOff,
} from "authenticare/client";

import config from "../config";

import { getEntries, getEntryById, addEntry } from "../api";

import { EntriesContextProvider } from "./entriesContext";
import { EntryContextProvider } from "./entryContext";
import { UserContextProvider } from "./userContext";

import makeEntriesContextWrapper from "./entriesContextWrapper";
import makeEntryContextWrapper from "./entryContextWrapper";
import makeUserContextWrapper from "./userContextWrapper";

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

export const withEntriesContext = makeEntriesContextWrapper(getEntries);
export const withEntryContext = makeEntryContextWrapper(getEntryById, addEntry);
export const withUserContext = makeUserContextWrapper(
  configuredRegister,
  configuredSignIn,
  getDecodedToken,
  isAuthenticated,
  logOff
);

export const ContextProvider = combineContextProviders([
  EntriesContextProvider,
  EntryContextProvider,
  UserContextProvider,
]);

function combineContextProviders(providers) {
  const UI = ({ children }) => children;
  return providers.reduce((Content, Provider) => {
    const Context = ({ children }) => {
      return (
        <Provider>
          <Content>{children}</Content>
        </Provider>
      );
    };
    return Context;
  }, UI);
}

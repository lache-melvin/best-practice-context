import React from "react";
import { getDecodedToken, logOff } from "authenticare/client";

import {
  retrieveEntries,
  retrieveEntryById,
  submitEntry,
  registerUser,
  signInUser,
} from "../coordinators";

import { EntriesContextProvider } from "./entriesContext";
import { EntryContextProvider } from "./entryContext";
import { UserContextProvider } from "./userContext";

import useEntriesContext from "./useEntriesContext";
import useEntryContext from "./useEntryContext";
import useUserContext from "./useUserContext";

import makeEntriesContextWrapper from "./entriesContextWrapper";
import makeEntryContextWrapper from "./entryContextWrapper";
import makeUserContextWrapper from "./userContextWrapper";

export const ContextProvider = combineContextProviders([
  EntriesContextProvider,
  EntryContextProvider,
  UserContextProvider,
]);

export const withEntriesContext = makeEntriesContextWrapper(
  retrieveEntries,
  useEntriesContext
);
export const withEntryContext = makeEntryContextWrapper(
  retrieveEntryById,
  submitEntry,
  useEntryContext
);
export const withUserContext = makeUserContextWrapper(
  getDecodedToken,
  logOff,
  registerUser,
  signInUser,
  useUserContext
);

function combineContextProviders(providers) {
  const UI = ({ children }) => {
    return children;
  };
  if (!providers.length) return UI;
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

import React from "react";

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

export const ContextProvider = ({ children }) => {
  return (
    <EntriesContextProvider>
      <EntryContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </EntryContextProvider>
    </EntriesContextProvider>
  );
};

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
  registerUser,
  signInUser,
  useUserContext
);

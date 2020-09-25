import React from "react";

import { EntriesContextProvider } from "./entriesContext";
import { EntryContextProvider } from "./entryContext";
import { UserContextProvider } from "./userContext";

import useEntriesContext from "./useEntriesContext";
import useEntryContext from "./useEntryContext";
import useUserContext from "./useUserContext";

export { useEntriesContext, useEntryContext, useUserContext };

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

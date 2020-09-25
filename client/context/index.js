import React from "react";

import { EntriesContextProvider } from "./entriesContext";
import { EntryContextProvider } from "./entryContext";
import { UserContextProvider } from "./userContext";

import entriesContextHook from "./useEntriesContext";
import entryContextHook from "./useEntryContext";
import userContextHook from "./useUserContext";

export const useEntriesContext = entriesContextHook;
export const useEntryContext = entryContextHook;
export const useUserContext = userContextHook;

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

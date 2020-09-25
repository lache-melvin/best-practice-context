import React from "react";

import { EntriesContextProvider } from "./entriesContext";
import { EntryContextProvider } from "./entryContext";
import { UserContextProvider } from "./userContext";

import useEntriesContext from "./useEntriesContext";
import useEntryContext from "./useEntryContext";
import useUserContext from "./useUserContext";

export { useEntriesContext, useEntryContext, useUserContext };

export const ContextProvider = combineContextProviders(
  EntriesContextProvider,
  EntryContextProvider,
  UserContextProvider
);

export function combineContextProviders(...providers) {
  const remaining = ([, ...rest]) => rest;
  const provide = (providers, UI) => {
    if (!providers.length) return UI;
    const Provider = providers[0];
    return <Provider>{provide(remaining(providers), UI)}</Provider>;
  };
  return function CombinedContextProvider({ children }) {
    return provide(providers, children);
  };
}

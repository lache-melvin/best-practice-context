import React from "react";

import { EntriesContextProvider } from "./EntriesContext";
import { EntryContextProvider } from "./EntryContext";
import { UserContextProvider } from "./UserContext";

import useEntriesContext from "./useEntriesContext";
import useEntryContext from "./useEntryContext";
import useUserContext from "./useUserContext";

export const ContextProvider = ({ children }) => {
  return (
    <EntriesContextProvider>
      <EntryContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </EntryContextProvider>
    </EntriesContextProvider>
  );
};

export { useUserContext, useEntryContext, useEntriesContext };

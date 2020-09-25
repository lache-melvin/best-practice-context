import { contextCreate, combineProviders } from "./context-utils";

const [EntriesContextProvider, useEntriesContext] = contextCreate([]);
const [EntryContextProvider, useEntryContext] = contextCreate({});
const [UserContextProvider, useUserContext] = contextCreate({});

export { useEntriesContext, useEntryContext, useUserContext };

export const ContextProvider = combineProviders(
  EntriesContextProvider,
  EntryContextProvider,
  UserContextProvider
);

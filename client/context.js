import { contextCreate, combineProviders } from "./context-utils";

const [EntriesContext, EntriesContextProvider] = contextCreate([], "Entries");
const [EntryContext, EntryContextProvider] = contextCreate({}, "Entry");
const [UserContext, UserContextProvider] = contextCreate({}, "User");

export { EntriesContext, EntryContext, UserContext };

export const ContextProvider = combineProviders(
  EntriesContextProvider,
  EntryContextProvider,
  UserContextProvider
);

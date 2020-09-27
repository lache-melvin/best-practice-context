import { newContext, createCombinedProvider } from "./context-utils";

export const EntriesContext = newContext("Entries", []);
export const EntryContext = newContext("Entry", {});
export const UserContext = newContext("User", {});

export const ContextProvider = createCombinedProvider(
  EntriesContext,
  EntryContext,
  UserContext
);

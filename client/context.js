import { newContext, createCombinedProvider } from "./context-utils";

export const EntriesContext = newContext("Entries", []);
// using defaultValue as wrapped EntryItem is used in Entries component test
// TODO: figure out if this is the best way...
export const EntryContext = newContext("Entry", {}, [{}, () => {}]);
export const UserContext = newContext("User", {});

export const ContextProvider = createCombinedProvider(
  EntriesContext,
  EntryContext,
  UserContext
);

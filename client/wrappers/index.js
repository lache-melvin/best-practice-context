import {
  register,
  signIn,
  getDecodedToken,
  isAuthenticated,
  logOff,
} from "../auth";

import { getEntries, getEntryById, addEntry } from "../api";

import makeAuthenticationWrapper from "./authentication";
import makeEntriesContextWrapper from "./entriesContext";
import makeEntryContextWrapper from "./entryContext";
import makeUserContextWrapper from "./userContext";

export const authentication = makeAuthenticationWrapper(isAuthenticated);
export const entriesContext = makeEntriesContextWrapper(getEntries);
export const entryContext = makeEntryContextWrapper(getEntryById, addEntry);
export const userContext = makeUserContextWrapper(
  register,
  signIn,
  getDecodedToken,
  isAuthenticated,
  logOff
);

export function wrappedWith(...wrappers) {
  const remaining = ([, ...rest]) => rest;
  const wrap = (wrappers, content) => {
    if (!wrappers.length) return content;
    return wrappers[0](wrap(remaining(wrappers), content));
  };
  return function (component) {
    return wrap(wrappers, component);
  };
}

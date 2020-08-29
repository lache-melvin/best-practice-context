import { getEntries, getEntryById, addEntry } from "../api";

export const RECEIVE_ENTRIES = "RECEIVE_ENTRIES";
export const RECEIVE_ENTRY = "RECEIVE_ENTRY";

export function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries: entries,
  };
}

export function receiveEntry(entry) {
  return {
    type: RECEIVE_ENTRY,
    entry: entry,
  };
}

export function fetchEntries() {
  return (dispatch) => {
    return getEntries()
      .then((entries) => {
        dispatch(receiveEntries(entries));
        return entries;
      })
      .catch((err) => {
        console.error("fetchEntries action error:", err);
        throw err;
      });
  };
}

export function fetchEntryById(id) {
  return (dispatch) => {
    return getEntryById(id)
      .then((entry) => {
        dispatch(receiveEntry(entry));
        return entry;
      })
      .catch((err) => {
        console.error("fetchEntryById action error:", err);
        throw err;
      });
  };
}

export function saveEntry(entry) {
  return (dispatch) => {
    return addEntry(entry)
      .then((added) => {
        dispatch(receiveEntry(added));
        return added;
      })
      .catch((err) => {
        console.error("saveEntry action error:", err);
        throw err;
      });
  };
}

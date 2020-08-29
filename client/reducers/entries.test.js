import entriesReducer from "./entries";
import { RECEIVE_ENTRIES } from "../actions/entries";
import mockEntries from "../testing/mockEntries";

test("entriesReducer responds correctly to RECEIVE_ENTRIES", () => {
  const currentState = [];
  const action = {
    type: RECEIVE_ENTRIES,
    entries: mockEntries,
  };

  const newState = entriesReducer(currentState, action);

  expect(newState).toHaveLength(3);
  expect(newState).not.toBe(currentState);
});

test("entriesReducer responds correctly to unknown action type", () => {
  const currentState = [];
  const action = {
    type: "UNKNOWN_TYPE",
  };

  const newState = entriesReducer(currentState, action);

  expect(newState).toHaveLength(0);
  expect(newState).toBe(currentState);
});

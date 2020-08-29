import entryReducer from "./entry";
import { RECEIVE_ENTRY } from "../actions/entries";
import mockEntries from "../testing/mockEntries";

test("entryReducer responds correctly to RECEIVE_ENTRY", () => {
  const currentState = { name: "current entry" };
  const action = {
    type: RECEIVE_ENTRY,
    entry: mockEntries[0],
  };

  const newState = entryReducer(currentState, action);

  expect(newState.name).toBe("mocked entry 1");
  expect(newState).not.toBe(currentState);
});

test("entryReducer responds correctly to unknown action type", () => {
  const currentState = {};
  const action = {
    type: "UNKNOWN_TYPE",
  };

  const newState = entryReducer(currentState, action);

  expect(newState).toBe(currentState);
});

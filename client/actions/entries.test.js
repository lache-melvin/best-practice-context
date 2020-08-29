import {
  RECEIVE_ENTRIES,
  receiveEntries,
  RECEIVE_ENTRY,
  receiveEntry,
  saveEntry,
  fetchEntries,
  fetchEntryById,
} from "./entries";

import { getEntries, getEntryById, addEntry } from "../api";

import mockEntries from "../testing/mockEntries";

jest.mock("../api", () => ({
  getEntries: jest.fn(),
  getEntryById: jest.fn(),
  addEntry: jest.fn(),
}));

test("receiveEntries() returns the correct action", () => {
  const entries = [{ name: "test1" }, { name: "test2" }];

  const action = receiveEntries(entries);

  expect(action.type).toBe(RECEIVE_ENTRIES);
  expect(action.entries).toHaveLength(2);
  expect(action.entries[1].name).toBe("test2");
});

test("receiveEntry() returns the correct action", () => {
  const entry = { name: "test1" };

  const action = receiveEntry(entry);

  expect(action.type).toBe(RECEIVE_ENTRY);
  expect(action.entry.name).toBe(entry.name);
});

test("fetchEntries() dispatches RECEIVE_ENTRIES action", () => {
  const mockDispatch = jest.fn();
  getEntries.mockImplementation(() => Promise.resolve(mockEntries));

  const action = fetchEntries();

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_ENTRIES);
    expect(mockDispatch.mock.calls[0][0].entries).toHaveLength(3);
    return null;
  });
});

test("fetchEntryById() dispatches RECEIVE_ENTRY action", () => {
  const mockDispatch = jest.fn();
  getEntryById.mockImplementation(() => Promise.resolve(mockEntries[0]));

  const action = fetchEntryById(1);

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_ENTRY);
    expect(mockDispatch.mock.calls[0][0].entry.name).toBe("mocked entry 1");
    return null;
  });
});

test("saveEntry() dispatches RECEIVE_ENTRY action", () => {
  const mockDispatch = jest.fn();
  addEntry.mockImplementation((entry) => Promise.resolve({ id: 3, ...entry }));
  const entry = { name: "test1" };

  const action = saveEntry(entry);

  return action(mockDispatch).then(() => {
    expect(mockDispatch.mock.calls).toHaveLength(1);
    expect(mockDispatch.mock.calls[0][0].type).toBe(RECEIVE_ENTRY);
    expect(mockDispatch.mock.calls[0][0].entry.name).toBe(entry.name);
    return null;
  });
});

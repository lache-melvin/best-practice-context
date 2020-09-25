import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { EntryDetail } from "./EntryDetail";
import mockEntries from "../testing/mockEntries";

test("renders empty tags if entry not available from either context", () => {
  const entries = [];
  const entry = {};
  const { asFragment } = render(
    <EntryDetail entry={entry} entries={entries} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders empty tags when entry undefined and entries empty", () => {
  const entries = [];
  const { asFragment } = render(<EntryDetail entries={entries} />);
  expect(asFragment()).toMatchSnapshot();
});

test("renders empty tags if entry id doesn't match params id", () => {
  const entries = [];
  const entry = mockEntries[0];
  const match = { params: { id: 2 } };
  const retrieveEntryById = () => {};
  const { asFragment } = render(
    <EntryDetail
      match={match}
      entries={entries}
      entry={entry}
      retrieveEntryById={retrieveEntryById}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders empty tags if entry undefined and no entries found with matching id", () => {
  const entries = [mockEntries[1], mockEntries[2]];
  const match = { params: { id: 1 } };
  const retrieveEntryById = () => {};
  const { asFragment } = render(
    <EntryDetail
      match={match}
      entries={entries}
      retrieveEntryById={retrieveEntryById}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders entry when entry with matching id is provided", () => {
  const entry = mockEntries[0];
  const match = { params: { id: 1 } };
  const { asFragment } = render(<EntryDetail match={match} entry={entry} />);
  expect(asFragment()).toMatchSnapshot();
});

test("renders entry from entries state when found with matching id", () => {
  const entries = mockEntries;
  const match = { params: { id: 1 } };
  const { asFragment } = render(
    <EntryDetail match={match} entries={entries} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders entry with entry state over entries state", () => {
  const entries = mockEntries;
  const entry = {
    id: 1,
    name: "test entry",
    link: "https://testlink.com",
    description: "test description",
  };
  const match = { params: { id: 1 } };
  const { asFragment } = render(
    <EntryDetail match={match} entries={entries} entry={entry} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("retrieveEntryById is called if entry not found and id exists", () => {
  const entries = [];
  const entry = {};
  const retrieveEntryById = jest.fn();
  const match = { params: { id: 1 } };
  render(
    <EntryDetail
      entries={entries}
      entry={entry}
      retrieveEntryById={retrieveEntryById}
      match={match}
    />
  );
  expect(retrieveEntryById).toHaveBeenCalled();
});

test("retrieveEntryById is not called if id is null", () => {
  const entries = [];
  const entry = {};
  const retrieveEntryById = jest.fn();
  render(
    <EntryDetail
      entries={entries}
      entry={entry}
      retrieveEntryById={retrieveEntryById}
    />
  );
  expect(retrieveEntryById).not.toHaveBeenCalled();
});

test("retrieveEntryById is not called if entry is found", () => {
  const entry = mockEntries[0];
  const retrieveEntryById = jest.fn();
  const match = { params: { id: 1 } };
  render(
    <EntryDetail
      entry={entry}
      retrieveEntryById={retrieveEntryById}
      match={match}
    />
  );
  expect(retrieveEntryById).not.toHaveBeenCalled();
});

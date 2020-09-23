import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";
import "@testing-library/jest-dom";

import Entries from "./Entries";
import { getEntries } from "../api";
import { useEntriesContext, useEntryContext } from "../context";

import mockEntries from "../testing/mockEntries";

jest.mock("../api");

jest.mock("../context");

test("<Entries> shows entries from API", async () => {
  getEntries.mockReturnValue(Promise.resolve());
  useEntriesContext.mockReturnValue({
    receiveEntries: jest.fn(),
    entriesState: mockEntries,
  });
  useEntryContext.mockReturnValue({
    receiveEntry: jest.fn(),
  });

  renderWithRouter(<Entries />);
  const entries = await screen.findAllByTestId("entry");
  expect(entries).toHaveLength(3);
  expect(entries[1]).not.toHaveTextContent("1");
  expect(entries[1]).toHaveTextContent("2");
  expect(entries[1]).not.toHaveTextContent("3");
  expect(getEntries).toHaveBeenCalled();
  expect(useEntriesContext).toHaveBeenCalled();
  expect(useEntryContext).toHaveBeenCalled();
  expect(useEntriesContext().receiveEntries).toHaveBeenCalled();
  // expect(useEntryContext().receiveEntry).toHaveBeenCalled();
});

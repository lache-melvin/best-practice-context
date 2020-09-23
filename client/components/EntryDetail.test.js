import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import EntryDetail from "./EntryDetail";
import mockEntries from "../testing/mockEntries";

import { useEntriesContext, useEntryContext } from "../context";

jest.mock("../context");

test("<EntryDetail> includes name in <li>", async () => {
  useEntriesContext.mockReturnValue({
    entries: mockEntries,
  });
  useEntryContext.mockReturnValue({
    applyEntry: jest.fn(),
    entry: mockEntries[1],
  });
  const initialEntries = ["/entry/2"];
  renderWithRouter(<EntryDetail match={{ params: { id: 2 } }} />, {
    initialEntries,
  });
  const entry = await screen.findByText("mocked entry 2");
  expect(entry).toBeInTheDocument();
  expect(entry).toMatchSnapshot();
});

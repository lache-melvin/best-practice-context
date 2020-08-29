import React from "react";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../testing/utils";
import "@testing-library/jest-dom";

import Entries from "./Entries";
import { getEntries } from "../api";
import mockEntries from "../testing/mockEntries";

jest.mock("../api", () => ({
  getEntries: jest.fn(),
}));

test("<Entries> shows entries from API", async () => {
  getEntries.mockImplementation(() => Promise.resolve(mockEntries));

  renderWithRedux(<Entries />, { initialState: { entries: mockEntries } });
  const entries = await screen.findAllByTestId("entry");
  expect(entries).toHaveLength(3);
  expect(entries[1]).not.toHaveTextContent("1");
  expect(entries[1]).toHaveTextContent("2");
  expect(entries[1]).not.toHaveTextContent("3");
});

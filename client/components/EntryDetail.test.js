import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../testing/utils";

import EntryDetail from "./EntryDetail";
import mockEntries from "../testing/mockEntries";

test("<EntryDetail> includes name in <li>", async () => {
  const initialState = {
    entries: mockEntries,
  };
  const initialEntries = ["/entry/2"];
  renderWithRedux(<EntryDetail match={{ params: { id: 2 } }} />, {
    initialState,
    initialEntries,
  });
  const entry = await screen.findByText("mocked entry 2");
  expect(entry).toBeInTheDocument();
  expect(entry).toMatchSnapshot();
});

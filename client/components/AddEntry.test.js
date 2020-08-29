import React from "react";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import { renderWithRedux } from "../testing/utils";

import AddEntry from "./AddEntry";

test("<AddEntry> includes name in <li>", async () => {
  renderWithRedux(<AddEntry />);
  const entry = await screen.findByTestId("addentry");
  expect(entry).toBeInTheDocument();
  expect(entry).toMatchSnapshot();
});

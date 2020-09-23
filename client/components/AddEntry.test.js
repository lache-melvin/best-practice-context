import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import AddEntry from "./AddEntry";

import { addEntry } from "../api";
import { useEntryContext, useUserContext } from "../context";

jest.mock("../api", () => {
  return {
    addEntry: jest.fn(),
  };
});

jest.mock("../context", () => {
  return {
    useEntryContext: jest.fn(() => {
      return {
        receiveEntry: jest.fn(),
      };
    }),
    useUserContext: jest.fn(() => {
      return {
        userState: { id: 1 },
      };
    }),
  };
});

test("<AddEntry> includes name in <li>", async () => {
  renderWithRouter(<AddEntry />);
  const entry = await screen.findByTestId("addentry");
  expect(entry).toBeInTheDocument();
  expect(entry).toMatchSnapshot();
});

test("<AddEntry> renders with context correctly", async () => {
  renderWithRouter(<AddEntry />);
  expect(useEntryContext).toHaveBeenCalled();
  expect(useUserContext).toHaveBeenCalled();
});

// test("button exists", async () => {
//   renderWithRouter(<AddEntry />);
//   const addButton = await screen.getByRole("button", {
//     name: "Add this entry",
//   });
//   expect(addButton).toBeInTheDocument();
// });

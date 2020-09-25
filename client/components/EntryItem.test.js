import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import { EntryItem } from "./EntryItem";
import mockEntries from "../testing/mockEntries";

test("renders an entry item correctly", () => {
  const entryData = mockEntries[0];
  const { asFragment } = renderWithRouter(<EntryItem entryData={entryData} />);
  expect(asFragment()).toMatchSnapshot();
});

test("calls selectEntry on Link click", async () => {
  const selectEntry = jest.fn();
  const entryData = mockEntries[0];
  renderWithRouter(
    <EntryItem selectEntry={selectEntry} entryData={entryData} />
  );

  const entryLink = await screen.getByRole("link", { name: "mocked entry 1" });
  fireEvent.click(entryLink);

  expect(selectEntry).toHaveBeenCalled();
});

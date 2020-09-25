import React from "react";
import { renderWithRouter } from "../testing/utils";
import "@testing-library/jest-dom";

import { Entries } from "./Entries";

import mockEntries from "../testing/mockEntries";

test("renders entries page correctly when authenticated", () => {
  const { asFragment } = renderWithRouter(
    <Entries
      authenticated={() => true}
      entries={mockEntries}
      retrieveEntries={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders entries page correctly when not authenticated", () => {
  const { asFragment } = renderWithRouter(
    <Entries
      authenticated={() => false}
      retrieveEntries={() => {}}
      entries={mockEntries}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("useEffect calls retrieveEntries on mount", () => {
  const retrieveEntries = jest.fn();
  renderWithRouter(
    <Entries
      authenticated={() => false}
      entries={mockEntries}
      retrieveEntries={retrieveEntries}
    />
  );

  expect(retrieveEntries).toHaveBeenCalled();
});

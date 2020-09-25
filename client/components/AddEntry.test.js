import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import { AddEntry } from "./AddEntry";

test("renders correctly when authenticated", () => {
  const { asFragment } = renderWithRouter(
    <AddEntry authenticated={() => true} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders correctly when not authenticated", () => {
  const { asFragment } = renderWithRouter(
    <AddEntry authenticated={() => false} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("submitEntry is called on add entry button click", async () => {
  const submitEntry = jest.fn();
  renderWithRouter(
    <AddEntry
      user={{ id: 1 }}
      submitEntry={submitEntry}
      authenticated={() => true}
    />
  );

  const addButton = await screen.getByRole("button", {
    name: "Add this entry",
  });
  fireEvent.click(addButton);

  expect(submitEntry).toHaveBeenCalled();
});

test("input values update on change", async () => {
  renderWithRouter(<AddEntry authenticated={() => true} />);

  const nameInput = await screen.getByRole("textbox", { name: "Name" });
  const linkInput = await screen.getByRole("textbox", { name: "Link" });
  const descriptionInput = await screen.getByRole("textbox", {
    name: "Description",
  });
  fireEvent.change(nameInput, { target: { value: "test name" } });
  fireEvent.change(linkInput, { target: { value: "test link" } });
  fireEvent.change(descriptionInput, { target: { value: "test description" } });

  expect(nameInput.value).toBe("test name");
  expect(linkInput.value).toBe("test link");
  expect(descriptionInput.value).toBe("test description");
});

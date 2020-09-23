import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import Register from "./Register";

import { useUserContext } from "../context";
import { registerUser } from "../coordinators";

jest.mock("../context", () => {
  return {
    useUserContext: jest.fn(() => {
      return {};
    }),
  };
});

jest.mock("../coordinators", () => {
  return {
    registerUser: jest.fn(),
  };
});

test("register button click works", async () => {
  renderWithRouter(<Register />);
  const registerButton = await screen.getByRole("button", { name: "Register" });

  expect(registerButton).toBeInTheDocument();

  fireEvent.click(registerButton);

  expect(useUserContext).toHaveBeenCalled();
  expect(registerUser).toHaveBeenCalled();
});

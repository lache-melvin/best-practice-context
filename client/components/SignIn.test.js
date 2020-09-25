import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";

import { SignIn } from "./SignIn";

test("renders register form correctly", () => {
  const { asFragment } = render(<SignIn />);
  expect(asFragment()).toMatchSnapshot();
});

test("form field values update correctly on input", async () => {
  render(<SignIn />);

  const usernameInput = await screen.getByRole("textbox", {
    name: "Username",
  });
  const passwordInput = await screen.getByLabelText("Password");
  fireEvent.change(usernameInput, { target: { value: "test username" } });
  fireEvent.change(passwordInput, { target: { value: "test password" } });

  expect(usernameInput.value).toBe("test username");
  expect(passwordInput.value).toBe("test password");
});

test("calls signInUser on sign in button click", async () => {
  const signInUser = jest.fn();
  render(<SignIn signInUser={signInUser} />);

  const signInButton = await screen.getByRole("button", { name: "Sign in" });
  fireEvent.click(signInButton);

  expect(signInUser).toHaveBeenCalled();
});

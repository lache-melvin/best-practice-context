import React from "react";
import "@testing-library/jest-dom";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithRouter } from "../testing/utils";

import { Nav } from "./Nav";

test("renders correctly if authenticated", () => {
  const { asFragment } = renderWithRouter(
    <Nav authenticated={() => true} setUserIfLoggedIn={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("renders correctly if not authenticated", () => {
  const { asFragment } = renderWithRouter(
    <Nav authenticated={() => false} setUserIfLoggedIn={() => {}} />
  );
  expect(asFragment()).toMatchSnapshot();
});

test("calls setUserIfLoggedIn on mount", () => {
  const setUserIfLoggedIn = jest.fn();
  renderWithRouter(
    <Nav authenticated={() => {}} setUserIfLoggedIn={setUserIfLoggedIn} />
  );
  expect(setUserIfLoggedIn).toHaveBeenCalled();
});

test("calls logOut on log off link click", async () => {
  const logOut = jest.fn();
  renderWithRouter(
    <Nav
      authenticated={() => true}
      setUserIfLoggedIn={() => {}}
      logOut={logOut}
    />
  );
  const logOffLink = await screen.getByRole("link", { name: "Log off" });
  fireEvent.click(logOffLink);

  expect(logOut).toHaveBeenCalled();
});

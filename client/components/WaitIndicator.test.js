import React from "react";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import { WaitIndicator } from "./WaitIndicator";

test("renders loading indicator gif if pending is true", () => {
  const { asFragment } = render(<WaitIndicator pending={true} />);
  expect(asFragment()).toMatchSnapshot();
});

test("renders null if pending is false", () => {
  const { asFragment } = render(<WaitIndicator pending={false} />);
  expect(asFragment()).toMatchSnapshot();
});

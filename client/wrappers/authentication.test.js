import React from "react";
import { render } from "@testing-library/react";

import makeAuthenticationWrapper from "./authentication";

test("puts own props on child props", () => {
  expect.assertions(1);
  const TestComponent = ({ testProp }) => {
    expect(testProp).toBe("test prop");
    return <></>;
  };
  const WrappedWithAuth = makeAuthenticationWrapper()(TestComponent);
  render(<WrappedWithAuth testProp="test prop" />);
});

test("puts authenticated function on props correctly", () => {
  expect.assertions(1);
  const isAuthenticated = jest.fn();
  const TestComponent = ({ authenticated }) => {
    authenticated();
    expect(isAuthenticated).toHaveBeenCalled();
    return <></>;
  };
  const WrappedWithAuth = makeAuthenticationWrapper(isAuthenticated)(
    TestComponent
  );
  render(<WrappedWithAuth />);
});

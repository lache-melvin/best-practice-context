import React from "react";
import { render } from "@testing-library/react";

import pendingContextWrapper from "./pendingContext";
import { PendingContext } from "../context";

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ testProp }) => {
      expect(testProp).toBe("test prop");
      return <></>;
    };
    const WrappedWithPending = pendingContextWrapper(TestComponent);
    render(
      <PendingContext.Provider value={[false, () => false]}>
        <WrappedWithPending testProp="test prop" />
      </PendingContext.Provider>
    );
  });

  it("puts pending context value on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ pending }) => {
      expect(pending).toBe(true);
      return <></>;
    };
    const WrappedWithPending = pendingContextWrapper(TestComponent);
    render(
      <PendingContext.Provider value={[true, () => false]}>
        <WrappedWithPending />
      </PendingContext.Provider>
    );
  });
});

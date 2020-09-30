import React from "react";
import { render } from "@testing-library/react";

import makeEntriesContextWrapper from "./entriesContext";
import { EntriesContext, PendingContext } from "../context";

import mockEntries from "../testing/mockEntries";

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ testProp }) => {
      expect(testProp).toBe("test prop");
      return <></>;
    };
    const WrappedWithEntries = makeEntriesContextWrapper()(TestComponent);
    render(
      <PendingContext.Provider value={[false, () => false]}>
        <EntriesContext.Provider value={[[], () => []]}>
          <WrappedWithEntries testProp="test prop" />
        </EntriesContext.Provider>
      </PendingContext.Provider>
    );
  });

  it("puts entries context value on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ entries }) => {
      expect(entries).toHaveLength(3);
      return <></>;
    };
    const WrappedWithEntries = makeEntriesContextWrapper()(TestComponent);
    render(
      <PendingContext.Provider value={[false, () => false]}>
        <EntriesContext.Provider value={[mockEntries, () => []]}>
          <WrappedWithEntries />
        </EntriesContext.Provider>
      </PendingContext.Provider>
    );
  });
});

describe("retrieveEntries", () => {
  it("calls setEntries on retrieveEntries success", () => {
    expect.assertions(3);
    const getEntries = jest.fn(() => Promise.resolve(mockEntries));
    const setPending = jest.fn();
    const setEntries = jest.fn();
    const TestComponent = ({ retrieveEntries }) => {
      retrieveEntries().then(expectations).catch(null);
      return <></>;
    };
    const WrappedWithEntries = makeEntriesContextWrapper(getEntries)(
      TestComponent
    );
    render(
      <PendingContext.Provider value={[false, setPending]}>
        <EntriesContext.Provider value={[[], setEntries]}>
          <WrappedWithEntries />
        </EntriesContext.Provider>
      </PendingContext.Provider>
    );
    function expectations() {
      expect(setPending).toHaveBeenCalledTimes(2);
      expect(getEntries).toHaveBeenCalled();
      expect(setEntries).toHaveBeenCalledWith(mockEntries);
    }
  });

  it("logs error on retrieveEntries rejection", () => {
    expect.assertions(3);
    const setPending = jest.fn();
    const getEntries = jest.fn(() =>
      Promise.reject("mock getEntries rejection")
    );
    const logger = { error: jest.fn() };

    const TestComponent = ({ retrieveEntries }) => {
      retrieveEntries().then(expectations).catch(null);
      return <></>;
    };
    const EntriesContextWrappedComponent = makeEntriesContextWrapper(
      getEntries,
      logger
    )(TestComponent);
    render(
      <PendingContext.Provider value={[false, setPending]}>
        <EntriesContext.Provider value={[[], () => []]}>
          <EntriesContextWrappedComponent />
        </EntriesContext.Provider>
      </PendingContext.Provider>
    );

    function expectations() {
      expect(setPending).toHaveBeenCalledTimes(2);
      expect(getEntries).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith("mock getEntries rejection");
    }
  });
});

import React from "react";
import { render } from "@testing-library/react";

import makeEntriesContextWrapper from "./entriesContext";
import { EntriesContext } from "../context";

import mockEntries from "../testing/mockEntries";

test("puts own props on child props", () => {
  expect.assertions(1);
  const testComponent = ({ testProp }) => {
    expect(testProp).toBe("test prop");
    return <></>;
  };
  const EntriesContextWrappedComponent = makeEntriesContextWrapper()(
    testComponent
  );
  render(
    <EntriesContext.Provider value={[[], () => []]}>
      <EntriesContextWrappedComponent testProp="test prop" />
    </EntriesContext.Provider>
  );
});

test("puts entries context value on child props", () => {
  expect.assertions(1);
  const testComponent = ({ entries }) => {
    expect(entries).toHaveLength(3);
    return <></>;
  };
  const EntriesContextWrappedComponent = makeEntriesContextWrapper()(
    testComponent
  );
  render(
    <EntriesContext.Provider value={[mockEntries, () => []]}>
      <EntriesContextWrappedComponent />
    </EntriesContext.Provider>
  );
});

test("calls setEntries on retrieveEntries success", () => {
  expect.assertions(2);
  const getEntries = jest.fn(() => Promise.resolve(mockEntries));
  const mockSetEntriesContext = jest.fn();
  const testComponent = ({ retrieveEntries }) => {
    retrieveEntries().then(expectations).catch(null);
    return <></>;
  };
  const EntriesContextWrappedComponent = makeEntriesContextWrapper(getEntries)(
    testComponent
  );
  render(
    <EntriesContext.Provider value={[[], mockSetEntriesContext]}>
      <EntriesContextWrappedComponent />
    </EntriesContext.Provider>
  );
  function expectations() {
    expect(getEntries).toHaveBeenCalled();
    expect(mockSetEntriesContext).toHaveBeenCalledWith(mockEntries);
  }
});

test("logs error on retrieveEntries rejection", () => {
  expect.assertions(2);
  const getEntries = jest.fn(() => Promise.reject("mock getEntries rejection"));
  const logger = { error: jest.fn() };

  const testComponent = ({ retrieveEntries }) => {
    retrieveEntries().then(expectations).catch(null);
    return <></>;
  };
  const EntriesContextWrappedComponent = makeEntriesContextWrapper(
    getEntries,
    logger
  )(testComponent);
  render(
    <EntriesContext.Provider value={[[], () => []]}>
      <EntriesContextWrappedComponent />
    </EntriesContext.Provider>
  );

  function expectations() {
    expect(getEntries).toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith("mock getEntries rejection");
  }
});

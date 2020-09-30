import React from "react";
import { render } from "@testing-library/react";

import makeEntryContextWrapper from "./entryContext";
import { EntryContext } from "../context";

const mockEntry = {
  id: 1,
  name: "mocked entry 1",
  link: "https://mocked.link.com/1",
  description: "mocked description 1",
  created: 1601195097784,
  updated: 1601195097784,
};

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ testProp }) => {
      expect(testProp).toBe("test prop");
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper()(TestComponent);
    render(
      <EntryContext.Provider value={[{}, () => {}]}>
        <WrappedWithEntry testProp="test prop" />
      </EntryContext.Provider>
    );
  });

  it("puts entry context value on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ entry }) => {
      expect(entry.name).toBe("mocked entry 1");
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper()(TestComponent);
    render(
      <EntryContext.Provider value={[mockEntry, () => {}]}>
        <WrappedWithEntry />
      </EntryContext.Provider>
    );
  });
});

describe("getEntryById", () => {
  it("calls setEntry on retrieveEntryById success", () => {
    expect.assertions(2);
    const getEntryById = jest.fn(() => Promise.resolve(mockEntry));
    const setEntry = jest.fn();
    const TestComponent = ({ retrieveEntryById }) => {
      retrieveEntryById(1).then(assert).catch(null);
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper(getEntryById)(
      TestComponent
    );
    render(
      <EntryContext.Provider value={[{}, setEntry]}>
        <WrappedWithEntry />
      </EntryContext.Provider>
    );
    function assert() {
      expect(getEntryById).toHaveBeenCalledWith(1);
      expect(setEntry).toHaveBeenCalledWith(mockEntry);
    }
  });

  it("logs error on retrieveEntryById rejection", () => {
    expect.assertions(2);
    const getEntryById = jest.fn(() =>
      Promise.reject("mock getEntryById rejection")
    );
    const logger = { error: jest.fn() };
    const TestComponent = ({ retrieveEntryById }) => {
      retrieveEntryById(99).then(assert).catch(null);
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper(
      getEntryById,
      null,
      logger
    )(TestComponent);
    render(
      <EntryContext.Provider value={[{}, () => {}]}>
        <WrappedWithEntry />
      </EntryContext.Provider>
    );
    function assert() {
      expect(getEntryById).toHaveBeenCalledWith(99);
      expect(logger.error).toHaveBeenCalledWith("mock getEntryById rejection");
    }
  });
});

describe("submitEntry", () => {
  it("calls setEntry and redirects on addEntry success", () => {
    expect.assertions(3);
    const formData = {
      name: "mocked entry 1",
      link: "https://mocked.link.com/1",
      description: "mocked description 1",
    };
    const addEntry = jest.fn(() => Promise.resolve(mockEntry));
    const setEntry = jest.fn();
    let history = [];
    const TestComponent = ({ submitEntry }) => {
      submitEntry(1, formData).then(assert).catch(null);
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper(
      null,
      addEntry
    )(TestComponent);
    render(
      <EntryContext.Provider value={[{}, setEntry]}>
        <WrappedWithEntry history={history} />
      </EntryContext.Provider>
    );
    function assert() {
      expect(addEntry).toHaveBeenCalled();
      expect(setEntry).toHaveBeenCalledWith(mockEntry);
      expect(history[0]).toBe("/entry/1");
    }
  });

  it("logs error on addEntry rejection", () => {
    expect.assertions(3);
    const formData = {
      name: "mocked entry 999",
      link: "https://mocked.link.com/999",
      description: "mocked description 999",
    };
    const addEntry = jest.fn(() => Promise.reject("mock addEntry rejection"));
    const logger = { error: jest.fn() };
    let history = [];
    const TestComponent = ({ submitEntry }) => {
      submitEntry(99, formData).then(assert).catch(null);
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper(
      null,
      addEntry,
      logger
    )(TestComponent);
    render(
      <EntryContext.Provider value={[{}, () => {}]}>
        <WrappedWithEntry history={history} />
      </EntryContext.Provider>
    );
    function assert() {
      expect(addEntry).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith("mock addEntry rejection");
      expect(history).toHaveLength(0);
    }
  });
});

describe("selectEntry", () => {
  it("calls setEntry on selectEntry", () => {
    expect.assertions(1);
    const setEntry = jest.fn();
    const TestComponent = ({ selectEntry }) => {
      selectEntry(mockEntry);
      expect(setEntry).toHaveBeenCalledWith(mockEntry);
      return <></>;
    };
    const WrappedWithEntry = makeEntryContextWrapper()(TestComponent);
    render(
      <EntryContext.Provider value={[{}, setEntry]}>
        <WrappedWithEntry />
      </EntryContext.Provider>
    );
  });
});

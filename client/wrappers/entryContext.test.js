import React from "react";
import enzyme, { mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
enzyme.configure({
  adapter: new Adapter(),
});

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

const TestComponent = () => <></>;

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, () => {}]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper()(
      TestComponent
    );
    const component = mount(
      <EntryContextWrappedComponent testProp="test prop" />,
      {
        wrappingComponent: contextProvider,
      }
    ).children();
    expect(component.props().testProp).toBe("test prop");
  });

  it("puts entry context value on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[mockEntry, () => {}]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper()(
      TestComponent
    );
    const component = mount(<EntryContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    expect(component.props().entry.name).toBe("mocked entry 1");
  });
});

describe("getEntryById", () => {
  it("calls setEntry on retrieveEntryById success", () => {
    const getEntryById = jest.fn(() => Promise.resolve(mockEntry));
    const mockSetEntryContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, mockSetEntryContext]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper(getEntryById)(
      TestComponent
    );
    const component = mount(<EntryContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .retrieveEntryById(1)
      .then(() => {
        expect(getEntryById).toHaveBeenCalledWith(1);
        expect(mockSetEntryContext).toHaveBeenCalledWith(mockEntry);
        return null;
      });
  });

  it("logs error on retrieveEntryById rejection", () => {
    const getEntryById = jest.fn(() =>
      Promise.reject("mock getEntryById rejection")
    );
    const logger = { error: jest.fn() };
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, () => {}]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper(
      getEntryById,
      null,
      logger
    )(TestComponent);
    const component = mount(<EntryContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .retrieveEntryById(99)
      .then(() => {
        expect(getEntryById).toHaveBeenCalledWith(99);
        expect(logger.error).toHaveBeenCalledWith(
          "mock getEntryById rejection"
        );
        return null;
      });
  });
});

describe("addEntry", () => {
  it("calls setEntry and redirects on addEntry success", () => {
    const formData = {
      name: "mocked entry 1",
      link: "https://mocked.link.com/1",
      description: "mocked description 1",
    };
    const addEntry = jest.fn(() => Promise.resolve(mockEntry));
    const mockSetEntryContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, mockSetEntryContext]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper(
      null,
      addEntry
    )(TestComponent);
    const component = mount(<EntryContextWrappedComponent history={[]} />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .submitEntry(1, formData)
      .then(() => {
        expect(addEntry).toHaveBeenCalled();
        expect(mockSetEntryContext).toHaveBeenCalledWith(mockEntry);
        expect(component.props().history[0]).toBe("/entry/1");
        return null;
      });
  });

  it("logs error on addEntry rejection", () => {
    const formData = {
      name: "mocked entry 99",
      link: "https://mocked.link.com/99",
      description: "mocked description 99",
    };
    const addEntry = jest.fn(() => Promise.reject("mock addEntry rejection"));
    const logger = { error: jest.fn() };
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, () => {}]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper(
      null,
      addEntry,
      logger
    )(TestComponent);
    const component = mount(<EntryContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .submitEntry(99, formData)
      .then(() => {
        expect(addEntry).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith("mock addEntry rejection");
        return null;
      });
  });
});

describe("selectEntry", () => {
  it("calls setEntry on selectEntry", () => {
    const mockSetEntryContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <EntryContext.Provider value={[{}, mockSetEntryContext]}>
          {children}
        </EntryContext.Provider>
      );
    };
    const EntryContextWrappedComponent = makeEntryContextWrapper()(
      TestComponent
    );
    const component = mount(<EntryContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    component.props().selectEntry(mockEntry);
    expect(mockSetEntryContext).toHaveBeenCalledWith(mockEntry);
  });
});

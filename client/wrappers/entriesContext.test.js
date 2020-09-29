import React from "react";
import enzyme, { mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
enzyme.configure({
  adapter: new Adapter(),
});

import makeEntriesContextWrapper from "./entriesContext";
import { EntriesContext } from "../context";

import mockEntries from "../testing/mockEntries";
const TestComponent = () => <></>;

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <EntriesContext.Provider value={[[], () => []]}>
          {children}
        </EntriesContext.Provider>
      );
    };
    const EntriesContextWrappedComponent = makeEntriesContextWrapper()(
      TestComponent
    );
    const component = mount(
      <EntriesContextWrappedComponent testProp="test prop" />,
      {
        wrappingComponent: contextProvider,
      }
    ).children();
    expect(component.props().testProp).toBe("test prop");
  });

  it("puts entries context value on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <EntriesContext.Provider value={[mockEntries, () => []]}>
          {children}
        </EntriesContext.Provider>
      );
    };
    const EntriesContextWrappedComponent = makeEntriesContextWrapper()(
      TestComponent
    );
    const component = mount(<EntriesContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    expect(component.props().entries).toHaveLength(3);
  });
});

describe("retrieveEntries", () => {
  it("calls setEntries on retrieveEntries success", () => {
    const getEntries = jest.fn(() => Promise.resolve(mockEntries));
    const mockSetEntriesContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <EntriesContext.Provider value={[[], mockSetEntriesContext]}>
          {children}
        </EntriesContext.Provider>
      );
    };
    const EntriesContextWrappedComponent = makeEntriesContextWrapper(
      getEntries
    )(TestComponent);
    const component = mount(<EntriesContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .retrieveEntries()
      .then(() => {
        expect(getEntries).toHaveBeenCalled();
        expect(mockSetEntriesContext).toHaveBeenCalledWith(mockEntries);
        return null;
      });
  });

  it("logs error on retrieveEntries rejection", () => {
    const getEntries = jest.fn(() =>
      Promise.reject("mock getEntries rejection")
    );
    const logger = { error: jest.fn() };
    const contextProvider = ({ children }) => {
      return (
        <EntriesContext.Provider value={[[], () => []]}>
          {children}
        </EntriesContext.Provider>
      );
    };
    const EntriesContextWrappedComponent = makeEntriesContextWrapper(
      getEntries,
      logger
    )(TestComponent);
    const component = mount(<EntriesContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .retrieveEntries()
      .then(() => {
        expect(getEntries).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith("mock getEntries rejection");
        return null;
      });
  });
});

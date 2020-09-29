import React from "react";
import enzyme, { mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
enzyme.configure({
  adapter: new Adapter(),
});

import makeUserContextWrapper from "./userContext";
import { UserContext } from "../context";

const mockUser = {
  id: 1,
  username: "mockedUser1",
};

const mockToken = {
  dataValues: {
    id: 1,
    username: "mockedUser1",
  },
};

const TestComponent = () => <></>;

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <UserContext.Provider value={[{}, () => {}]}>
          {children}
        </UserContext.Provider>
      );
    };
    const UserContextWrappedComponent = makeUserContextWrapper()(TestComponent);
    const component = mount(
      <UserContextWrappedComponent testProp="test prop" />,
      {
        wrappingComponent: contextProvider,
      }
    ).children();
    expect(component.props().testProp).toBe("test prop");
  });

  it("puts user context value on child props", () => {
    const contextProvider = ({ children }) => {
      return (
        <UserContext.Provider value={[mockUser, () => {}]}>
          {children}
        </UserContext.Provider>
      );
    };
    const UserContextWrappedComponent = makeUserContextWrapper()(TestComponent);
    const component = mount(<UserContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    expect(component.props().user.username).toBe("mockedUser1");
  });
});

describe("registerUser", () => {
  it("calls setUser and redirects on configuredRegister success when authenticated", () => {
    const configuredRegister = jest.fn(() => Promise.resolve(mockToken));
    const isAuthenticated = jest.fn(() => true);
    const mockSetUserContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <UserContext.Provider value={[{}, mockSetUserContext]}>
          {children}
        </UserContext.Provider>
      );
    };
    const UserContextWrappedComponent = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      isAuthenticated
    )(TestComponent);
    const component = mount(<UserContextWrappedComponent history={[]} />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .registerUser({ username: "mockedUser1", password: "dontlook" })
      .then(() => {
        expect(configuredRegister).toHaveBeenCalled();
        expect(isAuthenticated).toHaveBeenCalled();
        expect(mockSetUserContext).toHaveBeenCalledWith(mockUser);
        expect(component.props().history[0]).toBe("/");
        return null;
      });
  });

  it("does nothing on configuredRegister success when not authenticated", () => {
    const configuredRegister = jest.fn(() => Promise.resolve(mockToken));
    const isAuthenticated = jest.fn(() => false);
    const mockSetUserContext = jest.fn();
    const contextProvider = ({ children }) => {
      return (
        <UserContext.Provider value={[{}, mockSetUserContext]}>
          {children}
        </UserContext.Provider>
      );
    };
    const UserContextWrappedComponent = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      isAuthenticated
    )(TestComponent);
    const component = mount(<UserContextWrappedComponent history={[]} />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .registerUser({ username: "mockedUser99", password: "dontlook" })
      .then(() => {
        expect(configuredRegister).toHaveBeenCalled();
        expect(isAuthenticated).toHaveBeenCalled();
        expect(component.props().history).toHaveLength(0);
        expect(mockSetUserContext).not.toHaveBeenCalled();
        return null;
      });
  });

  it("logs error on configuredRegister rejection", () => {
    const configuredRegister = jest.fn(() =>
      Promise.reject("mock configuredRegister rejection")
    );
    const logger = { error: jest.fn() };
    const contextProvider = ({ children }) => {
      return (
        <UserContext.Provider value={[{}, () => {}]}>
          {children}
        </UserContext.Provider>
      );
    };
    const UserContextWrappedComponent = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      null,
      null,
      logger
    )(TestComponent);
    const component = mount(<UserContextWrappedComponent />, {
      wrappingComponent: contextProvider,
    }).children();
    return component
      .props()
      .registerUser({ username: "baduser", password: "thiswillfail" })
      .then(() => {
        expect(configuredRegister).toHaveBeenCalled();
        expect(logger.error).toHaveBeenCalledWith(
          "mock configuredRegister rejection"
        );
        return null;
      });
  });
});

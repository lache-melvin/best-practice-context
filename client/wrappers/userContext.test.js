import React from "react";
import { render } from "@testing-library/react";

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

describe("Wrapper sets up props", () => {
  it("puts own props on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ testProp }) => {
      expect(testProp).toBe("test prop");
      return <></>;
    };
    const WrappedWithUser = makeUserContextWrapper()(TestComponent);
    render(
      <UserContext.Provider value={[{}, () => {}]}>
        <WrappedWithUser testProp="test prop" />
      </UserContext.Provider>
    );
  });

  it("puts user context value on child props", () => {
    expect.assertions(1);
    const TestComponent = ({ user }) => {
      expect(user.username).toBe("mockedUser1");
      return <></>;
    };
    const WrappedWithUser = makeUserContextWrapper()(TestComponent);
    render(
      <UserContext.Provider value={[mockUser, () => {}]}>
        <WrappedWithUser />
      </UserContext.Provider>
    );
  });
});

describe("registerUser", () => {
  it("calls setUser and redirects on configuredRegister success when authenticated", () => {
    expect.assertions(4);
    const configuredRegister = jest.fn(() => Promise.resolve(mockToken));
    const isAuthenticated = jest.fn(() => true);
    const setUser = jest.fn();
    let history = [];
    const TestComponent = ({ registerUser }) => {
      registerUser({ username: "mockedUser1", password: "dontlook" })
        .then(assert)
        .catch(null);
      return <></>;
    };
    const WrappedWithUser = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      isAuthenticated
    )(TestComponent);
    render(
      <UserContext.Provider value={[{}, setUser]}>
        <WrappedWithUser history={history} />
      </UserContext.Provider>
    );
    function assert() {
      expect(configuredRegister).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(setUser).toHaveBeenCalledWith(mockUser);
      expect(history[0]).toBe("/");
    }
  });

  it("does nothing on configuredRegister success when not authenticated", () => {
    expect.assertions(4);
    const configuredRegister = jest.fn(() => Promise.resolve(mockToken));
    const isAuthenticated = jest.fn(() => false);
    const setUser = jest.fn();
    let history = [];
    const TestComponent = ({ registerUser }) => {
      registerUser({ username: "mockedUser99", password: "dontlook" })
        .then(assert)
        .catch(null);
      return <></>;
    };
    const WrappedWithUser = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      isAuthenticated
    )(TestComponent);
    render(
      <UserContext.Provider value={[{}, setUser]}>
        <WrappedWithUser history={history} />
      </UserContext.Provider>
    );
    function assert() {
      expect(configuredRegister).toHaveBeenCalled();
      expect(isAuthenticated).toHaveBeenCalled();
      expect(setUser).not.toHaveBeenCalled();
      expect(history).toHaveLength(0);
    }
  });

  it("logs error on configuredRegister rejection", () => {
    expect.assertions(2);
    const configuredRegister = jest.fn(() =>
      Promise.reject("mock configuredRegister rejection")
    );
    const logger = { error: jest.fn() };
    const TestComponent = ({ registerUser }) => {
      registerUser({ username: "baduser", password: "thiswillfail" })
        .then(assert)
        .catch(null);
      return <></>;
    };
    const WrappedWithUser = makeUserContextWrapper(
      configuredRegister,
      null,
      null,
      null,
      null,
      logger
    )(TestComponent);
    render(
      <UserContext.Provider value={[{}, () => {}]}>
        <WrappedWithUser />
      </UserContext.Provider>
    );
    function assert() {
      expect(configuredRegister).toHaveBeenCalled();
      expect(logger.error).toHaveBeenCalledWith(
        "mock configuredRegister rejection"
      );
    }
  });
});

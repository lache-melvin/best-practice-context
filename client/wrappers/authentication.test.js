import React from "react";
import enzyme, { mount } from "enzyme";

import Adapter from "enzyme-adapter-react-16";
enzyme.configure({
  adapter: new Adapter(),
});

import makeAuthenticationWrapper from "./authentication";

const TestComponent = () => <></>;

test("puts own props on child props", () => {
  const AuthWrappedComponent = makeAuthenticationWrapper()(TestComponent);
  const component = mount(
    <AuthWrappedComponent testProp="test prop" />
  ).children();
  expect(component.props().testProp).toBe("test prop");
});

test("puts authenticated function on props correctly", () => {
  const isAuthenticated = jest.fn();
  const AuthWrappedComponent = makeAuthenticationWrapper(isAuthenticated)(
    TestComponent
  );
  const component = mount(<AuthWrappedComponent />).children();
  component.props().authenticated();
  expect(isAuthenticated).toHaveBeenCalled();
});

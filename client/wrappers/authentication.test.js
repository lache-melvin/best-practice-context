import React from "react";

import makeAuthenticationWrapper from "./authentication";

test("authentication wrapper puts correct values on props", () => {
  const isAuthenticated = jest.fn();
  const testComponent = () => <></>;
  const testProps = { prop1: "test prop 1", prop2: "test prop 2" };

  const AuthWrappedComponent = makeAuthenticationWrapper(isAuthenticated)(
    testComponent
  )(testProps);
  const componentProps = AuthWrappedComponent.props;
  componentProps.authenticated();

  expect(componentProps.prop1).toBe("test prop 1");
  expect(componentProps.prop2).toBe("test prop 2");
  expect(isAuthenticated).toHaveBeenCalled();
});

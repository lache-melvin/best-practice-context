import { isAuthenticated } from "authenticare/client";

import makeAuthenticationWrapper from "./authentication";

export const withAuthentication = makeAuthenticationWrapper(isAuthenticated);

export function With(wrappers, Component) {
  if (!wrappers.length) return Component;
  const rest = (wraps) => {
    wraps.shift();
    return wraps;
  };
  return wrappers[0](With(rest(wrappers), Component));
}

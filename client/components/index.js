import { isAuthenticated } from "authenticare/client";

import makeAuthenticationWrapper from "./authenticationWrapper";

export const withAuthentication = makeAuthenticationWrapper(isAuthenticated);

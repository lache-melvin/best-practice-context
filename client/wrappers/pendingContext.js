import React, { useContext } from "react";

import { PendingContext } from "../context";

function withPendingContext(Component) {
  return function PendingContextWrapper(props) {
    const [pending] = useContext(PendingContext);
    return <Component pending={pending} {...props} />;
  };
}

export default withPendingContext;

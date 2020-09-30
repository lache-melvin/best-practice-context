import React from "react";

import { wrappedWith, pending } from "../wrappers"

const style = {
  width: "40px",
  height: "40px",
};

export function WaitIndicator({ pending }) {
  return pending ? <img style={style} src="/animated-circle.gif" /> : null;
}

// export default wrappedWith(pending)(WaitIndicator)

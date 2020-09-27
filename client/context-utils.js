import React, { useState, createContext } from "react";

export function newContext(displayName, initialState, defaultValue) {
  // optional defaultValue for testing
  const Context = createContext(defaultValue);
  Context.initialState = initialState || null;
  Context.displayName = displayName ? `${displayName}Context` : "Context";
  return Context;
}

export function createCombinedProvider(...contexts) {
  const remaining = ([, ...rest]) => rest;
  return function ContextProvider({ children }) {
    function provide(Contexts, content) {
      if (!Contexts.length) return content;
      const Context = Contexts[0];
      const [state, setState] = useState(Context.initialState);
      return (
        <Context.Provider value={[state, setState]}>
          {provide(remaining(Contexts), content)}
        </Context.Provider>
      );
    }
    return provide(contexts, children);
  };
}

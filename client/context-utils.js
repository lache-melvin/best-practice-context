import React, { useState, createContext } from "react";

export function contextCreate(defaultValue, name) {
  const Context = createContext([defaultValue, () => defaultValue]);
  const Provider = ({ children }) => {
    const [value, setValue] = useState(defaultValue);
    return (
      <Context.Provider value={[value, setValue]}>{children}</Context.Provider>
    );
  };
  Provider.displayName = name ? `${name}Provider` : "ContextProvider";
  return [Context, Provider];
}

export function combineProviders(...providers) {
  const remaining = ([, ...rest]) => rest;
  const provide = (providers, UI) => {
    if (!providers.length) return UI;
    const Provider = providers[0];
    return <Provider>{provide(remaining(providers), UI)}</Provider>;
  };
  return function CombinedContextProvider({ children }) {
    return provide(providers, children);
  };
}

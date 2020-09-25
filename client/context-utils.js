import React, { useState, createContext, useContext } from "react";

export function contextCreate(defaultValue) {
  const Context = createContext([defaultValue, () => defaultValue]);
  const provider = ({ children }) => {
    const [value, setValue] = useState(defaultValue);
    return (
      <Context.Provider value={[value, setValue]}>{children}</Context.Provider>
    );
  };
  const hook = () => {
    const [value, setValue] = useContext(Context);
    const applyValue = (value) => {
      setValue(value !== undefined ? value : defaultValue);
    };
    return [value, applyValue];
  };
  return [provider, hook];
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

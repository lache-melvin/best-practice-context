import React, { useState, createContext } from "react";

export const EntryContext = createContext([{}, () => {}]);

export const EntryContextProvider = ({ children }) => {
  const [entry, setEntry] = useState({});

  return (
    <EntryContext.Provider value={[entry, setEntry]}>
      {children}
    </EntryContext.Provider>
  );
};

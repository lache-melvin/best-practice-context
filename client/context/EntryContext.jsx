import React, { useState, createContext } from "react";

export const EntryContext = createContext([{}, () => {}]);

export const EntryContextProvider = ({ children }) => {
  const [entryState, setEntryState] = useState({});

  return (
    <EntryContext.Provider value={[entryState, setEntryState]}>
      {children}
    </EntryContext.Provider>
  );
};

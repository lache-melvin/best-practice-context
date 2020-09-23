import React, { useState, createContext } from "react";

export const EntriesContext = createContext([{}, () => {}]);

export const EntriesContextProvider = ({ children }) => {
  const [entriesState, setEntriesState] = useState([]);

  return (
    <EntriesContext.Provider value={[entriesState, setEntriesState]}>
      {children}
    </EntriesContext.Provider>
  );
};

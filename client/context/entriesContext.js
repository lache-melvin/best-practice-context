import React, { useState, createContext } from "react";

export const EntriesContext = createContext([{}, () => {}]);

export const EntriesContextProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);

  return (
    <EntriesContext.Provider value={[entries, setEntries]}>
      {children}
    </EntriesContext.Provider>
  );
};

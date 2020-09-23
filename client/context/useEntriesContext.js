import { useContext } from "react";

import { EntriesContext } from "./entriesContext";

const useEntriesContext = () => {
  const [entries, setEntries] = useContext(EntriesContext);

  const applyEntries = (entries) => {
    setEntries(entries || []);
  };

  return {
    applyEntries,
    entries,
  };
};

export default useEntriesContext;

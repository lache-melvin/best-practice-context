import { useContext } from "react";

import { EntriesContext } from "./EntriesContext";

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

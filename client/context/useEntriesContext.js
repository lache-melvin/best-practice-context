import { useContext } from "react";

import { EntriesContext } from "./EntriesContext";

const useEntriesContext = () => {
  const [entriesState, setEntriesState] = useContext(EntriesContext);

  const receiveEntries = (entries) => {
    setEntriesState(entries || []);
  };

  return {
    receiveEntries,
    entriesState,
  };
};

export default useEntriesContext;

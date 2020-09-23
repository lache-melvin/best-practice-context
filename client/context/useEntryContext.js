import { useContext } from "react";

import { EntryContext } from "./EntryContext";

const useEntryContext = () => {
  const [entryState, setEntryState] = useContext(EntryContext);

  const receiveEntry = (entry) => {
    setEntryState(entry || {});
  };

  return {
    receiveEntry,
    entryState,
  };
};

export default useEntryContext;

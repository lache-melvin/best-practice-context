import { useContext } from "react";

import { EntryContext } from "./EntryContext";

const useEntryContext = () => {
  const [entry, setEntry] = useContext(EntryContext);

  const applyEntry = (entry) => {
    setEntry(entry || {});
  };

  return {
    applyEntry,
    entry,
  };
};

export default useEntryContext;

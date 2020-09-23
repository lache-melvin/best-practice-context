import React from "react";

import { useEntriesContext } from "../context";
import { retrieveEntries } from "../coordinators";

function withEntriesContext(Component) {
  return function EntriesContextWrapper() {
    const { applyEntries, entries } = useEntriesContext();

    const retrieve = () => {
      retrieveEntries(applyEntries);
    };

    return <Component entries={entries} retrieveEntries={retrieve} />;
  };
}

export default withEntriesContext;

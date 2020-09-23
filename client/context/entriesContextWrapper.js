import React from "react";

import { useEntriesContext } from ".";
import { retrieveEntries } from "../coordinators";

function withEntriesContext(Component) {
  return function EntriesContextWrapper(props) {
    const { applyEntries, entries } = useEntriesContext();

    const retrieve = () => {
      retrieveEntries(applyEntries);
    };

    return (
      <Component entries={entries} retrieveEntries={retrieve} {...props} />
    );
  };
}

export default withEntriesContext;

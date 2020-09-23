import React from "react";

function makeEntriesContextWrapper(retrieveEntries, useEntriesContext) {
  return function withEntriesContext(Component) {
    return function EntriesContextWrapper(props) {
      const { applyEntries, entries } = useEntriesContext();

      const retrieve = () => {
        retrieveEntries(applyEntries);
      };

      return (
        <Component entries={entries} retrieveEntries={retrieve} {...props} />
      );
    };
  };
}

export default makeEntriesContextWrapper;

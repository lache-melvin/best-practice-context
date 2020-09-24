import React from "react";

import useEntriesContext from "./useEntriesContext";

function makeEntriesContextWrapper(getEntries) {
  return function withEntriesContext(Component) {
    return function EntriesContextWrapper(props) {
      const { applyEntries, entries } = useEntriesContext();

      const retrieveEntries = () => {
        getEntries()
          .then((entries) => {
            return applyEntries(entries);
          })
          .catch((err) => {
            console.error(err);
          });
      };

      return (
        <Component
          entries={entries}
          retrieveEntries={retrieveEntries}
          {...props}
        />
      );
    };
  };
}

export default makeEntriesContextWrapper;

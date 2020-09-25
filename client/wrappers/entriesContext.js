import React, { useContext } from "react";

import { EntriesContext } from "../context";

function makeEntriesContextWrapper(getEntries) {
  return function withEntriesContext(Component) {
    return function EntriesContextWrapper(props) {
      const [entries, setEntries] = useContext(EntriesContext);

      const retrieveEntries = () => {
        getEntries()
          .then((entries) => {
            return setEntries(entries);
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

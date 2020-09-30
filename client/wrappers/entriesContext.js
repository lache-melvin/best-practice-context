import React, { useContext } from "react";

import { EntriesContext, PendingContext } from "../context";

function makeEntriesContextWrapper(getEntries, logger = console) {
  return function withEntriesContext(Component) {
    return function EntriesContextWrapper(props) {
      const [entries, setEntries] = useContext(EntriesContext);
      const [, setPending] = useContext(PendingContext);

      const retrieveEntries = () => {
        setPending(true);
        return getEntries()
          .then((entries) => {
            setPending(false);
            return setEntries(entries);
          })
          .catch((err) => {
            setPending(false);
            logger.error(err);
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

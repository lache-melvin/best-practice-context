import React, { useContext } from "react";

import { EntryContext } from "../context";

function makeEntryContextWrapper(getEntryById, addEntry, logger = console) {
  return function withEntryContext(Component) {
    return function EntryContextWrapper(props) {
      const [entry, setEntry] = useContext(EntryContext);

      const retrieveEntryById = (id) => {
        return getEntryById(id)
          .then((entry) => {
            return setEntry(entry);
          })
          .catch((err) => {
            logger.error(err);
          });
      };

      const submitEntry = (authorId, formData) => {
        return addEntry({ ...formData, authorId })
          .then((saved) => {
            setEntry(saved);
            props.history.push(`/entry/${saved.id}`);
            return;
          })
          .catch((err) => {
            logger.error(err);
          });
      };

      const selectEntry = (entry) => {
        setEntry(entry);
      };

      return (
        <Component
          entry={entry}
          retrieveEntryById={retrieveEntryById}
          submitEntry={submitEntry}
          selectEntry={selectEntry}
          {...props}
        />
      );
    };
  };
}

export default makeEntryContextWrapper;

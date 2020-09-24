import React from "react";

import useEntryContext from "./useEntryContext";

function makeEntryContextWrapper(getEntryById, addEntry) {
  return function withEntryContext(Component) {
    return function EntryContextWrapper(props) {
      const { applyEntry, entry } = useEntryContext();

      const retrieveEntryById = (id) => {
        getEntryById(id)
          .then((entry) => {
            return applyEntry(entry);
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const submitEntry = (authorId, formData) => {
        addEntry({ ...formData, authorId })
          .then((saved) => {
            applyEntry(saved);
            props.history.push(`/entry/${saved.id}`);
            return;
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const selectEntry = (entry) => {
        applyEntry(entry);
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

import React, { useContext } from "react";

import { EntryContext } from "../context";

function makeEntryContextWrapper(getEntryById, addEntry) {
  return function withEntryContext(Component) {
    return function EntryContextWrapper(props) {
      const [entry, setEntry] = useContext(EntryContext);

      const retrieveEntryById = (id) => {
        getEntryById(id)
          .then((entry) => {
            return setEntry(entry);
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const submitEntry = (authorId, formData) => {
        addEntry({ ...formData, authorId })
          .then((saved) => {
            setEntry(saved);
            props.history.push(`/entry/${saved.id}`);
            return;
          })
          .catch((err) => {
            console.error(err);
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

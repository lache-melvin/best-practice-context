import React from "react";

function makeEntryContextWrapper(
  retrieveEntryById,
  submitEntry,
  useEntryContext
) {
  return function withEntryContext(Component) {
    return function EntryContextWrapper(props) {
      const { applyEntry, entry } = useEntryContext();

      const retrieve = (id) => {
        retrieveEntryById(id, applyEntry);
      };

      const submit = (authorId, formData) => {
        submitEntry(authorId, formData, props.history, applyEntry);
      };

      const select = (entry) => {
        applyEntry(entry);
      };

      return (
        <Component
          entry={entry}
          retrieveEntryById={retrieve}
          submitEntry={submit}
          selectEntry={select}
          {...props}
        />
      );
    };
  };
}

export default makeEntryContextWrapper;

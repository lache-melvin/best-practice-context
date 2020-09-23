import React, { useEffect } from "react";

import { useEntriesContext, useEntryContext } from "../context";

import { getEntryById } from "../api";

function EntryDetail(props) {
  const { entriesState } = useEntriesContext();
  const { receiveEntry, entryState } = useEntryContext();

  const getEntryFromContext = () => {
    const id = Number(props.match?.params.id);
    const fromState = entryState && entryState.id === id ? entryState : null;
    const fromList = entriesState.find((entry) => entry.id === id);
    return fromState || fromList;
  };

  const entry = getEntryFromContext() || {};

  useEffect(() => {
    const { match } = props;
    if (!entry.name && match && match.params) {
      const id = Number(match.params.id);
      getEntryById(id)
        .then((entry) => {
          return receiveEntry(entry);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  return (
    <div data-testid="entry">
      <h2>{entry.name}</h2>
      <a href={entry.link}>{entry.link}</a>
      <p>{entry.description}</p>
    </div>
  );
}

export default EntryDetail;

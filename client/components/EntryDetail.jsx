import React, { useEffect } from "react";

import { useEntriesContext, useEntryContext } from "../context";

import { retrieveEntryById } from "../coordinators";

function EntryDetail(props) {
  const { entries } = useEntriesContext();
  const { applyEntry, entry } = useEntryContext();

  const id = Number(props.match?.params?.id) || null;

  const entryFromState =
    entry && entry.id === id ? entry : entries.find((entry) => entry.id === id);

  useEffect(() => {
    if (!entryFromState && id) {
      retrieveEntryById(id, applyEntry);
    }
  }, []);

  const displayEntry = entryFromState || {};

  return (
    <div data-testid="entry">
      <h2>{displayEntry.name}</h2>
      <a href={displayEntry.link}>{displayEntry.link}</a>
      <p>{displayEntry.description}</p>
    </div>
  );
}

export default EntryDetail;

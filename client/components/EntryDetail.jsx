import React, { useEffect } from "react";

import { withEntriesContext, withEntryContext } from "../context";

export function EntryDetail({ entries, entry, retrieveEntryById, match }) {
  const id = Number(match?.params?.id) || null;

  const entryFromState =
    entry?.id === id ? entry : entries.find((entry) => entry.id === id);

  useEffect(() => {
    if (!entryFromState && id) {
      retrieveEntryById(id);
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

export default withEntriesContext(withEntryContext(EntryDetail));

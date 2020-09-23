import React, { useEffect } from "react";

import { useEntriesContext, useEntryContext } from "../context";

import { retrieveEntryById } from "../coordinators";

function EntryDetail(props) {
  const { entries } = useEntriesContext();
  const { applyEntry, entry } = useEntryContext();

  const getEntryFromContext = () => {
    const id = Number(props.match?.params.id);
    const fromState = entry && entry.id === id ? entry : null;
    const fromList = entries.find((entry) => entry.id === id);
    return fromState || fromList;
  };

  const displayEntry = getEntryFromContext() || {};

  useEffect(() => {
    const { match } = props;
    if (!displayEntry.name && match && match.params) {
      const id = Number(match.params.id);
      retrieveEntryById(id, applyEntry);
    }
  }, []);

  return (
    <div data-testid="entry">
      <h2>{displayEntry.name}</h2>
      <a href={displayEntry.link}>{displayEntry.link}</a>
      <p>{displayEntry.description}</p>
    </div>
  );
}

export default EntryDetail;

import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchEntryById } from "../actions/entries";

function EntryDetail(props) {
  useEffect(() => {
    const { entry, match, fetchEntryById } = props;
    if (!entry && match && match.params) {
      fetchEntryById(Number(match.params.id));
    }
  });

  const { entry = {} } = props;
  return (
    <div data-testid="entry">
      <h2>{entry.name}</h2>
      <a href={entry.link}>{entry.link}</a>
      <p>{entry.description}</p>
    </div>
  );
}

export default EntryDetail;

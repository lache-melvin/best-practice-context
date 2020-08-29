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

function mapStateToProps(state, ownProps) {
  const id = Number(ownProps.match.params.id);
  const fromState = state.entry && state.entry.id === id ? state.entry : null;
  const fromList = state.entries.find((entry) => entry.id === id);
  return {
    entry: fromState || fromList,
  };
}

const mapDispatchToProps = { fetchEntryById };

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail);

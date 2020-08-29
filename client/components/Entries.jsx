import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import EntryItem from "./EntryItem";
import { fetchEntries } from "../actions/entries";
import { IfAuthenticated } from "./Authenticated";

function Entries(props) {
  // useEffect will perpetually fetch and rerender
  // unless it can monitor state here...
  const [entryData] = useState([]);
  useEffect(() => {
    props.fetchEntries();
  }, [entryData]);

  const { entries } = props;
  return (
    <>
      <h2>Entries</h2>
      <IfAuthenticated>
        <Link to="/add">Add a entry</Link>
      </IfAuthenticated>
      <ul>
        {entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </>
  );
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
  };
}

const mapDispatchToProps = {
  fetchEntries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);

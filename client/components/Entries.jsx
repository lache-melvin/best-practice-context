import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import EntryItem from "./EntryItem";
import { IfAuthenticated } from "./Authenticated";

const Entries = () => {
  const { receiveEntries, entriesState } = useEntriesContext();

  useEffect(() => {
    props.fetchEntries();
  }, []);

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
};

export default Entries;

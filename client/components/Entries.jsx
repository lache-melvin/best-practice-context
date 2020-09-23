import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import withEntriesContext from "./EntriesContextWrapper";

import EntryItem from "./EntryItem";
import { IfAuthenticated } from "./Authenticated";

const Entries = (props) => {
  useEffect(props.retrieveEntries, []);

  return (
    <>
      <h2>Entries</h2>
      <IfAuthenticated>
        <Link to="/add">Add a entry</Link>
      </IfAuthenticated>
      <ul>
        {props.entries.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </>
  );
};

export default withEntriesContext(Entries);

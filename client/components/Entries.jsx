import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import EntryItem from "./EntryItem";
import { IfAuthenticated } from "./Authenticated";

import { withEntriesContext } from "../context";

export const Entries = ({ entries, retrieveEntries }) => {
  useEffect(retrieveEntries, []);
  return (
    <>
      <h2>Entries</h2>
      <IfAuthenticated>
        <Link to="/add">Add a entry</Link>
      </IfAuthenticated>
      <ul>
        {entries.map((entry) => (
          <EntryItem key={entry.id} entryData={entry} />
        ))}
      </ul>
    </>
  );
};

export default withEntriesContext(Entries);

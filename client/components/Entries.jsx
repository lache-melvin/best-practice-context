import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import WrappedEntryItem from "./EntryItem";

import { withAuthentication } from "../wrappers";
import { withEntriesContext } from "../context";

export function Entries({ authenticated, entries, retrieveEntries }) {
  useEffect(retrieveEntries, []);
  return (
    <>
      <h2>Entries</h2>
      {authenticated() && <Link to="/add">Add an entry</Link>}
      <ul>
        {entries.map((entry) => (
          <WrappedEntryItem key={entry.id} entryData={entry} />
        ))}
      </ul>
    </>
  );
}

export default withAuthentication(withEntriesContext(Entries));

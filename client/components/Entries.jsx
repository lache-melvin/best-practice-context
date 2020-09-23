import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useEntriesContext } from "../context";
import { retrieveEntries } from "../coordinators";

import EntryItem from "./EntryItem";
import { IfAuthenticated } from "./Authenticated";

const Entries = () => {
  const { applyEntries, entries } = useEntriesContext();

  useEffect(() => {
    retrieveEntries(applyEntries);
  }, []);

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

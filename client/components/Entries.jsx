import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useEntriesContext } from "../context";
import { getEntries } from "../api";

import EntryItem from "./EntryItem";
import { IfAuthenticated } from "./Authenticated";

const Entries = () => {
  const { receiveEntries, entriesState } = useEntriesContext();

  useEffect(() => {
    getEntries()
      .then((entries) => {
        return receiveEntries(entries);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, []);

  return (
    <>
      <h2>Entries</h2>
      <IfAuthenticated>
        <Link to="/add">Add a entry</Link>
      </IfAuthenticated>
      <ul>
        {entriesState.map((entry) => (
          <EntryItem key={entry.id} entry={entry} />
        ))}
      </ul>
    </>
  );
};

export default Entries;

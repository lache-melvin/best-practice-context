import React from "react";
import { Link } from "react-router-dom";

import { withEntryContext } from "../context";

export function EntryItem({ selectEntry, entryData }) {
  return (
    <li data-testid="entry">
      <Link
        to={`/entry/${entryData.id}`}
        onClick={() => selectEntry(entryData)}
      >
        {entryData.name}
      </Link>
    </li>
  );
};

export default withEntryContext(EntryItem);

import React from "react";
import { Link } from "react-router-dom";

import { wrappedWith, entryContext } from "../wrappers";

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
}

export default wrappedWith(entryContext)(EntryItem);

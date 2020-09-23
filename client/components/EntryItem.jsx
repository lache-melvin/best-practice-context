import React from "react";
import { Link } from "react-router-dom";

import { useEntryContext } from "../context";

const EntryItem = (props) => {
  const { applyEntry } = useEntryContext()
  const { entry } = props;
  return (
    <li data-testid="entry">
      <Link to={`/entry/${entry.id}`} onClick={() => applyEntry(entry)}>
        {entry.name}
      </Link>
    </li>
  );
};

export default EntryItem;

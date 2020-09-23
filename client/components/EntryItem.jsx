import React from "react";
import { Link } from "react-router-dom";

import { receiveEntry } from "../actions/entries";

const EntryItem = (props) => {
  const { entry, receiveEntry } = props;
  return (
    <li data-testid="entry">
      <Link to={`/entry/${entry.id}`} onClick={() => receiveEntry(entry)}>
        {entry.name}
      </Link>
    </li>
  );
};

export default EntryItem;

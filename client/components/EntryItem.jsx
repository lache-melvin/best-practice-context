import React from "react";
import { connect } from "react-redux";
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

const mapDispatchToProps = { receiveEntry };

export default connect(null, mapDispatchToProps)(EntryItem);

import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import EntryItem from "./EntryItem";
import { fetchEntries } from "../actions/entries";
import { IfAuthenticated } from "./Authenticated";

class Entries extends React.Component {
  componentDidMount() {
    this.props.fetchEntries();
  }

  render() {
    const { entries } = this.props;
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
  }
}

function mapStateToProps(state) {
  return {
    entries: state.entries,
  };
}

const mapDispatchToProps = {
  fetchEntries,
};

export default connect(mapStateToProps, mapDispatchToProps)(Entries);

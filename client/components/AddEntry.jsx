import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveEntry } from "../actions/entries";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

class AddEntry extends React.Component {
  state = {
    name: "",
    link: "",
    description: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAdd = () => {
    return this.props
      .saveEntry({
        authorId: this.props.userId,
        ...this.state,
      })
      .then((saved) => {
        this.props.history.push(`/entry/${saved.id}`);
        return null;
      });
  };

  render() {
    const { name, link, description } = this.state;
    return (
      <div data-testid="addentry">
        <h2>Add New Entry</h2>
        <IfAuthenticated>
          <div>
            <div>Name:</div>
            <input name="name" value={name} onChange={this.handleChange} />

            <div>Link:</div>
            <input name="link" value={link} onChange={this.handleChange} />

            <div>Description:</div>
            <textarea
              name="description"
              value={description}
              onChange={this.handleChange}
              cols="26"
            />

            <div>
              <button type="button" onClick={this.handleAdd}>
                Add this entry
              </button>
            </div>
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <div>
            You must <Link to="/signin">sign in</Link> to add new entries.
          </div>
        </IfNotAuthenticated>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { userId: state.user.id };
}

const mapDispatchToProps = { saveEntry };

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);

import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { saveEntry } from "../actions/entries";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

function AddEntry(props) {
  const [formData, setFormData] = useState({
    name: "",
    link: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    return props
      .saveEntry({
        authorId: props.userId,
        ...formData,
      })
      .then((saved) => {
        props.history.push(`/entry/${saved.id}`);
        return null;
      });
  };

  const { name, link, description } = formData;
  return (
    <div data-testid="addentry">
      <h2>Add New Entry</h2>
      <IfAuthenticated>
        <div>
          <div>Name:</div>
          <input name="name" value={name} onChange={handleChange} />

          <div>Link:</div>
          <input name="link" value={link} onChange={handleChange} />

          <div>Description:</div>
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            cols="26"
          />

          <div>
            <button type="button" onClick={handleAdd}>
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

function mapStateToProps(state) {
  return { userId: state.user.id };
}

const mapDispatchToProps = { saveEntry };

export default connect(mapStateToProps, mapDispatchToProps)(AddEntry);

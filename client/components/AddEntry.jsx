import React, { useState } from "react";
import { Link } from "react-router-dom";

import { submitEntry } from "../coordinators";

import { useEntryContext, useUserContext } from "../context";
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated";

function AddEntry(props) {
  const { receiveEntry } = useEntryContext();
  const { userState } = useUserContext();

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
    const authorId = userState.id
    submitEntry(authorId, formData, props.history, receiveEntry)
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

export default AddEntry;

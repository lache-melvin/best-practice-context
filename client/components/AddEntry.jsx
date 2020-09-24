import React, { useState } from "react";
import { Link } from "react-router-dom";

import { withAuthentication } from "./index";
import { withEntryContext, withUserContext } from "../context";

function AddEntry({ authenticated, user, submitEntry }) {
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
    const authorId = user.id;
    submitEntry(authorId, formData);
  };

  const { name, link, description } = formData;
  return (
    <div data-testid="addentry">
      <h2>Add New Entry</h2>
      {authenticated() ? (
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
      ) : (
        <div>
          You must <Link to="/signin">sign in</Link> to add new entries.
        </div>
      )}
    </div>
  );
}

export default withAuthentication(withEntryContext(withUserContext(AddEntry)));

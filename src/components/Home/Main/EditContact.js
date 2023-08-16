import React, { useState } from "react";
import { update } from "../../../services/contacts";
import { getUser } from "../../../services/users";

const EditContact = ({ user, setContacts, id , firstName, lastName, phone, setEdit }) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPhone, setNewPhone] = useState(phone);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await update(id, {firstName: newFirstName, lastName: newLastName, phone: newPhone});
    getUser(user.id).then((data) => {
      setContacts(data.contacts);
    });
    setNewFirstName("");
    setNewLastName("");
    setNewPhone("");
    setEdit(false)
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={newFirstName}
          onChange={(e) => handleChange(e, setNewFirstName)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={newLastName}
          onChange={(e) => handleChange(e, setNewLastName)}
        />
      </div>
      <div>
        <input
          type="tel"
          placeholder="Phone"
          value={newPhone}
          onChange={(e) => handleChange(e, setNewPhone)}
        />
      </div>
      <button type="submit">Save contact</button>
    </form>
  );
};

export default EditContact;

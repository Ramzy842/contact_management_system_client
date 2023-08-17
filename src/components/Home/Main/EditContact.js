import React, { useState } from "react";
import { update } from "../../../services/contacts";
import { getUser } from "../../../services/users";

const EditContact = ({
  user,
  setContacts,
  id,
  firstName,
  lastName,
  phone,
  setEdit,
  edit,
  handleEdit,
}) => {
  const [newFirstName, setNewFirstName] = useState(firstName);
  const [newLastName, setNewLastName] = useState(lastName);
  const [newPhone, setNewPhone] = useState(phone);

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try
    {
      if (newFirstName && newLastName && newPhone) {
        await update(id, {
          firstName: newFirstName,
          lastName: newLastName,
          phone: newPhone,
        });
        getUser(user.id).then((data) => {
          setContacts(data.contacts);
          setNewFirstName("");
          setNewLastName("");
          setNewPhone("");
          setEdit(false);
        });
      }
    }catch(err)
    {
      console.log(err);
    }
    
  };
  return (
    <tr key={id}>
      <td>
        <input
          type="text"
          placeholder="First Name"
          value={newFirstName}
          className="edit_input edit_firstname"
          onChange={(e) => handleChange(e, setNewFirstName)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={newLastName}
          className="edit_input edit_lastname"
          onChange={(e) => handleChange(e, setNewLastName)}
        />
      </td>
      <td>
        <input
          type="tel"
          placeholder="Phone"
          value={newPhone}
          className="edit_input"
          onChange={(e) => handleChange(e, setNewPhone)}
        />
      </td>
      <td>
        <button
          className="edit_contact edit_save_contact"
          onClick={handleSubmit}
        >
          Save contact
        </button>
        <button className="edit_contact" onClick={() => handleEdit(id)}>
          {edit ? "Cancel edit" : "Edit"}
        </button>{" "}
      </td>
    </tr>
  );
};

export default EditContact;

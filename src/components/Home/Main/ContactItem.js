import React, { useState } from "react";
import { remove } from "../../../services/contacts";
import { getUser } from "../../../services/users";
import EditContact from "./EditContact";

const ContactItem = ({ setContacts, user, contact }) => {
  const [showNumber, setShowNumber] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleDelete = async (id) => {
    await remove(id);
    getUser(user.id).then((data) => {
      setContacts(data.contacts);
    });
  };
  const handleEdit = () => {
    setEdit(!edit);
    setShowNumber(!showNumber);
  };
  return edit ? (
    <EditContact
      user={user}
      setContacts={setContacts}
      id={contact.id}
      firstName={contact.firstName}
      lastName={contact.lastName}
      phone={contact.phone}
      setEdit={setEdit}
      edit={edit}
      handleEdit={handleEdit}
    />
  ) : (
    <tr key={contact.id}>
      <td>
        {contact.firstName} {contact.lastName}
      </td>
      <td>{contact.phone}</td>
      <td>
        <button
          className="delete_contact"
          onClick={() => handleDelete(contact.id)}
        >
          Delete
        </button>{" "}
        <button className="edit_contact" onClick={() => handleEdit(contact.id)}>
          {edit ? "Cancel edit" : "Edit"}
        </button>{" "}
      </td>
    </tr>
  );
};

export default ContactItem;

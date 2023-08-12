import React, { useState } from "react";
import { remove } from "../../../services/contacts";
import { getUser } from "../../../services/users";

const ContactItem = ({setContacts, user, contact}) => {
  const [showNumber, setShowNumber] = useState(false)
  const handleDelete = async (id) => {
    await remove(id);
    getUser(user.id).then((data) => {
      setContacts(data.contacts);
    });
  }
  return (
    <li key={contact.id}>
      {contact.firstName} {showNumber && contact.phone}{" "}
      <button onClick={() => handleDelete(contact.id)}>Delete</button>{" "}
      <button onClick={() => setShowNumber(!showNumber)}>
        {showNumber ? "Hide Number" : "Show Number"}
      </button>{" "}
    </li>
  );
};

export default ContactItem;

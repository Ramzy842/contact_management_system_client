import React, { useEffect, useState } from "react";
import { create } from "../../../services/contacts";
import { getUser } from "../../../services/users";

const AddContact = ({ user, setContacts }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    await create({ firstName, lastName, phone, userId: user.id });
    const updatedUser = await getUser(user.id);
    console.log(updatedUser);
    getUser(user.id).then((data) => {
      setContacts(data.contacts);
    });
    setFirstName("");
    setLastName("");
    setPhone("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => handleChange(e, setFirstName)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => handleChange(e, setLastName)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => handleChange(e, setPhone)}
        />
      </div>
      <button type="submit">Save contact</button>
    </form>
  );
};

export default AddContact;

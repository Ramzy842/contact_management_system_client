import React, { useState } from "react";
import { create } from "../../../services/contacts";
import { getUser } from "../../../services/users";
import { useNavigate } from "react-router-dom";

const AddContact = ({
  user,
  setContacts,
  setShowAdd,
  headerHeight,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const createdUser = await create({
      firstName,
      lastName,
      phone,
      userId: user.id,
    });
    if (createdUser.error === "token expired") {
      window.localStorage.clear();
      setErrorMessage("Error adding contact: try again after logging in");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (createdUser.error) {
      setErrorMessage(createdUser.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    } else {
      getUser(user.id).then((data) => {
        setContacts(data.contacts);
      });
      setFirstName("");
      setLastName("");
      setPhone("");
      setShowAdd(false);
    }
  };
  return (
    <form
      style={{ top: headerHeight }}
      className="add_contact_form"
      onSubmit={handleSubmit}
    >
      {errorMessage && <p className="error">{errorMessage}</p>}
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
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => {
            handleChange(e, setPhone);
          }}
        />
      </div>
      <button type="submit">Save contact</button>
    </form>
  );
};

export default AddContact;

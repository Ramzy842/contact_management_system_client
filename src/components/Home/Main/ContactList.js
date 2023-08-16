import React, { useEffect } from "react";
import ContactItem from "./ContactItem";
import { getUser } from "../../../services/users";

const ContactList = ({
  contacts,
  user,
  setContacts,
  initialContacts,
  setInitialContacts,
}) => {
  useEffect(() => {
    if (user) {
      getUser(user.id).then((data) => {
        setInitialContacts(data.contacts);
        setContacts(initialContacts);
      });
    }
  }, [initialContacts, user, setContacts, setInitialContacts]);
  if (!contacts) return <h1>Loading...</h1>;
  return contacts.length > 0 ? (
    <table className="contacts_table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            user={user}
            setContacts={setContacts}
          />
        ))}
      </tbody>
    </table>
  ) : (
    // <ul className="contact_list">
    //   {contacts.map((contact) => (
    //     <ContactItem
    //       key={contact.id}
    //       contact={contact}
    //       user={user}
    //       setContacts={setContacts}
    //     />
    //   ))}
    // </ul>
    <h1>You have no contacts</h1>
  );
};

export default ContactList;

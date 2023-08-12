import React, { useEffect, useState } from "react";
import { remove, setToken } from "../services/contacts";
import AddContact from "../components/Home/Main/AddContact";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/users";
import ContactItem from "../components/Home/Main/ContactItem";

const Home = ({ setUser, user }) => {
  const [contacts, setContacts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedSystemUser");
    if (loggedUser) {
      const newUser = JSON.parse(loggedUser);
      setUser(newUser);
      setToken(newUser.token);
    } else navigate("/login");
  }, [setUser, navigate]);

  const handleClick = () => {
    setShowAdd(!showAdd);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedSystemUser");
    navigate("/login");
  }

  useEffect(() => {
    if (user) {
      getUser(user.id).then((data) => setContacts(data.contacts));
    }
  }, [user]);
  if (!contacts || contacts.length === 0) return <div>Loading...</div>;
  return (
    contacts && (
      <div>
        <h1>
          Welcome back Mr {user.username.toUpperCase()} <button onClick={handleLogout}>Log out</button>
        </h1>
        <button onClick={handleClick}>
          {showAdd ? "Cancel" : "Add contact"}
        </button>
        {showAdd && <AddContact user={user} setContacts={setContacts} />}
        <ul>
          {contacts.map((contact) => (
            <ContactItem
              key={contact.id}
              contact={contact}
              user={user}
              setContacts={setContacts}
            />
          ))}
        </ul>
      </div>
    )
  );
};

export default Home;

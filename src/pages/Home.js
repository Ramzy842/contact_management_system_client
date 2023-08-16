import React, { useEffect, useState } from "react";
import { setToken } from "../services/contacts";
import AddContact from "../components/Home/Main/AddContact";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import ContactList from "../components/Home/Main/ContactList";
import Header from "../components/Home/Header/Header";
import SearchBox from "../components/Home/Main/SearchBox";

const Home = ({ setUser, user }) => {
  const [initialContacts, setInitialContacts] = useState(null);
  const [contacts, setContacts] = useState(initialContacts);
  const [showAdd, setShowAdd] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedSystemUser");
    if (loggedUser) {
      const newUser = JSON.parse(loggedUser);
      setUser(newUser);
      setToken(newUser.token);
    } else navigate("/login");
  }, [setUser, navigate]);

  return (
    user && (
      <div className="container_home">
        <Header
          setHeaderHeight={setHeaderHeight}
          user={user}
          showAdd={showAdd}
          setShowAdd={setShowAdd}
        />
        <main>
          <SearchBox
            initialContacts={initialContacts}
            setContacts={setContacts}
          />
          {showAdd && (
            <AddContact
              headerHeight={headerHeight}
              user={user}
              setShowAdd={setShowAdd}
              setContacts={setContacts}
            />
          )}
          <ContactList
            contacts={contacts}
            user={user}
            setContacts={setContacts}
            initialContacts={initialContacts}
            setInitialContacts={setInitialContacts}
          />
        </main>
      </div>
    )
  );
};

export default Home;

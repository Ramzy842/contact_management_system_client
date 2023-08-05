import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {getContact, getContacts} from "./services/contacts"
function App() {
  const [contacts, setContacts] = useState()
  useEffect(() => {
    getContacts().then(data => setContacts(data));
    getContact("64ca945849f86c982086a712").then(data => console.log(data))
  }, [])
  useEffect(() => {
    console.log("list of contacts: ", contacts);
  }, [contacts])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

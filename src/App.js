import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { useState, useEffect } from "react";
import PhoneList from "./components/PhoneList/PhoneList";
import ContactForm from "./components/ContactForm/ContactForm";
import Filter from "./components/Filter/Filter";

function App({ onSubmit }) {
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("contacts")) ?? [
        { id: uuidv4(), name: "Rosie Simpson", tel: "459-12-56" },
        { id: uuidv4(), name: "Hermione Kline", tel: "443-89-12" },
        { id: uuidv4(), name: "Eden Clements", tel: "645-17-79" },
        { id: uuidv4(), name: "Annie Copeland", tel: "227-91-26" },
      ]
    );
  });
  const [filter, setFilter] = useState("");

  const handleContactDelete = (currentId) => {
    setContacts(({ contacts }) =>
      contacts.filter((contact) => contact.id !== currentId),
    );
  };

  const handleFilterContacts = (event) => {
    setFilter(event.target.value);
  };
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleContactAdd = ({ name, tel }) => {
    const contact = {
      id: uuidv4(),
      name,
      tel,
    };

    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find((contact) => contact.tel === tel)) {
      alert(`${tel} is already in contacts.`);
    } else {
      setContacts((prevContacts) => [...prevContacts, contact]);
    }
  };
  const getFilterContacts = () => {
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter),
    );
  };

  const filterContacts = getFilterContacts();
  return (
    <div className="container">
      <h1>PhoneBooks</h1>
      <ContactForm onSubmit={handleContactAdd} />
      <h2>Contacts</h2>
      {contacts.length > 1 && (
        <Filter value={filter} change={handleFilterContacts} />
      )}
      {contacts.length > 0 ? (
        <PhoneList list={filterContacts} onDelete={handleContactDelete} />
      ) : (
        <p>You are don*t have a contact</p>
      )}
    </div>
  );
}
export default App;

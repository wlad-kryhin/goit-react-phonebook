import { v4 as uuidv4 } from 'uuid';
import './index.css';
import { Component } from 'react';
import PhoneList from './components/PhoneList/PhoneList';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleContactDelete = currentId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== currentId),
    }));
  };

  handleFilterContacts = event => {
    this.setState({ filter: event.currentTarget.value });
  };
  componentDidMount() {
    const items = localStorage.getItem('contacts');
    const itemsParse = JSON.parse(items);
    if (itemsParse) {
      this.setState({ contacts: itemsParse });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('обновилось поле ');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  handleContactAdd = ({ name, tel }) => {
    const contact = {
      id: uuidv4(),
      name,
      tel,
    };
    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts.`);
    } else if (contacts.find(contact => contact.tel === tel)) {
      alert(`${tel} is already in contacts.`);
    } else {
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
    }
  };
  getFilterContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizeFilter),
    );
  };
  render() {
    const { contacts, filter } = this.state;
    const filterContacts = this.getFilterContacts();
    return (
      <div className="container">
        <h1>PhoneBooks</h1>
        <ContactForm onSubmit={this.handleContactAdd} />
        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} change={this.handleFilterContacts} />
        )}
        {contacts.length > 0 ? (
          <PhoneList
            list={filterContacts}
            onDelete={this.handleContactDelete}
          />
        ) : (
          <p>You are don*t have a contact</p>
        )}
      </div>
    );
  }
}
export default App;

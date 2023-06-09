import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export function App() {
  const storedContacts = localStorage.getItem('contacts');
  const parsedContacts = storedContacts
    ? JSON.parse(storedContacts)
    : defaultContacts;

  const [contacts, setContacts] = useState(parsedContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = contact => {
    const newContact = {
      id: nanoid(5),
      name: contact.name,
      number: contact.number,
    };

    const isNameExists = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    isNameExists
      ? Notify.failure(`${newContact.name} is already exists`)
      : setContacts([newContact, ...contacts]);
  };

  const filterContact = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(
      contacts.filter(c => {
        return c.id !== contactId;
      })
    );
  };

  const normalizedFilter = filter.toLowerCase().trim();
  const filterContacts = contacts.filter(contact => {
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterContact} />
      <ContactList contacts={filterContacts} deleteContact={deleteContact} />
    </>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    })
  ),
  filter: PropTypes.string,
};

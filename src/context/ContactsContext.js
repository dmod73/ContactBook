import React, {useContext, useState, createContext, useEffect} from 'react';
import { initDB, createContact, readContacts, updateContact, deleteContact } from '../db/ContactsRepository';

export const ContactsContext = createContext();

export const ContactsProvider = ({children}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
  initDB();
  loadContacts();
  }, []);

  const loadContacts = async () => {
  const data = await readContacts();
  setContacts(data);
  };

  const addContact = async (contact) => {
  const id = await createContact(contact);
  setContacts(prev => [...prev, { ...contact, id }]);
  };

  const editContact = async (id, updatedContact) => {
    await updateContact(id, updatedContact);
    setContacts(prev =>
    prev.map(c => (c.id === id ? { ...c, ...updatedContact } : c))
    );
  };

  const removeContact = async (id) => {
    await deleteContact(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const value = {
    contacts,
    setContacts,
    addContact,
    editContact,
    removeContact,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);

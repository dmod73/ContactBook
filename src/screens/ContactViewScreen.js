import { useEffect } from 'react';
import { View } from 'react-native';
import ContactCard from '../components/ContactCard';
import { useContactsContext } from '../context/ContactsContext';

const ContactViewScreen = ({ navigation, route }) => {
  const { contact } = route.params;
  const { contacts, removeContact } = useContactsContext();

  useEffect(() => {
    const exists = contacts.some(c => c.id === contact.id);

    if (!exists) {
      navigation.navigate('ContactList');
    }
  }, [contacts, contact.id, navigation, removeContact]);

  return (
    <View style={{ flex: 1 }}>
      <ContactCard contact={contact} />
    </View>
  );
};

export default ContactViewScreen;

import { View } from 'react-native';
import ContactForm from '../components/ContactForm';
import { useContactsContext } from '../context/ContactsContext';

const ContactFormScreen = ({ navigation, route }) => {
  const { contact } = route.params;
  const { addContact, editContact } = useContactsContext();

  const onSubmit = async ({ name, phone, email }) => {
    if (contact.id !== undefined) {
       await editContact(contact.id, { name, phone, email });
     } else {
       await addContact({ name, phone, email });
       }


    navigation.navigate('ContactList');
  };

  return (
    <View style={{ flex: 1 }}>
      <ContactForm contact={contact} onSubmit={onSubmit} />
    </View>
  );
};

export default ContactFormScreen;

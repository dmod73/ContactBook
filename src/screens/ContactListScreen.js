import { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { FAB } from 'react-native-paper';
import ContactListItem from '../components/ContactListItem';
import { useContactsContext } from '../context/ContactsContext';

const ContactListScreen = ({ navigation }) => {
  const { contacts } = useContactsContext();

  useEffect(() => {
    // TODO: fetch contacts from database and setContacts
  }, []);

  const renderItem = ({ item }) => (
    <ContactListItem
      contact={item}
      onPress={() => navigation.navigate('ContactView', { contact: item })}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => navigation.navigate('ContactForm', { contact: {} })}
      />
    </View>
  );
};

export default ContactListScreen;

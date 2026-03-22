import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from './src/screens/ContactListScreen';
import ContactFormScreen from './src/screens/ContactFormScreen';
import ContactViewScreen from './src/screens/ContactViewScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { ContactsProvider } from './src/context/ContactsContext';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { triggerSync } from './src/sync/syncService';

const Stack = createStackNavigator();

export default function App() {
  const netInfo = useNetInfo();

  useEffect(() => {
  if (netInfo.isConnected) {
  console.log("Back online - trigger sync");
  triggerSync();
  }
  }, [netInfo.isConnected]);

  return (
    <PaperProvider>
      <ContactsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ContactList">
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              options={{ title: 'Contacts' }}
            />
            <Stack.Screen
              name="ContactView"
              component={ContactViewScreen}
              options={{ title: 'View Contact' }}
            />
            <Stack.Screen
              name="ContactForm"
              component={ContactFormScreen}
              options={{ title: 'Edit Contact' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsProvider>
    </PaperProvider>
  );
}

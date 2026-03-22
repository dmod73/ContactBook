import { getUnsyncedContacts, markContactAsSynced } from '../db/ContactsRepository';

export const triggerSync = async () => {
const unsyncedContacts = await getUnsyncedContacts();

for (let contact of unsyncedContacts) {
try {
console.log("Syncing contact:", contact.name);

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));

  await markContactAsSynced(contact.id);

  console.log("Synced:", contact.name);

} catch (err) {
  console.log("Sync failed for contact", contact.name, err);
}

}
};

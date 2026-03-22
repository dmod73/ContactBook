# Contact Book App

## Overview

This is a mobile Contact Book application built using React Native.
The app allows users to add, edit, and delete contacts, with full offline support and automatic synchronization when the device reconnects to the internet.

## Features

* Add new contacts
* View list of contacts
* Edit existing contacts
* Delete contacts (soft delete)
* Data persistence using SQLite
* Offline-first functionality
* Automatic sync when internet is restored

## Technologies Used

* React Native CLI
* React Navigation
* React Native Paper
* SQLite (react-native-sqlite-storage)
* Context API for state management
* NetInfo for network detection

## Project Structure

src/
components/
screens/
context/
db/
sync/

## How to Run the App

1. Install dependencies:
   npm install

2. Start Metro:
   npx react-native start

3. Run Android:
   npm run android

## Testing Offline Sync

1. Turn OFF internet (WiFi or data)
2. Add or edit a contact
3. Turn ON internet
4. Check console logs for:

   * "Back online - trigger sync"
   * "Syncing contact"
   * "Synced contact"

## Notes

* The app uses SQLite as a local database.
* Contacts are marked with a syncStatus:

  * 1 = pending sync
  * 0 = synced
  * -1 = deleted
* Sync is simulated using console logs (no real backend).

## Known Limitations

* No real server integration (sync is simulated)
* No multi-user sync
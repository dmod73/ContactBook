import SQLite from 'react-native-sqlite-storage';

// Open (or create) database
const db = SQLite.openDatabase(
{ name: 'contacts.db', location: 'default' },
() => {},
error => { console.error('Error opening database:', error); }
);

// Function to create table if not exists
export const initDB = () => {
db.transaction(tx => {
tx.executeSql(
`CREATE TABLE IF NOT EXISTS Contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT,
        email TEXT,
        syncStatus INTEGER
      );`,
[],
() => {},
(_, error) => { console.error('Error creating table:', error); }
);
tx.executeSql(
'ALTER TABLE Contacts ADD COLUMN syncStatus INTEGER DEFAULT 0;',
[],
() => {},
(errOrTx, maybeError) => {
const error = maybeError || errOrTx;
if (error && String(error.message).includes('duplicate column name')) {
return;
}
console.error('Error adding syncStatus column:', error);
}
);
tx.executeSql(
'UPDATE Contacts SET syncStatus = 0 WHERE syncStatus IS NULL;',
[],
() => {},
(_, error) => { console.error('Error setting default syncStatus:', error); }
);
tx.executeSql(
"UPDATE Contacts SET syncStatus = -1 WHERE (name IS NULL OR TRIM(name) = '') AND (phone IS NULL OR TRIM(phone) = '') AND (email IS NULL OR TRIM(email) = '') AND IFNULL(syncStatus, 0) != -1;",
[],
() => {},
(_, error) => { console.error('Error cleaning invalid contacts:', error); }
);
});
};

// Create
export const createContact = ({ name, phone, email }) => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'INSERT INTO Contacts (name, phone, email, syncStatus) VALUES (?, ?, ?, ?);',
[name, phone, email, 1],
(_, result) => { resolve(result.insertId); },
(_, error) => {
console.error('Error inserting contact:', error);
reject(error);
}
);
});
});
};

// Read
export const readContacts = () => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'SELECT * FROM Contacts WHERE IFNULL(syncStatus, 0) != -1 AND (COALESCE(TRIM(name), \'\') != \'\' OR COALESCE(TRIM(phone), \'\') != \'\' OR COALESCE(TRIM(email), \'\') != \'\') ORDER BY id DESC;',
[],
(_, result) => {
let rows = result.rows;
let contacts = [];
for (let i = 0; i < rows.length; i++) {
contacts.push(rows.item(i));
}
resolve(contacts);
},
(_, error) => {
console.error('Error fetching contacts:', error);
reject(error);
}
);
});
});
};

// Update
export const updateContact = (id, { name, phone, email }) => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'UPDATE Contacts SET name=?, phone=?, email=?, syncStatus=1 WHERE id=?;',
[name, phone, email, id],
() => { resolve(); },
(errOrTx, maybeError) => {
const error = maybeError || errOrTx;
console.error('Error updating contact:', error);
reject(error);
}
);
});
});
};

// Delete
export const deleteContact = (id) => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'UPDATE Contacts SET syncStatus = -1 WHERE id=?;',
[id],
() => { resolve(); },
(_, error) => {
console.error('Error deleting contact:', error);
reject(error);
}
);
});
});
};

export const getUnsyncedContacts = () => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'SELECT * FROM Contacts WHERE IFNULL(syncStatus, 0) != 0;',
[],
(_, result) => {
let rows = result.rows;
let contacts = [];
for (let i = 0; i < rows.length; i++) {
contacts.push(rows.item(i));
}
resolve(contacts);
},
(_, error) => {
console.error('Error fetching unsynced contacts:', error);
reject(error);
}
);
});
});
};

export const markContactAsSynced = (id) => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'UPDATE Contacts SET syncStatus = 0 WHERE id=?;',
[id],
() => { resolve(); },
(_, error) => {
console.error('Error marking contact as synced:', error);
reject(error);
}
);
});
});
};

export const clearAllContacts = () => {
return new Promise((resolve, reject) => {
db.transaction(tx => {
tx.executeSql(
'DELETE FROM Contacts;',
[],
() => {
resolve();
},
(tx, error) => {
console.error("Error clearing contacts:", error);
reject(error);
}
);
});
});
};

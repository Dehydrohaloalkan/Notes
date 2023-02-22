import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('mydatabase.db');

export function createTable() {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT)',
            [],
            (txObj, resultSet) => {
                console.log('Table created successfully!');
            },
            (txObj, error) => {
                console.log(`Error: ${error.message}`);
            }
        );
    });
};

export function getAllNotes() {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM notes',
                [],
                (txObj, { rows: { _array } }) => {
                    resolve(_array);
                },
                (txObj, error) => {
                    reject(error);
                }
            );
        });
    });
};

function addNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO notes (title, description) VALUES (?, ?)',
                [note.title, note.description],
                (txObj, resultSet) => {
                    resolve(resultSet.insertId);
                },
                (txObj, error) => {
                    reject(error);
                }
            );
        });
    });
};

function updateNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE notes SET title=?, description=? WHERE id=?',
                [note.title, note.description, note.id],
                (txObj, resultSet) => {
                    resolve(note.id);
                },
                (txObj, error) => {
                    reject(error);
                }
            );
        });
    });
};

export async function addOrUpdateNote(note) {
    if (note.id == -1) {
        return await addNote(note).catch((e) => console.log(e));
    } else {
        return await updateNote(note).catch((e) => console.log(e));
    }
}

export function removeNote(note) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM notes WHERE id=?',
                [note.id],
                (txObj, resultSet) => {
                    resolve();
                },
                (txObj, error) => {
                    reject(error);
                }
            );
        });
    });
};
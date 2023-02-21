import * as FileSystem from 'expo-file-system';

const fileUri = `${FileSystem.documentDirectory}/data.json`;

function generateId() {
    return Date.now();
}

export async function getAllNotes() {
    const jsonString = await FileSystem.readAsStringAsync(fileUri);
    return JSON.parse(jsonString);
}

async function addNote(note){
    console.log(FileSystem.documentDirectory);
    const data = await getAllNotes();
    note.id = generateId();
    data.push(note);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    return note.id;
}

async function updateNote(note){
    const data = await getAllNotes();
    const index = data.findIndex(item => item.id === note.id);
    if (index !== -1) {
        data[index] = note;
    }
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    return note.id;
}

export async function addOrUpdateNote(note){
    if (note.id == -1){
        return await addNote(note).catch((e) => console.log(e));
    } else {
        return await updateNote(note).catch((e) => console.log(e));
    }
}

export async function removeNote(note) {
    const data = await getAllNotes();
    const index = data.findIndex(item => item.id === note.id);
    data.splice(index, 1);
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
}
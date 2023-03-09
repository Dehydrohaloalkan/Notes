import { FlatList } from "react-native";

import { Note } from "./NoteElement";

export function NotesList({ data, onRemove, savingSystem, ss }) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <Note data={item} onRemove={onRemove} savingSystem={savingSystem} ss={ss}></Note>
            )}
        />
    )
}
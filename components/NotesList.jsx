import { FlatList } from "react-native";

import { Note } from "./NoteElement";

export function NotesList({ data, onRemove }) {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <Note data={item} onRemove={onRemove}></Note>
            )}
        />
    )
}
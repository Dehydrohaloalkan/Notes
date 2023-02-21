import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native"

import { NotesList } from "./NotesList"

export function NodeListWithSeach({ data, onRemove }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState(data);

    const search = () => {
        const filteredResults = data.filter((note) => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
        setSearchResults(filteredResults);
    }

    useEffect(() => {
        search();
    }, [data]);

    const handleChange = (text) => {
        setSearchTerm(text);
        search();
    };

    return (
        <View style={styles.container}>
            <View style={styles.search}>
                <TextInput style={styles.input}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Search..."
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    onChangeText={handleChange}
                />
            </View>
            <NotesList data={searchResults} onRemove={onRemove}></NotesList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    search: {
        padding: 0,
        marginVertical: 10,
        marginHorizontal: 10,
        elevation: 3,
        borderRadius: 25,
        backgroundColor: 'white',
        opacity: 0.9,
        width: 'auto',
        top: 0,
    },
    input: {
        marginHorizontal: 20,
        height: 37,
        color: '#999'
    },
})



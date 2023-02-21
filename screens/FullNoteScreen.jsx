import { useState, useEffect } from 'react';
import { TextInput, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as fs from '../services/fs.service';

import { SaveButton } from '../components/SaveButton';
import { cutString } from '../services/cutString';

export function FullNoteScreen({ route }) {
    const navigation = useNavigation();
    const [note, setNote] = useState({
        id: -1,
        title: '',
        description: '',
    });

    useEffect(() => {
        if (route.params != undefined) {
            navigation.setOptions({ title: cutString(route.params.note.title, 15) })
            setNote(route.params.note)
        } else {
            navigation.setOptions({ title: "Untitled" })
            setNote({
                id: -1,
                title: '',
                description: '',
            })
        }
    }, []);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <SaveButton onPress={saveNote}></SaveButton>
            },
        });
    }, [note]);

    const onChangeTitle = (text) => {
        setNote({
            id: note.id,
            title: text,
            description: note.description
        })
        text != '' ?
            navigation.setOptions({ title: cutString(text, 15) }) :
            navigation.setOptions({ title: "Untitled" })
    }

    const onChangeDescription = (text) => {
        setNote({
            id: note.id,
            title: note.title,
            description: text
        }) 
    }

    const saveNote = async () => {
        const id = await fs.addOrUpdateNote(note);
        setNote({
            id: id,
            title: note.title,
            description: note.description
        })
    }

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.title}
                placeholder="ADD TITLE..."
                onChangeText={(text) => onChangeTitle(text)}
                multiline={true}
                underlineColorAndroid='rgba(0,0,0,0)'
                defaultValue={note.title}
            />
            <TextInput
                style={styles.description}
                underlineColorAndroid="transparent"
                placeholder="ADD DESCRIPTION..."
                onChangeText={(text) => onChangeDescription(text)}
                multiline={true}
                defaultValue={note.description}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
    title: {
        fontSize: 28,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: "Grey",
    },
    description: {
        fontSize: 18,
        paddingBottom: 100,
    },
});

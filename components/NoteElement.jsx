import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

export function Note({ data, onRemove, savingSystem }) {
    const navigation = useNavigation();

    const deleteCurrentNote = async () => {
        await ss.removeNote(data);
        onRemove?.();
    }

    const promptToDeleteNote = () => {
        Alert.alert(
            'Deletion',
            'Do you want to delete this note?',
            [
                { text: 'Yes', style: 'destructive', onPress: deleteCurrentNote },
                { text: 'No', style: 'cancel' }
            ]);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('FullNote', { note: data, savingSystem: savingSystem })}
            onLongPress={promptToDeleteNote}
        >
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.content} numberOfLines={2} >{data.description}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF",
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 8,
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
        marginBottom: 10,
    },
    content: {
        fontSize: 15,
    }
})  
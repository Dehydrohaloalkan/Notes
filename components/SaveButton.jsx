import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

export function SaveButton({onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Icon 
                name='checkmark-outline'
                type='ionicon'
                color='#0F0' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEEEEE',
        borderRadius: 100,
    },
});
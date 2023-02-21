import { TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";

export function AddNewButton({onPress}) {
    return (
        <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={onPress}>
            <Icon
                name='add-outline'
                type='ionicon'
                color='#000' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#D1FEFF',
        borderRadius: 100,
        elevation: 4,
        color: '#000'
    },
});
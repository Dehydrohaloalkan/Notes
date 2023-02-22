import { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";

export function SettingsModal({ settingsVisible, setSettingsVisible, savingSystem, setSavingSystem }) {
    const [checked, setChecked] = useState(1);

    useEffect(() => {
        setChecked(savingSystem);
    }, [settingsVisible]);

    const SaveSettings = () => {
        setSettingsVisible(!settingsVisible);
        setSavingSystem(checked);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={settingsVisible}
            onRequestClose={() => {
                setSettingsVisible(!settingsVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Notes saving system</Text>
                    <View>
                        {['File sistem', 'SQLite'].map((l, i) => (
                            <CheckBox
                                key={i}
                                title={l}
                                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                checkedIcon="dot-circle-o"
                                uncheckedIcon="circle-o"
                                checked={checked === i + 1}
                                onPress={() => setChecked(i + 1)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.buttonSave}
                        onPress={SaveSettings}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 40,
        paddingVertical: 30,
        alignItems: 'center',
        elevation: 10,
    },
    buttonSave: {
        backgroundColor: '#D1FEFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        elevation: 3,
        marginTop: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
    },
});
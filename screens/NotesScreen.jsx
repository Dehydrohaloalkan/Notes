import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as fs from '../services/fs.service';
import * as sqlite from '../services/SQLite.service';

import { NodeListWithSeach } from '../components/NodeListWithSearch';
import { SettingsModal } from '../components/SettingsModal';
import { AddNewButton } from '../components/AddNewButton';
import { SettingsButton } from '../components/SettingsButton';

export function NotesScreen() {
    const navigation = useNavigation();
    const [settingsVisible, setSettingsVisible] = useState(false);
    const [savingSystem, setSavingSystem] = useState(1);
    const [ss, setss] = useState(fs);

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <SettingsButton onPress={() => setSettingsVisible(true)} />
            ),
        });
    }, []);

    useEffect(() => {
        navigation.addListener('focus', getNotes);
        return () => {
            navigation.removeListener('focus', getNotes);
        }
    }, [navigation, ss]);

    useEffect(() => {
        if (savingSystem == 1) {
            setss(fs);
        } else {
            sqlite.createTable();
            setss(sqlite);
        }
    }, [savingSystem]);

    useEffect(() => {
        getNotes();
    }, [ss]);

    const getNotes = async () => {
        setNotes(await ss.getAllNotes());
    }

    return (
        <View>
            <NodeListWithSeach data={notes} onRemove={() => getNotes()} savingSystem={savingSystem}></NodeListWithSeach>
            <AddNewButton onPress={() => navigation.navigate('FullNote', {savingSystem: savingSystem})} />
            <SettingsModal
                settingsVisible={settingsVisible}
                setSettingsVisible={setSettingsVisible}
                savingSystem={savingSystem}
                setSavingSystem={setSavingSystem} />
        </View>
    );
}

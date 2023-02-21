import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NotesScreen } from './screens/NotesScreen';
import { FullNoteScreen } from './screens/FullNoteScreen';

const Stack = createNativeStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Notes">
            <Stack.Screen
                name="Notes"
                component={NotesScreen}
                options={{
                    title: "Notes",
                }}
            />
            <Stack.Screen
                name="FullNote"
                component={FullNoteScreen}
                options={{
                    title: 'Untitled',
                }}
            />
        </Stack.Navigator>
    </NavigationContainer>
);

export default App;

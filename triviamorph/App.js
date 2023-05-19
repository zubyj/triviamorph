import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen.js';
import UserMorphGame from './src/screens/UserMorphGame.js';
import RandomMorphGame from './src/screens/RandomMorphGame.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserMorph" component={UserMorphGame} />
        <Stack.Screen name="RandomMorph" component={RandomMorphGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

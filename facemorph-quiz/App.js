import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './src/screens/MainScreen.js';
import UserMorphGame from './src/screens/UserMorphGame.js';
import RandomMorphGame from './src/screens/RandomMorphGame.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="UserMorph" component={UserMorphGame} />
        <Stack.Screen name="RandomMorph" component={RandomMorphGame} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

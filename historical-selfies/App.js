import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import UserSelfieScreen from './src/screens/UserSelfieScreen';
import MorphingScreen from './src/screens/MorphingScreen';
import ResultsScreen from './src/screens/ResultsScreen';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  UserSelfie: { screen: UserSelfieScreen },
  MorphingScreen: { screen: MorphingScreen },
  ResultsScreen: { screen: ResultsScreen },
});

const AppContainer = createAppContainer(MainNavigator);

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

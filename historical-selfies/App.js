import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import ImageUploadScreen from './src/screens/ImageUploadScreen';
import ImageViewScreen from './src/screens/ImageViewScreen';

const MainNavigator = createStackNavigator({
  ImageUpload: { screen: ImageUploadScreen },
  ImageView: { screen: ImageViewScreen },
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

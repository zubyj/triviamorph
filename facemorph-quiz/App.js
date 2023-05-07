import React from 'react';
import { StyleSheet, View } from 'react-native';
import QuizScreen from './src/screens/QuizScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <QuizScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamiy: 'sans-serif',
    color: '#fff',
  },
});

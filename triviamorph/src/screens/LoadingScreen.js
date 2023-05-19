import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import TypeWriter from 'react-native-typewriter';

const LoadingScreen = ({ text }) => {
    return (
        <View style={styles.container}>
            <TypeWriter typing={1} style={styles.loadingText} repeat={true}>{text}</TypeWriter>
            <Image source={require('../../assets/images/cube-300w.gif')} accessibilityLabel="cube" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        fontSize: 20,
        padding: 20,
        color: '#fff',
    },
});

export default LoadingScreen;
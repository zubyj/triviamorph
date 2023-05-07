import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import TypeWriter from 'react-native-typewriter';

const LoadingScreen = ({ text }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#fff" />
            <TypeWriter typing={1} style={styles.loadingText} repeat={true}>{text}</TypeWriter>
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
        fontSize: 15,
        padding: 20,
        color: '#fff',
    },
});

export default LoadingScreen;
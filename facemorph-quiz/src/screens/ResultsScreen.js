import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import trophy from '../../assets/images/trophy.gif';

export default function ResultsScreen({ score, resetGameState }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Final Score: {score}</Text>
            <Button
                mode="outlined"
                textColor="#fff"
                onPress={resetGameState}
                style={styles.button}
            >
                Return Home
            </Button>
            <Image source={trophy} style={styles.image} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flexDirection: 'column',
        marginTop: 30,
    },
    text: {
        color: '#fff',
        fontSize: 25,
        marginBottom: 20,
        marginTop: 20,
    },
    button: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
});

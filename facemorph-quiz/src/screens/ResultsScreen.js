import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import trophy from '../../assets/images/trophy.gif';

export default function ResultsScreen({ score }) {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Results</Text>
            <Image source={trophy} style={styles.image} />
            <Text style={styles.text}>Your final score is {score}</Text>
            <Button
                mode="outlined"
                textColor="#fff"
                onPress={() => console.log('hello world')}
                style={styles.button}
            >
                Return Home
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 25,
        color: '#fff',
        marginBottom: 15,
    },
    text: {
        color: '#fff',
        fontSize: 18,
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

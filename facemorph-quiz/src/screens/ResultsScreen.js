import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

import HeaderText from '../components/HeaderText';
import trophy from '../../assets/images/trophy.gif';

export default function ResultsScreen({ score, numQuestions, resetGameState }) {
    const percentage = (score / numQuestions) * 100;
    const percentColor = percentage === 100 ? '#00ff00' :
        percentage >= 75 ? '#4caf50' :
            percentage >= 50 ? '#ffc107' :
                percentage >= 25 ? '#ff9800' :
                    '#f44336';
    return (
        <View style={styles.container}>
            <Button
                mode="outlined"
                textColor="#fff"
                onPress={resetGameState}
                style={styles.homeButton}
            >
                Return Home
            </Button>
            <HeaderText text={`Final Score: ${score} / ${numQuestions}`} />
            <Text style={[styles.text, styles.percentScore, { color: percentColor }]}>
                {percentage.toFixed(0)}%
            </Text>
            <Image source={trophy} style={styles.image} />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    homeButton: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 50,
    },
    percentScore: {
        fontSize: 50,
    },
});

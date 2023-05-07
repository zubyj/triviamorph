import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';


export default function ResultsScreen() {
    return (
        <>
            <Text style={styles.resultText}>Congratulations! You've completed the quiz!</Text>
            <Button
                mode="outlined"
                textColor='#fff'
                style={styles.quizButton}
                onPress={() => console.log('hello world')}
            >
                Go back
            </Button>
        </>
    )
}
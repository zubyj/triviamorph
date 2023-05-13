import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

import QuestionCountSelector from '../components/QuestionCountSelector';
import HeaderText from '../components/HeaderText';

export default function MainScreen({ navigation }) {

    const [numQuestions, setNumQuestions] = useState(1);
    const [selectedGame, setSelectedGame] = useState('RandomMorph');

    const navigateToGame = () => {
        navigation.navigate(selectedGame, { numQuestions: numQuestions });
    };

    return (
        <View style={styles.container}>
            <HeaderText text="How many questions?" />
            <QuestionCountSelector
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
            />
            <HeaderText text="Select the game" />
            <Button
                mode={selectedGame === 'RandomMorph' ? "contained" : "outlined"}
                onPress={() => setSelectedGame('RandomMorph')}
                textColor='#fff'
                style={styles.button}
            >
                Morph random faces
            </Button>
            <Button
                mode={selectedGame === 'UserMorph' ? "contained" : "outlined"}
                onPress={() => setSelectedGame('UserMorph')}
                textColor='#fff'
                style={styles.button}
            >
                Morph your face
            </Button>
            <Button
                mode="outlined"
                onPress={navigateToGame}
                textColor='#fff'
                style={[styles.button, styles.submitButton,]}
            >
                Submit
            </Button>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 250,
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    submitButton: {
        marginTop: 100,
        width: 300
    }
});

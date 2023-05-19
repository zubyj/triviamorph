import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';

import QuestionCountSelector from '../components/QuestionCountSelector';
import HeaderText from '../components/HeaderText';

export default function HomeScreen({ navigation }) {

    const [numQuestions, setNumQuestions] = useState(3);
    const [selectedGame, setSelectedGame] = useState('UserMorph');

    const navigateToGame = () => {
        navigation.navigate(selectedGame, { numQuestions: numQuestions });
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/title.png')} style={styles.logoText} accessibilityLabel="logo text" />
            <HeaderText text="Select the game" />
            <Button
                mode={selectedGame === 'UserMorph' ? "contained" : "outlined"}
                icon="camera"
                onPress={() => setSelectedGame('UserMorph')}
                textColor='#fff'
                style={styles.button}
            >
                Morph your face
            </Button>
            <Button
                mode={selectedGame === 'RandomMorph' ? "contained" : "outlined"}
                icon="dice-multiple"
                onPress={() => setSelectedGame('RandomMorph')}
                textColor='#fff'
                style={styles.button}
            >
                Morph random faces
            </Button>
            <QuestionCountSelector
                numQuestions={numQuestions}
                setNumQuestions={setNumQuestions}
            />
            <Button
                mode="filled"
                buttonColor='#05a95c'
                icon="play"
                onPress={navigateToGame}
                textColor='#fff'
                style={[styles.button, styles.submitButton,]}
            >
                Play
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
    logoText: {
        marginBottom: 20
    },
    button: {
        width: 250,
        margin: 5,
        padding: 10,
        borderRadius: 5,
    },
    submitButton: {
        marginTop: 60,
        width: 300
    }
});

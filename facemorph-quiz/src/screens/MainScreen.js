import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

import QuestionCountSelector from '../components/QuestionCountSelector';
import HeaderText from '../components/HeaderText';

export default function MainScreen({ navigation }) {

    const [numQuestions, setNumQuestions] = useState(1);

    return (
        <View style={styles.container}>
            <HeaderText text="How many questions?" />
            <QuestionCountSelector
                numQuestions={numQuestions}
                onSelectQuestionCount={setNumQuestions}
            />
            <HeaderText text="Select the game" />
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('Results')}
                textColor='#D8BFD8'
                style={styles.button}
            >
                Morph random faces
            </Button>
            <HeaderText text="OR" />
            <Button
                mode="outlined"
                onPress={() => navigation.navigate('App')}
                textColor='#D8BFD8'
                style={styles.button}
            >
                Morph your face
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
        margin: 5,
        width: 250,
        padding: 10,
        borderRadius: 5,
    },
});

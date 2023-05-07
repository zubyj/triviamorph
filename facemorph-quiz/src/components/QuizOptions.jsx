// QuizOptions.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const QuizOptions = ({ options, handleButtonClick, isCorrect, randomImageValue }) => {
    return (
        <View style={styles.buttonsContainer}>
            {options.map((option, index) => (
                <Button
                    key={index}
                    mode="outlined"
                    style={[styles.quizButton, isCorrect && option === randomImageValue ? styles.selectedButton : null]}
                    onPress={() => handleButtonClick(option)}
                    disabled={isCorrect}
                    label={option}
                    textColor='#fff'
                >
                    <Text style={styles.text}>
                        {option}
                    </Text>
                </Button>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    quizButton: {
        width: '45%',
        margin: 5,
        borderRadius: 5,
    },

    selectedButton: {
        backgroundColor: '#999',
    },
    text: {
        fontSize: 15,
    },
});

export default QuizOptions;

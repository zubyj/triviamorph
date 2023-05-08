import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const QuizOptions = ({ options, handleButtonClick, isCorrect, randomImageValue }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonPress = (option) => {
        setSelectedOption(option);
        handleButtonClick(option);
        setIsClicked(true);
    };

    const getButtonStyle = (option) => {
        if (selectedOption === option) {
            return isCorrect && option === randomImageValue
                ? styles.correctButton
                : styles.incorrectButton;
        } else if (isClicked && option === randomImageValue) {
            return styles.correctButton;
        }
        return null;
    };

    return (
        <View style={styles.buttonsContainer}>
            <Text style={styles.headerText}>Who are you morphed with?</Text>
            {options.map((option, index) => (
                <Button
                    key={index}
                    mode="outlined"
                    textColor='#fff'
                    style={[styles.quizButton, getButtonStyle(option)]}
                    onPress={() => handleButtonPress(option)}
                    disabled={isCorrect || isClicked}
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
        color: '#fff',
    },
    correctButton: {
        backgroundColor: 'green',
    },
    incorrectButton: {
        backgroundColor: 'red',
    },
    headerText: {
        marginTop: 15,
        fontSize: 20,
        color: '#fff',
        marginBottom: 30,
    },
});

export default QuizOptions;

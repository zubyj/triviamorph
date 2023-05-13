import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';
import HeaderText from './HeaderText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// iPad dimensions in portrait
const isIpad = (windowHeight >= 1024 && windowWidth >= 768) || (windowHeight >= 768 && windowWidth >= 1024);


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
            {options.map((option, index) => (
                <Button
                    key={index}
                    mode="outlined"
                    textColor='#fff'
                    style={[styles.quizButton, getButtonStyle(option.value)]}
                    onPress={() => handleButtonPress(option.value)}
                    disabled={isCorrect || isClicked}
                >
                    <Text style={styles.text}>
                        {option.name || option.value}
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
        width: isIpad ? 600 : '45%',
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
});

export default QuizOptions;

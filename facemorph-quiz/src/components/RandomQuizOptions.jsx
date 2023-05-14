//RandomQuizOptions.js

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const RandomQuizOptions = ({ options, handleButtonClick, selectedOptions, setSelectedOptions, selectedMorph, isSubmitted }) => {

    const handleButtonPress = (option) => {
        if (!isSubmitted) {
            if (selectedOptions.includes(option.slug)) {
                setSelectedOptions(selectedOptions.filter(slug => slug !== option.slug));
            } else if (selectedOptions.length < 2) {
                setSelectedOptions([...selectedOptions, option.slug]);
            }
        }
    };

    const getButtonStyle = (option) => {
        if (isSubmitted) {
            if (selectedMorph.compositeImage.components.some(component => component.slug === option.slug)) {
                return selectedOptions.includes(option.slug) ? styles.correctButton : styles.unselectedCorrectButton;
            } else if (selectedOptions.includes(option.slug)) {
                return styles.incorrectButton;
            }
        } else if (selectedOptions.includes(option.slug)) {
            return styles.selectedButton;
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
                    style={[styles.quizButton, getButtonStyle(option)]}
                    onPress={() => handleButtonPress(option)}
                >
                    <Text style={styles.text}>
                        {option.name || option.slug}
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
        margin: 5,
        borderRadius: 5,
        width: '45%',
    },
    selectedButton: {
        backgroundColor: '#6750a4',
    },
    correctButton: {
        backgroundColor: 'green',
    },
    incorrectButton: {
        backgroundColor: 'red',
    },
    unselectedCorrectButton: {
        backgroundColor: 'green',
    },
    text: {
        fontSize: 15,
        color: '#fff',
    },
});

export default RandomQuizOptions;

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

const RandomQuizOptions = ({ options, handleButtonClick, selectedOptions, setSelectedOptions }) => {

    const handleButtonPress = (option) => {
        if (selectedOptions.includes(option.slug)) {
            setSelectedOptions(selectedOptions.filter(slug => slug !== option.slug));
        } else if (selectedOptions.length < 2) {
            setSelectedOptions([...selectedOptions, option.slug]);
        }
    };

    const getButtonStyle = (option) => {
        if (selectedOptions.includes(option)) {
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
                    style={[styles.quizButton, getButtonStyle(option.slug)]}
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
        backgroundColor: 'green',
    },
    text: {
        fontSize: 15,
        color: '#fff',
    },
});

export default RandomQuizOptions;
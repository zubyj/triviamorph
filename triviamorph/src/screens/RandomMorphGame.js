import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-paper'
import ResultsScreen from './ResultsScreen';
import HeaderText from '../components/HeaderText';

import morphs from '../../assets/morphs';

export default function RandomMorphGame({ route }) {

    const { numQuestions } = route.params;

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [questionNum, setQuestionNum] = useState(0);
    const [score, setScore] = useState(0);

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);
    const [correctOptions, setCorrectOptions] = useState([]);
    const [image, setImage] = useState('');

    useEffect(() => {
        if (questionNum === 0) {
            generateMorphOptions();
        }
    }, [questionNum]);

    const generateMorphOptions = () => {
        let randomIndex = Math.floor(Math.random() * morphs.length);
        let option = morphs[randomIndex];

        let person1 = {
            name: option.name,
            slug: option.slug
        }

        let randomImageIndex = Math.floor(Math.random() * option.morphs.length);
        let randomImage = option.morphs[randomImageIndex];
        let filename = randomImage.filename;
        setImage(filename);

        let person2 = {
            name: randomImage.name,
            slug: randomImage.slug
        }

        // Save the correct options
        setCorrectOptions([person1.name, person2.name]);

        const wrongOptions = option.wrongOptions;
        const randomIndex1 = Math.floor(Math.random() * wrongOptions.length);
        let randomIndex2 = Math.floor(Math.random() * wrongOptions.length);
        while (randomIndex1 === randomIndex2) {
            randomIndex2 = Math.floor(Math.random() * wrongOptions.length);
        }

        const wrongOption1 = wrongOptions[randomIndex1];
        const wrongOption2 = wrongOptions[randomIndex2];

        // Combine the correct and wrong options
        const combinedOptions = [person1.name, person2.name, wrongOption1, wrongOption2];

        // Shuffle the options
        const shuffledOptions = combinedOptions.sort(() => Math.random() - 0.5);

        setOptions(shuffledOptions);
    }

    const handleOptionClick = (option) => {
        if (selected.includes(option)) {
            setSelected(selected.filter(item => item !== option));
        }
        else if (selected.length < 2) {
            setSelected([...selected, option]);
        }
    }

    const handleSubmit = () => {
        if (selected.length < 2) {
            alert('Please select two options');
            return;
        }

        setIsSubmitted(true);

        // Check if the selected options are correct
        if (selected.every(option => correctOptions.includes(option))) {
            setScore(score + 1);
        } else {
        }

        setTimeout(nextQuestion, 2000);
    };

    const nextQuestion = () => {
        generateMorphOptions();
        setQuestionNum(questionNum + 1);
        setSelected([]);
        setIsSubmitted(false);
    }

    const resetGameState = () => {
        setIsLoading(false);
        setQuestionCount(0);
        setScore(0);
        setOptions([]);
        setSelectedOptions([]); // Reset selected options
    }

    const getScreen = () => {
        if (questionNum >= numQuestions) {
            return (
                <ResultsScreen
                    score={score}
                    numQuestions={numQuestions}
                    resetGameState={resetGameState} />
            )
        }
        return (
            <>
                <HeaderText text={`Question ${questionNum + 1} / ${numQuestions}`} />
                <HeaderText text={`Score: ${score}`} />
                {image && <Image source={image} style={styles.image} />}
                <View style={styles.buttonsContainer}>
                    {options.map(option => (
                        <Button
                            key={option}
                            onPress={() => handleOptionClick(option)}
                            mode='outlined'
                            style={styles.quizButton}
                            textColor={'white'}
                            buttonColor={
                                isSubmitted
                                    ? correctOptions.includes(option)
                                        ? 'green'
                                        : selected.includes(option)
                                            ? 'red'
                                            : '#222'
                                    : selected.includes(option)
                                        ? '#6750a4'
                                        : '#222'
                            }                        >
                            {option}
                        </Button>
                    ))}
                </View >
                <Button
                    onPress={handleSubmit}
                    mode='outlined'
                    borderRadius={10}
                    textColor={'white'}
                    buttonColor={selected.length == 2 && 'green'}
                    style={styles.submitButton}
                    disabled={isSubmitted}
                >
                    Submit
                </Button >
            </>
        )
    }
    return (
        <View style={styles.container}>
            {getScreen()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 300,
        maxWidth: '80%',
        borderWidth: 10,
        borderColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
    },
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
    disabledSubmitButton: {
    },
    submitButton: {
        width: 200,
        borderRadius: 10,
        marginTop: 20,
    }
});

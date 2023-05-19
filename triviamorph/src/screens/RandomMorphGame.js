import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-paper'

import LoadingScreen from './LoadingScreen';
import ResultsScreen from './ResultsScreen';
import QuizOptions from '../components/RandomQuizOptions';
import HeaderText from '../components/HeaderText';
import { generateMorphOptions } from '../utils/randomMorph';
import morphs from '../../assets/morphs';

export default function RandomMorphGame({ route }) {

    const { numQuestions } = route.params;

    const [selectedMorph, setSelectedMorph] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (selectedMorph.compositeImage) {
            const optionsArray = generateMorphOptions(selectedMorph);
            setOptions(optionsArray);
        }
    }, [selectedMorph]);

    useEffect(() => {
        if (questionCount === 0) {
            let randomIndex = Math.floor(Math.random() * morphs.length);
            setSelectedMorph(morphs[randomIndex]);
            setIsLoading(false);
        }
    }, [questionCount]);

    const handleOptionSelect = (selectedOption) => {
        if (selectedOptions.length < 2) {
            setSelectedOptions([...selectedOptions, selectedOption]);
        }
    };


    const handleSubmit = () => {
        if (selectedOptions.length < 2) {
            alert('Please select two options');
            return;
        }

        setIsSubmitted(true);

        if (selectedOptions.every(option => selectedMorph.compositeImage.components.some(component => component.slug === option))) {
            setScore(score + 1);
            setIsCorrect(true);
        }

        if (questionCount < numQuestions) {
            setTimeout(() => {
                setQuestionCount(questionCount + 1);
                setIsCorrect(false);
                setSelectedMorph({});
                setIsSubmitted(false);
                setSelectedOptions([]); // Reset selected options
                let randomIndex = Math.floor(Math.random() * morphs.length);
                setSelectedMorph(morphs[randomIndex]);
            }, 2000); // Set a delay before moving to the next question
        }
    };

    const resetGameState = () => {
        setSelectedMorph({});
        setIsCorrect(false);
        setIsLoading(false);
        setQuestionCount(0);
        setScore(0);
        setOptions([]);
        setSelectedOptions([]); // Reset selected options
    }

    const getScreen = () => {
        if (questionCount >= numQuestions) {
            return (
                <ResultsScreen
                    score={score}
                    numQuestions={numQuestions}
                    resetGameState={resetGameState} />
            )
        }
        if (isLoading) {
            return (
                <LoadingScreen text={`Creating Question ${questionCount + 1} ...`} />
            )
        }
        if (selectedMorph.compositeImage) {
            return (
                <>
                    <HeaderText text={`Question ${questionCount + 1} / ${numQuestions}`} />
                    <HeaderText text={`Score: ${score}`} />
                    <Image style={styles.image} source={selectedMorph.compositeImage.filename} />
                    <QuizOptions
                        options={options}
                        selectedMorph={selectedMorph}
                        isSubmitted={isSubmitted}
                        handleButtonClick={handleOptionSelect}
                        isCorrect={isCorrect}
                        selectedOptions={selectedOptions}
                        setSelectedOptions={setSelectedOptions}
                    />
                    <Button
                        onPress={handleSubmit}
                        mode='outlined'
                        textColor={selectedOptions.length == 2 ? '#8AFF8A' : 'white'}
                        style={styles.submitButton}
                        disabled={isSubmitted}
                    >
                        Submit</Button >
                </>
            )
        }
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
    disabledSubmitButton: {
    },
    submitButton: {
        width: 200,
        borderRadius: 10,
        marginTop: 20,
    }
});
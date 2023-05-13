import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import LoadingScreen from './LoadingScreen';
import ResultsScreen from './ResultsScreen';
import QuizOptions from '../components/QuizOptions';
import QuestionCountSelector from '../components/QuestionCountSelector';
import HeaderText from '../components/HeaderText';
import { generateMorphOptions } from '../utils/randomMorph';
import morphs from '../../assets/morphs.json';

export default function RandomMorphGame() {

    const [selectedMorph, setSelectedMorph] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [numQuestions, setNumQuestions] = useState(1);
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

    const handleButtonClick = (selectedOption) => {
        if (selectedMorph.compositeImage.components.some(component => component.slug === selectedOption)) {
            setScore(score + 1);
            setIsCorrect(true);
        }

        if (questionCount < numQuestions) {
            setTimeout(() => {
                setQuestionCount(questionCount + 1);
                setIsCorrect(false);
                setSelectedMorph({});
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
        if (selectedMorph.compositeImage && options.length > 0) {
            return (
                <>
                    <HeaderText text={`Question ${questionCount + 1} / ${numQuestions}`} />
                    <HeaderText text={`Score: ${score}`} />
                    <Image style={styles.image} source={{ uri: `../../assets/images/${selectedMorph.compositeImage.filename}` }} />
                    <QuizOptions options={options} handleButtonClick={handleButtonClick} isCorrect={isCorrect} randomImageValue={selectedMorph.compositeImage.components[0].slug} />
                </>
            )

            if (!selectedMorph.compositeImage) {
                return (
                    <>
                        <HeaderText text="Select number of questions" />
                        <QuestionCountSelector questionCount={numQuestions} onSelectQuestionCount={setNumQuestions} />
                        <HeaderText text="Press start to begin" />
                        <Button title="Start" onPress={() => {
                            let randomIndex = Math.floor(Math.random() * morphs.length);
                            setSelectedMorph(morphs[randomIndex]);
                            setIsLoading(true);
                        }} />
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
    }
});

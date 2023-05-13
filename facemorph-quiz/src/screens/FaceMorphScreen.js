import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View } from 'react-native';

import LoadingScreen from './LoadingScreen';
import ResultsScreen from './ResultsScreen';
import UploadImageButton from '../components/UploadImageButton';
import QuizOptions from '../components/QuizOptions';
import QuestionCountSelector from '../components/QuestionCountSelector';
import HeaderText from '../components/HeaderText';
import { generateOptions, getMorph } from '../utils/utils';

export default function FaceMorphScreen() {

    const [imageUrl, setImageUrl] = useState('');
    const [morphUri, setMorphUri] = useState('');
    const [randomImage, setRandomImage] = useState(''); // random image object from people.json

    const [isLoading, setIsLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [numQuestions, setNumQuestions] = useState(1);
    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (morphUri && randomImage) {
            const optionsArray = generateOptions(randomImage);
            setOptions(optionsArray);
        }
    }, [morphUri, randomImage]);

    useEffect(() => {
        if (questionCount === 0 && imageUrl) {
            getMorph({ setRandomImage, setMorphUri, setIsLoading, imageUrl });
        }
    }, [questionCount, imageUrl]);

    const handleButtonClick = (selectedOption) => {
        if (selectedOption === randomImage.value) {
            setScore(score + 1);
            setIsCorrect(true);
        }

        if (questionCount < numQuestions) {
            setTimeout(() => {
                setQuestionCount(questionCount + 1);
                setIsCorrect(false);
                setMorphUri('');
                getMorph({ setRandomImage, setMorphUri, setIsLoading, imageUrl });
            }, 2000); // Set a delay before moving to the next question
        }
    };

    const resetGameState = () => {
        setImageUrl('');
        setMorphUri('');
        setRandomImage('');
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
        if (morphUri && options.length > 0) {
            return (
                <>
                    <HeaderText text={`Question ${questionCount + 1} / ${numQuestions}`} />
                    <HeaderText text={`Score: ${score}`} />
                    <Image style={styles.image} source={{ uri: morphUri }} />
                    <QuizOptions options={options} handleButtonClick={handleButtonClick} isCorrect={isCorrect} randomImageValue={randomImage.value} />
                </>
            )
        }
        if (!imageUrl) {
            return (
                <>
                    <HeaderText text="Select number of questions" />
                    <QuestionCountSelector questionCount={numQuestions} onSelectQuestionCount={setNumQuestions} />
                    <HeaderText text="Upload a face to begin" />
                    <UploadImageButton
                        setImageUrl={setImageUrl}
                    />
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
    }
});
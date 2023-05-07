// native imports 
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
// external imports
import { Button } from 'react-native-paper';
// local imports
import UploadImageButton from '../components/UploadImageButton';
import QuizOptions from '../components/QuizOptions';
import LoadingScreen from './LoadingScreen';
import { getRandomImage } from '../UploadRandomImage';
// asset imports
import people from '../../assets/people.json';

export default function QuizScreen() {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph';

    const [imageUrl, setImageUrl] = useState('');
    const [morphUri, setMorphUri] = useState('');
    const [randomImage, setRandomImage] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const [questionCount, setQuestionCount] = useState(0);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (morphUri && randomImage) {
            const optionsArray = generateOptions();
            setOptions(optionsArray);
        }
    }, [morphUri, randomImage]);

    useEffect(() => {
        if (questionCount === 0 && imageUrl) {
            getMorph();
        }
    }, [questionCount, imageUrl]);

    const generateOptions = () => {
        let num = 3
        const related = randomImage.related;
        const shuffledRelated = related.sort(() => Math.random() - 0.5);
        const otherOptions = shuffledRelated.slice(0, num).map((value) => people.find((person) => person.value === value).name);
        const allOptions = [...otherOptions, randomImage.value];
        const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
        return shuffledOptions;
    };

    const handleButtonClick = (selectedOption) => {
        if (selectedOption === randomImage.value) {
            setScore(score + 1);
            setIsCorrect(true);
        }

        if (questionCount < 4) {
            setTimeout(() => {
                setQuestionCount(questionCount + 1);
                setIsCorrect(false);
                setMorphUri(''); // Reset morphUri to move to the next question
                getMorph(); // Start the morphing process for the next question
            }, 2000); // Set a delay before moving to the next question
        }
    };

    async function checkImageAvailability(uri) {
        return Image.prefetch(uri)
            .then(() => true)
            .catch(() => false);
    }

    async function getMorph() {
        const { randomImageUrl, randomImageData } = await getRandomImage();
        setRandomImage(randomImageData);

        try {
            setIsLoading(true);

            const data = new FormData();
            data.append("firstImageRef", imageUrl);
            data.append("secondImageRef", randomImageUrl);
            data.append("isAsync", "True");
            data.append("isSequence", "False");

            const response = await fetch(MORPH_ENDPOINT, {
                method: "POST",
                headers: {
                    Authorization: "ImageMorpherV1",
                },
                body: data,
            });

            if (response.ok) {
                const resJson = await response.json();
                const uri = resJson.morphUri;

                while (!(await checkImageAvailability(uri))) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                setMorphUri(uri);
                setIsLoading(false);
                return;
            } else {
                setIsLoading(false);
                throw new Error(response);
            }
        } catch (error) {
            setIsLoading(false);
            console.error(error);
        }
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
                <LoadingScreen text={`Creating Question ${questionCount + 1} ...`} />
            </View>
        )
    }
    if (questionCount >= 4) {
        return (
            <View style={styles.container}>
                <ResultsScreen />
            </View>
        )
    }
    if (morphUri) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Question {questionCount + 1} / 5</Text>
                <Text style={styles.headerText}>Score: {score}</Text>
                <Image style={styles.image} source={{ uri: morphUri }} />
                <Text style={styles.headerText}>Who are you morphed with?</Text>
                <QuizOptions options={options} handleButtonClick={handleButtonClick} isCorrect={isCorrect} randomImageValue={randomImage.value} />
            </View >
        )
    }

    if (!imageUrl) {
        return (
            <View style={styles.container}>
                <UploadImageButton
                    setImageUrl={setImageUrl}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamiy: 'sans-serif',
    },
    image: {
        width: 400,
        height: 300,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    headerText: {
        marginTop: 15,
        fontSize: 20,
        color: '#fff',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        color: '#fff',
    },
});
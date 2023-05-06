import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import Typewriter from 'react-native-typewriter';

import faces from '../../assets/faces.json'



export default function ImageViewScreen({ navigation }) {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph';

    const image = navigation.getParam('image1', null); // base 64 or uri of image
    const image2 = navigation.getParam('image2', null)

    const [morphUri, setMorphUri] = useState(null);
    const [isMorphUriReady, setIsMorphUriReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const randomFace = navigation.getParam('randomFace', null);

    const handleAnswer = (answer) => {
        setSelectedAnswer(answer);
        setIsCorrect(answer === randomFace.value);
    };

    async function checkImageAvailability(uri) {
        return Image.prefetch(uri)
            .then(() => true)
            .catch(() => false);
    }

    async function getMorph() {
        if (!image) {
            return;
        }
        try {
            setIsLoading(true);

            const data = new FormData();
            data.append("firstImageRef", image);
            data.append("secondImageRef", image2);
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
                console.log('uri : ' + uri);

                while (!(await checkImageAvailability(uri))) {
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                }

                setMorphUri(uri);
                setIsMorphUriReady(true);
                setIsLoading(false);
                return;
            } else {
                console.log('response' + response);
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
                <Typewriter style={styles.loadingText} typing={1} minDelay={50} maxDelay={100} repeat={true}>
                    Creating the game ...
                </Typewriter>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    if (isMorphUriReady) {
        return (
            <View style={styles.container}>

                <Image source={{ uri: morphUri }} style={styles.image} resizeMode="contain" />
                {selectedAnswer && (
                    <Text style={styles.resultText}>{isCorrect ? "Correct!" : "Wrong!"}</Text>
                )}
                <Text style={styles.loadingText}>Who are you morphed with?</Text>
                <View style={styles.buttonsContainer}>
                    {[randomFace.value, ...randomFace.related].map((answer, index) => (
                        <Button
                            key={index}
                            mode="outlined"
                            onPress={() => handleAnswer(answer)}
                            style={[styles.quizButton, selectedAnswer === answer ? styles.selectedButton : null]}
                        >
                            <Text style={styles.text}>{faces.find((face) => face.value === answer).name}</Text>
                        </Button>
                    ))}
                </View>

            </View>

        )
    }

    return (
        <View style={styles.container}>
            <Button
                mode="outlined"
                icon="play-box"
                width={200}
                style={styles.button}
                onPress={() => getMorph()}
            >
                <Text style={styles.text}>
                    MORPH
                </Text>
            </Button>
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
        width: 300,
        height: 400,
    },
    text: {
        color: '#fff',
        fontSize: 15,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
    },
    quizButton: {
        width: '45%',
        padding: 10,
    },
    loadingText: {
        fontSize: 15,
        padding: 20,
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#999',
    },
    resultText: {
        color: '#fff',
        fontSize: 20,
    },
});
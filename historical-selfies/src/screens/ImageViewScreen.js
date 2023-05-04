import React, { useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import Typewriter from 'react-native-typewriter';

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
        padding: 20,
    },
    loadingText: {
        fontSize: 15,
        padding: 20,
        color: '#fff',
    }
});

export default function ImageViewScreen({ navigation }) {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph';

    const image = navigation.getParam('image', null); // base 64 or uri of image
    const [morphUri, setMorphUri] = useState(null);
    const [isMorphUriReady, setIsMorphUriReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

            console.log('image ' + image);

            const data = new FormData();
            data.append("firstImageRef", image);
            data.append("secondImageRef", image);
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
                <Button
                    mode="contained"
                    icon="home"
                    onPress={() => navigation.navigate('Home')}
                    style={styles.button}
                >
                    <Text style={styles.text}
                    >
                        Home
                    </Text>
                </Button>
                <Image source={{ uri: morphUri }} style={styles.image} resizeMode="contain" />
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
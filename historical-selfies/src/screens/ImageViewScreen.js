import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';

export default function ImageViewScreen({ navigation }) {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph';

    const image = navigation.getParam('image', null); // base 64 or uri of image

    async function getMorph() {
        if (!image) {
            return
        }
        try {
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
                console.log('resJson : ' + resJson.morphUri);
                return;
            } else {
                console.log('response' + response);
                throw new Error(response);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Morph" onPress={() => getMorph()} />
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '70%',
    },
});

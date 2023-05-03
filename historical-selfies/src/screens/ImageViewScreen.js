import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';

export default function ImageViewScreen({ navigation }) {

    const imagePath = navigation.getParam('imagePath', null);

    const isImageValid = async () => {
        try {
            const response = await fetch(imagePath);
            const blob = await response.blob();
            const base64Image = await blobToBase64(blob);
            const uriImage = `data:${blob.type};base64,${base64Image}`;

            const data = new FormData();
            data.append('firstImageRef', uriImage);

            const responseJson = await fetch('https://pyaar.ai/morph/upload', {
                method: 'POST',
                headers: {
                    Authorization: 'ImageMorpherV1',
                },
                body: data,
            });

            if (!responseJson.ok) {
                throw responseJson;
            }

            console.log('Image upload was successful');
            return responseJson.data;
        } catch (error) {
            console.log('Image upload failed');
            console.log(JSON.stringify(error));
        }
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
    };


    return (
        <View style={styles.container}>
            {imagePath && (
                <Image source={{ uri: imagePath }} style={styles.image} resizeMode="contain" />
            )}
            <Button title="Is Image Valid?" onPress={() => isImageValid()} />
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

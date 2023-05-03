import React, { useState } from 'react';
import { StyleSheet, View, Image, Button, Text } from 'react-native';

export default function ImageViewScreen({ navigation }) {

    const imagePath = navigation.getParam('imagePath', null);

    const isImageValid = async () => {
        const data = new FormData();

        data.append('firstImageRef', imagePath);
        fetch(
            'https://pyaar.ai/morph/upload', {
            method: 'POST',
            headers: {
                'Authorization': 'ImageMorpherV1',
            },
            body: data,
        }
        )
            .then(res => {
                if (!res.ok) {
                    throw res
                }
                return res.json()
            })
            .then(resJson => {
                console.log('Image upload was successful')
                // On success, hide the loading spinner
                return resJson.data
            })
            .catch((error) => {
                console.log('Image upload failed')
                console.log(JSON.stringify(error))
            })
    }

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

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph/upload'

    const uploadIcon = require('../../assets/icons/upload-img.png');
    const invalidIcon = require('../../assets/icons/invalid-img.png');

    const [isValid, setIsValid] = useState(true);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
            base64: true,
        });

        const asset = result.assets && result.assets[0];

        if (!asset) {
            throw new Error('No image selected');
        }

        if (!result.canceled) {
            if (asset) {
                const { uri } = asset;
                if (asset.base64) {
                    uploadImage(asset.base64)
                }
                else if (asset.uri) {
                    uploadImage(asset.uri)
                }
                saveImage(uri);
            }
        }
    };

    const saveImage = async (uri) => {
        const fileName = uri.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;
        try {
            await FileSystem.moveAsync({
                from: uri,
                to: newPath,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const uploadImage = async (img) => {
        const data = new FormData()
        data.append('firstImageRef', img)
        fetch(
            MORPH_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: 'ImageMorpherV1',
            },
            body: data
        }
        )
            .then(res => {
                if (!res.ok) {
                    setIsValid(false);
                    throw res
                }

                return res.json();
            })
            .then(resJson => {
                console.log('Image upload success');
                setIsValid(true);
                navigation.navigate('ImageView', { image: resJson });
                return resJson.data
            })
            .catch((error) => {
                console.log('Image upload failed')
                console.log(JSON.stringify(error))
                setIsValid(false);
            })
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={pickImage}
            >
                <Image source={isValid ? uploadIcon : invalidIcon} />
            </TouchableOpacity>
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
});

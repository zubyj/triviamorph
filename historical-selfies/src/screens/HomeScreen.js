/*
1. Allows users to pick an image form their device's image library.
2. Uploads the selected image and a hardcoded image to the server.
3. Sends the selected image and a hardcoded image to the server's upload endpoint
4. The server's upload endpoint will return image refs
5. Navigates to ImageViewScreen with the image refs.
*/

import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import TomCruiseImg from '../../assets/images/faces/tom-cruise.jpeg';

export default function HomeScreen({ navigation }) {

    const MORPH_ENDPOINT = 'https://pyaar.ai/morph/upload'

    const uploadIcon = require('../../assets/icons/upload-img.png');
    const invalidIcon = require('../../assets/icons/invalid-img.png');

    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const selectImage = async () => {
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

        return asset;
    };

    const uploadSelectedImage = async (selectedImage) => {
        const { uri } = selectedImage;

        let userImage = null;

        if (selectedImage.base64) {
            userImage = await uploadImage(selectedImage.base64, true);
        } else if (selectedImage.uri) {
            userImage = await uploadImage(selectedImage.uri, true);
        }

        saveImage(uri);

        return userImage;
    };

    const uploadTomCruiseImage = async () => {
        const tomCruiseAsset = Asset.fromModule(TomCruiseImg);
        await tomCruiseAsset.downloadAsync();
        const tomCruiseUri = tomCruiseAsset.localUri;
        const tomCruiseBase64 = await FileSystem.readAsStringAsync(tomCruiseUri, { encoding: FileSystem.EncodingType.Base64 });
        return await uploadImage(`data:image/jpeg;base64,${tomCruiseBase64}`, false);
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

    const uploadImage = async (img, isFirstImg) => {
        try {
            const data = new FormData();
            data.append('firstImageRef', img);

            const response = await fetch(MORPH_ENDPOINT, {
                method: 'POST',
                headers: {
                    Authorization: 'ImageMorpherV1',
                },
                body: data,
            });

            if (!response.ok) {
                setIsValid(false);
                throw response;
            }

            const resJson = await response.json();
            console.log('Image upload success');
            console.log('res json ' + resJson);
            setIsValid(true);
            return resJson;
        } catch (error) {
            console.log('Image upload failed');
            if (isFirstImg) {
                console.log('Your image failed');
            } else {
                console.log('Tom Cruise image failed');
            }
            console.log(JSON.stringify(error));
            setIsValid(false);
        }
    };


    const pickImage = async () => {
        setIsLoading(true);
        const selectedImage = await selectImage();

        if (selectedImage) {
            const uploadedUserImage = await uploadSelectedImage(selectedImage);
            const uploadedTomCruiseImage = await uploadTomCruiseImage();

            if (uploadedUserImage && uploadedTomCruiseImage) {
                navigation.navigate('ImageView', { image1: uploadedUserImage, image2: uploadedTomCruiseImage });
            }
        }
        setIsLoading(false);
    };

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
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const UploadImageButton = ({ setImageUrl }) => {

    const uploadIcon = require('../../assets/icons/upload-img.png');
    const invalidIcon = require('../../assets/icons/invalid-img.png');
    const MORPH_ENDPOINT = 'https://pyaar.ai/morph/upload';

    const [isValid, setIsValid] = useState(true);

    const pickImage = async () => {
        const selectedImage = await selectImage();
        if (!selectedImage) {
            return
        }
        const uploadedUserImage = await uploadSelectedImage(selectedImage);
        setImageUrl(uploadedUserImage);
    };

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

    const uploadImage = async (img) => {
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
            setIsValid(true);
            return resJson;
        } catch (error) {
            console.log('Image upload failed');
            console.log(error);
            console.log(JSON.stringify(error));
            setIsValid(false);
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

    return (
        <TouchableOpacity
            onPress={pickImage}
        >
            <Image source={isValid ? uploadIcon : invalidIcon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default UploadImageButton;

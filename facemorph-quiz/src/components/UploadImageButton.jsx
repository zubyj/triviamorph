import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { UPLOAD_ENDPOINT, AUTH_HEADER } from "@env"

const UploadImageButton = ({ setImageUrl }) => {

    const uploadIcon = require('../../assets/icons/upload-img.png');
    const invalidIcon = require('../../assets/icons/invalid-img.png');

    const [isValid, setIsValid] = useState(true);

    const pickImage = async () => {
        try {
            const selectedImage = await selectImage();
            if (!selectedImage) {
                return;
            }
            const uploadedUserImage = await uploadSelectedImage(selectedImage);
            setImageUrl(uploadedUserImage);
        }
        catch (error) {
            console.log(error);
        }
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
            const uploadUrl = UPLOAD_ENDPOINT;
            const authHeader = AUTH_HEADER;

            const data = new FormData();
            data.append('firstImageRef', img);
            data.append('clientId', 'FaceMorphQuiz')
            const response = await fetch(uploadUrl, {
                method: 'POST',
                headers: {
                    Authorization: authHeader,
                },
                body: data,
            });

            if (!response.ok) {
                setIsValid(false);
                throw response;
            }

            const resJson = await response.json();
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

export default UploadImageButton;

import React, { useState } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import HeaderText from './HeaderText';
import { uploadImage } from '../utils/api';

const UploadImageButton = ({ setImageUrl, setIsValid }) => {

    const uploadIcon = require('../../assets/icons/upload-img.png');
    const invalidIcon = require('../../assets/icons/invalid-img.png');
    const successIcon = require('../../assets/icons/success-img.png');

    const [iconSource, setIconSource] = useState(uploadIcon);

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

        try {

            if (selectedImage.base64) {
                userImage = await uploadImage(selectedImage.base64, true);
            } else if (selectedImage.uri) {
                userImage = await uploadImage(selectedImage.uri, true);
            }
            setIconSource(successIcon);
            saveImage(uri);
            setIsValid(true);
            return userImage;
        }
        catch (error) {
            console.log(error);
            setIsValid(false);
            setIconSource(invalidIcon);
            return null;
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
        <>
            <TouchableOpacity
                onPress={pickImage}
            >
                <Image source={iconSource} />
            </TouchableOpacity>
        </>
    );
};

export default UploadImageButton;

import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Button, Text, IconButton } from 'react-native';

export function ImageUploadButton({
    imageRef,
    setImageRef,
    handleSuccessfulImageUpload,
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleAlertIconPress = () => {
        setShowErrorMessage(!showErrorMessage);
    };

    const handleSuccess = () => {
        setIsSuccess(true)
    }

    const isEligibleForUpload = (imageRef) => {
        if (imageRef === null || (imageRef instanceof Error)) {
            return true
        } else {
            return false
        }
    }

    const handleFailure = (error) => {
        setIsFailure(true)
        // See if error json is available
        try {
            error.json().then((errorJson) => {
                console.log('Error json: ')
                console.log(errorJson)
                const errorObject = new Error(errorJson)
                setImageRef(errorObject)
            })
        } catch (e) {
            console.log('Error json not available')
            const errorObject = new Error(error.message)
            setImageRef(errorObject)
        }
    }

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
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

            if (isEligibleForUpload(imageRef)) {
                if (asset.base64) {
                    uploadImage(asset.base64);
                } else if (asset.uri) {
                    uploadImage(asset.uri);
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    const uploadImage = async (img) => {
        const data = new FormData()
        data.append('firstImageRef', img)

        setIsLoading(true)
        setIsSuccess(false)
        setIsFailure(false)

        fetch(
            'https://pyaar.ai/morph/upload', {
            method: 'POST',
            headers: {
                Authorization: 'ImageMorpherV1'
            },
            body: data
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
                setIsLoading(false)
                setImageRef(resJson)
                handleSuccess()
                handleSuccessfulImageUpload()
                return resJson.data
            })
            .catch((error) => {
                console.log('Image upload failed')
                console.log(JSON.stringify(error))
                setIsLoading(false)
                handleFailure(error)
            })
    }

    if (isLoading) {
        return (
            <Button
                icon="face-recognition"
                disabled
                loading
            >
                Loading..
            </Button>
        )
    }

    if (isSuccess && imageRef && !(imageRef instanceof Error)) {
        return (
            <Button
                icon="face-recognition"
                labelStyle={styles.btnSize}
                // Use a green color to indicate success that contrasts well with the background color
                color="#00b894"
            >
            </Button>
        )
    }
    if (isFailure) {
        return (
            <View>
                <Button icon="face-recognition" labelStyle={styles.btnSize} color="red" onPress={pickImage} ></Button>
                {(
                    <View style={styles.errorMessageContainer}>
                        <IconButton icon="alert-circle" color="#721c24" size={20} onPress={handleAlertIconPress} />
                        <View style={styles.messageContainer}>
                            <Text style={styles.errorMessage}>Error: Image is not compatible</Text>
                            <Text style={styles.errorMessage}>Please ensure a face is visible</Text>
                            {showErrorMessage && imageRef && <Text style={styles.errorMessage}>{imageRef.message}</Text>}
                        </View>
                    </View>
                )}
            </View>
        );
    }

    return (
        <Button
            icon="face-recognition"
            style={styles.btnContainer}
            labelStyle={styles.btnSize}
            color="#e5a823"
            onPress={pickImage}
        />
    )
}

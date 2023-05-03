import React, { useState } from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploadButton({ imageRef, setImageRef }) {

    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isFailure, setIsFailure] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleAlertIconPress = () => {
        setShowErrorMessage(!showErrorMessage);
    };

    const handleSuccess = () => {
        setIsSuccess(true)
        setIsFailure(false)
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

    const isEligibleForUpload = (imageRef) => {
        if (imageRef === null || (imageRef instanceof Error)) {
            return true
        } else {
            return false
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
                console.log('res : ' + res);
                if (!res.ok) {
                    console.log('not ok');
                    throw res
                }
                return res.json()
            })
            .then(resJson => {
                console.log('resJson', resJson);
                console.log('Image upload was successful')
                // On success, hide the loading spinner
                setIsLoading(false)
                setImageURI(resJson);
                handleSuccess()
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
            <View style={styles.container}>
                <Text>Uploading image...</Text>
            </View>
        )
    }

    if (isSuccess && imageRef && !(imageRef instanceof Error)) {
        return (
            <View style={styles.container}>
                <Text>Success</Text>
            </View>
        )
    }

    if (isFailure) {
        return (
            <View style={styles.container}>
                <Text>Failure</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Button
                title="Upload Image"
                onPress={() => {
                    pickImage()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
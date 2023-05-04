import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import TomCruiseImg from '../../assets/images/tom-cruise.jpeg';


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
                console.log('uri' + uri)

                let image1 = null;
                let image2 = null;

                if (asset.base64) {
                    image1 = await uploadImage(asset.base64, true)
                }
                else if (asset.uri) {
                    image1 = await uploadImage(asset.uri, true)
                }

                saveImage(uri);

                const tomCruiseAsset = Asset.fromModule(TomCruiseImg);
                await tomCruiseAsset.downloadAsync();
                const tomCruiseUri = tomCruiseAsset.localUri;
                const tomCruiseBase64 = await FileSystem.readAsStringAsync(tomCruiseUri, { encoding: FileSystem.EncodingType.Base64 });
                image2 = await uploadImage(`data:image/jpeg;base64,${tomCruiseBase64}`, false);
                navigation.navigate('ImageView', { image1: image1, image2: image2 });
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

    const uploadImage = async (img, isFirstImg) => {
        const data = new FormData()
        data.append('firstImageRef', img)
        return fetch(
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
                console.log('res json ' + resJson);
                setIsValid(true);
                return resJson;
            })
            .catch((error) => {
                console.log('Image upload failed')
                if (isFirstImg) {
                    console.log('your image failed');
                }
                else {
                    console.log('tom cruise image failed');
                }
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
        backgroundColor: '#222',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

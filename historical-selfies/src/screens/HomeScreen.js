import React, { useState } from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen({ navigation }) {

    const [image, setImage] = useState(null);

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
                setImage(uri);
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
            navigation.navigate('ImageView', { imagePath: newPath });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Select an Image" onPress={pickImage} />
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

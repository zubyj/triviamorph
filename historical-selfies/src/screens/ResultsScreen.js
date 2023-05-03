import React, { useState, useEffect } from 'react';
import { View, Image, Button, StyleSheet, Text, ActivityIndicator } from 'react-native';

async function checkImageUrl(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export default function ResultsScreen({ navigation }) {
    const morphUri = navigation.getParam('morphUri', null);
    const [loading, setLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        if (morphUri) {
            checkImageUrl(morphUri).then((exists) => {
                if (!exists) {
                    setImageError(true);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [morphUri]);

    return (
        <View style={styles.container}>
            {morphUri && !imageError && (
                <Image style={styles.image} source={{ uri: morphUri }} resizeMode="contain" />
            )}
            {imageError && <Text style={styles.errorText}>Error: The image URL is not accessible.</Text>}
            {loading && <ActivityIndicator size="large" />}
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '80%',
        resizeMode: 'contain',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});

import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';

export default function ImageViewScreen({ navigation }) {
    const imagePath = navigation.getParam('imagePath', null);

    return (
        <View style={styles.container}>
            {imagePath && (
                <Image source={{ uri: imagePath }} style={styles.image} resizeMode="contain" />
            )}
            <Button title="Home" onPress={() => navigation.navigate('Home')} />
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
    image: {
        width: '100%',
        height: '70%',
    },
});

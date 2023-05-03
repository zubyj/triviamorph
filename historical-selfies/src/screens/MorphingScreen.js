import React from 'react';
import { StyleSheet, View, Image, Button } from 'react-native';
import { MorphButton } from '../MorphButton';

import tomCruise from '../../assets/tom-cruise.webp';

export default function MorphingScreen({ navigation }) {
    const imagePath = navigation.getParam('imagePath', null);

    return (
        <View style={styles.container}>
            {imagePath && (
                <Image source={{ uri: imagePath }} style={styles.image} resizeMode="contain" />
            )}
            <MorphButton firstImageRef={tomCruise} secondImageRef={{ uri: imagePath }} />
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

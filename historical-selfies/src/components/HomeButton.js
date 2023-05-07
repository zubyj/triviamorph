import React from 'react';
import { Button, Text } from 'react-native';

const HomeButton = ({ navigation }) => {
    return (
        <Button
            mode="contained"
            icon="home"
            onPress={() => navigation.navigate('ImageUpload')}
            style={styles.button}
        >
            <Text style={styles.text}>Home</Text>
        </Button>
    );
};

export default HomeButton;
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function HeaderText({ text }) {
    return (
        <Text style={styles.headerText}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        color: '#fff',
        marginTop: 15,
        marginBottom: 15,
    },
});

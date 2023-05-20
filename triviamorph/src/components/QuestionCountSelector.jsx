import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';

const QuestionCountSelector = ({ numQuestions, setNumQuestions }) => {

    const [selected, setSelected] = useState(numQuestions);

    const handleButtonClick = (count) => {
        setSelected(count);
        setNumQuestions(count);
    }

    return (
        <View style={styles.questionSelector}>
            <Text style={styles.questionsTxt}>Questions</Text>
            <View style={styles.buttons}>
                <Button
                    mode={selected === 1 ? "contained" : "outlined"}
                    textColor='#fff'
                    onPress={() => handleButtonClick(1)}
                    style={styles.button}
                >
                    1
                </Button>
                <Button
                    mode={selected === 3 ? "contained" : "outlined"}
                    textColor='#fff'
                    onPress={() => handleButtonClick(3)}
                    style={styles.button}
                >
                    3
                </Button>
                <Button
                    mode={selected === 5 ? "contained" : "outlined"}
                    textColor='#fff'
                    onPress={() => handleButtonClick(5)}
                    style={styles.button}
                >
                    5
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    questionSelector: {
        width: '100%',
        marginTop: 40,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    questionsTxt: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15,
    }
});

export default QuestionCountSelector;

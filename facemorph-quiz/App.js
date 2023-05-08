import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

// local imports
import UploadImageButton from './src/components/UploadImageButton';
import QuizOptions from './src/components/QuizOptions';
import LoadingScreen from './src/screens/LoadingScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import { generateOptions, getMorph } from './src/utils/utils';

export default function App() {

  const NUM_QUESTIONS = 2;

  const [imageUrl, setImageUrl] = useState('');
  const [morphUri, setMorphUri] = useState('');
  const [randomImage, setRandomImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const [questionCount, setQuestionCount] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (morphUri && randomImage) {
      const optionsArray = generateOptions(randomImage);
      setOptions(optionsArray);
    }
  }, [morphUri, randomImage]);

  useEffect(() => {
    if (questionCount === 0 && imageUrl) {
      getMorph({ setRandomImage, setMorphUri, setIsLoading, imageUrl });
    }
  }, [questionCount, imageUrl]);

  const handleButtonClick = (selectedOption) => {
    if (selectedOption === randomImage.value) {
      setScore(score + 1);
      setIsCorrect(true);
    }

    if (questionCount < NUM_QUESTIONS) {
      setTimeout(() => {
        setQuestionCount(questionCount + 1);
        setIsCorrect(false);
        setMorphUri(''); // Reset morphUri to move to the next question
        getMorph({ setRandomImage, setMorphUri, setIsLoading, imageUrl });
      }, 2000); // Set a delay before moving to the next question
    }
  };

  const resetGameState = () => {
    setImageUrl('');
    setMorphUri('');
    setRandomImage('');
    setIsCorrect(false);
    setIsLoading(false);
    setQuestionCount(0);
    setScore(0);
    setOptions([]);
  }

  const getScreen = () => {
    if (questionCount >= NUM_QUESTIONS) {
      return (
        <ResultsScreen score={score} resetGameState={resetGameState} />
      )
    }

    if (isLoading) {
      return (
        <LoadingScreen text={`Creating Question ${questionCount + 1} ...`} />
      )
    }

    if (morphUri && options.length > 0) {
      return (
        <>
          <Text style={styles.headerText}>Question {questionCount + 1} / {NUM_QUESTIONS}</Text>
          <Text style={styles.headerText}>Score: {score}</Text>
          <Image style={styles.image} source={{ uri: morphUri }} />
          <QuizOptions options={options} handleButtonClick={handleButtonClick} isCorrect={isCorrect} randomImageValue={randomImage.value} />
        </>
      )
    }

    if (!imageUrl) {
      return (
        <>
          <Text style={styles.headerText}>Upload a face to start</Text>
          <UploadImageButton
            setImageUrl={setImageUrl}
          />
        </>
      )
    }
  }

  return (
    <View style={styles.container}>
      {getScreen()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontFamiy: 'sans-serif',
  },
  image: {
    width: 400,
    height: 300,
    maxWidth: '80%',
    borderWidth: 10,
    borderColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  button: {
    padding: 15,
  },
  headerText: {
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    marginBottom: 30,
  },
});
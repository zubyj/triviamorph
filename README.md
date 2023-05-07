# FaceMorph Quiz Game

FaceMorph Quiz is a fun and interactive mobile game built using React Native. In this game, players upload their image, which gets morphed with a random image of a famous person. The objective of the game is to identify the famous person in the resulting morphed image.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Game Components](#game-components)
4. [Credits](#credits)

## Installation

To get started with this project, follow these steps:

1. Clone the repository:
```
git clone https://github.com/zubyj/facemorph-quiz.git
```

2. Install the required dependencies:
```
cd facemorph-quiz
npm install
```

3. Run the project on your preferred platform
```
npm run ios
```
or
```
npm run android
```


## Usage

1. On the initial screen, players can upload their image using the `UploadImageButton`.
2. Once the image is uploaded, click the play button to begin morphing the images.
3. The game will generate a morphed image and display it along with multiple-choice options.
4. Select the correct option to win the game!

## Game Components

- `QuizScreen`: This is the main game screen that handles the logic of the game and displays morphed images and multiple-choice options.
- `UploadImageButton`: This component allows users to upload their image.
- `UploadRandomImage`: This file includes the functions for uploading a random image of a famous person and returning the image URL and the random face object.

## Credits

This game uses the FaceMorph API for morphing images: `https://pyaar.ai/morph`.

Icons, images, and other resources are from various open sources.

If you have any questions or suggestions, feel free to open an issue or submit a pull request.



# FaceMorph Quiz Game

FaceMorph Quiz blends history and fun in a React Native mobile game. Upload a selfie, morph it with a historical figure, and guess who it is!

## Table of Contents

1. [Installation](#installation)
2. [How to Play](#how-to-play)
3. [Game Components](#game-components)
4. [Credits](#credits)

## Installation

1. Clone the repo: `git clone https://github.com/zubyj/facemorph-quiz.git`.
2. Move into directory: `cd facemorph-quiz`.
3. Install dependencies: `npm install`.
4. Add .env in the root with API endpoints: `MORPH_ENDPOINT=`, `UPLOAD_ENDPOINT=`, `AUTH_HEADER=`.
5. Run: `npm run ios` or `npm run android`.

## How to Play

1. Upload a selfie with `UploadImageButton`.
2. Start the game to morph the images.
3. Guess the famous figure in the resulting image!

## Game Components

- `QuizScreen`: Handles the game logic, displays images and options.
- `UploadImageButton`: Uploads user's image.
- `UploadRandomImage`: Uploads random famous image, returns image URL and face object.

## Credits

Morphing is done by our API. Icons and images are from open sources. For issues or suggestions, open an issue or submit a pull request.

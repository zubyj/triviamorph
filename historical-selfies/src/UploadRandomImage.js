import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import people from '../assets/people.json';

const MORPH_ENDPOINT = 'https://pyaar.ai/morph/upload';
const AUTH_HEADER = 'ImageMorpherV1'

const peopleImages = {
    tomCruise: require('../assets/images/people/tom-cruise.jpeg'),
    nikolaTesla: require('../assets/images/people/nikola-tesla.webp'),
    abrahamLincoln: require('../assets/images/people/abraham-lincoln.jpeg'),
    tobeyMaguire: require('../assets/images/people/tobey-maguire.jpeg'),
};

// Gets a random image, uploads to server, and returns the image url
const getRandomImage = async () => {
    const randomIndex = Math.floor(Math.random() * people.length);
    const randomFace = people[randomIndex]; // returns random face object from faces.json
    const randomFaceKey = randomFace.img_require;

    const randomFaceAsset = Asset.fromModule(peopleImages[randomFaceKey]);
    await randomFaceAsset.downloadAsync();

    const base64Img = await FileSystem.readAsStringAsync(randomFaceAsset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
    });
    const randomImageUrl = await uploadImage(`data:image/jpeg;base64,${base64Img}`);
    const randomImageData = randomFace;
    return {
        randomImageUrl,
        randomImageData,
    }
};

const uploadImage = async (img) => {
    try {
        const data = new FormData();
        data.append('firstImageRef', img);

        const response = await fetch(MORPH_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: AUTH_HEADER,
            },
            body: data,
        });

        if (!response.ok) {
            throw new Error('Random image upload failed');
        }

        const resJson = await response.json();
        console.log('Image upload success');
        return resJson;
    } catch (error) {
        console.error('Random img upload failed', error);
    }
};

export { getRandomImage };

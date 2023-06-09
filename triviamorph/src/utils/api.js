import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import people from '../../assets/people.json';

const UPLOAD_ENDPOINT = 'https://pyaar.ai/morph/upload';
const MORPH_ENDPOINT = 'https://pyaar.ai/morph';
const AUTH_HEADER = 'ImageMorpherV1';

const importAll = (r) => {
    return r.keys().map((fileName) => ({
        slug: fileName.replace(/(.*\/)|(\.jpeg$)|(\.webp$)|(\.png$)/g, '').replace(/-/g, ''),
        module: r(fileName),
    }));
};

const images = importAll(require.context('../../assets/images/people', false, /\.(jpeg|webp|png)$/));

const peopleImages = images.reduce((acc, curr) => {
    acc[curr.slug] = curr.module;
    return acc;
}, {});

// Gets a random image, uploads to server, and returns the image url
const getRandomImage = async () => {
    const randomIndex = Math.floor(Math.random() * people.length);
    const randomFace = people[randomIndex];
    const randomFaceKey = randomFace.key.toLowerCase();

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
    };
};

const uploadImage = async (img) => {
    try {
        const data = new FormData();
        data.append('firstImageRef', img);
        data.append('clientId', 'FaceMorphQuiz');

        const response = await fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: AUTH_HEADER,
            },
            body: data,
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            console.log('Image upload failed with response:', errorResponse);
            throw new Error('Random image upload failed');
        }

        const resJson = await response.json();
        return resJson;
    } catch (error) {
        console.error('Random img upload failed', error);
        throw error; // Rethrow the error to be caught by the caller
    }
};



const generateOptions = (randomImage) => {
    let numOptions = 3;
    const related = randomImage.related;
    const shuffledRelated = related.sort(() => Math.random() - 0.5);
    const otherOptions = shuffledRelated.slice(0, numOptions).map((value) => {
        const person = people.find((person) => person.value === value);
        return { name: person.name, value: person.value };
    });
    const allOptions = [...otherOptions, { name: randomImage.name, value: randomImage.value }];
    const shuffledOptions = allOptions.sort(() => Math.random() - 0.5);
    return shuffledOptions;
};

const getMorph = async ({ setRandomImage, setMorphUri, setIsLoading, imageUrl }) => {
    const { randomImageUrl, randomImageData } = await getRandomImage();
    setRandomImage(randomImageData);

    try {
        setIsLoading(true);

        const data = new FormData();
        data.append("firstImageRef", imageUrl);
        data.append("secondImageRef", randomImageUrl);
        data.append("isAsync", "True");
        data.append("isSequence", "False");
        data.append("clientID", "FaceMorphQuiz");

        const response = await fetch(MORPH_ENDPOINT, {
            method: "POST",
            headers: {
                Authorization: AUTH_HEADER,
            },
            body: data,
        });

        if (response.ok) {
            const resJson = await response.json();
            const uri = resJson.morphUri;

            while (!(await checkImageAvailability(uri))) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }
            console.log(uri);
            setMorphUri(uri);
            setIsLoading(false);
            return;
        } else {
            setIsLoading(false);
            throw new Error(response);
        }
    } catch (error) {
        setIsLoading(false);
        console.error(error);
        return error.message;
    }
}

async function checkImageAvailability(uri) {
    return Image.prefetch(uri)
        .then(() => true)
        .catch(() => false);
}

export { getRandomImage, generateOptions, checkImageAvailability, getMorph, uploadImage };

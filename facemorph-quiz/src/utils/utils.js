import { Image } from 'react-native';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { UPLOAD_ENDPOINT, MORPH_ENDPOINT, AUTH_HEADER } from '@env';

import people from '../../assets/people.json';

const peopleImages = {
    tomCruise: require('../../assets/images/people/tom-cruise.jpeg'),
    nikolaTesla: require('../../assets/images/people/nikola-tesla.webp'),
    abrahamLincoln: require('../../assets/images/people/abraham-lincoln.jpeg'),
    tobeyMaguire: require('../../assets/images/people/tobey-maguire.jpeg'),
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

        const response = await fetch(UPLOAD_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: AUTH_HEADER,
            },
            body: data,
        });

        if (!response.ok) {
            await console.log(response.json());
            throw new Error('Random image upload failed');
        }

        const resJson = await response.json();
        console.log('Image upload success');
        return resJson;
    } catch (error) {
        console.error('Random img upload failed', error);
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
    }
}

async function checkImageAvailability(uri) {
    return Image.prefetch(uri)
        .then(() => true)
        .catch(() => false);
}

export { getRandomImage, generateOptions, checkImageAvailability, getMorph };

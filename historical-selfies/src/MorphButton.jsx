import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export function MorphButton({ firstImageRef, secondImageRef }) {

    const [morphResponse, setMorphResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    async function getMorph(firstImageRef, secondImageRef) {
        if (!firstImageRef || !secondImageRef) {
            return;
        }

        try {
            const data = new FormData();
            data.append("firstImageRef", firstImageRef);
            data.append("secondImageRef", secondImageRef);
            data.append("isAsync", "True");
            data.append("isSequence", "False");

            setIsLoading(true);
            setIsFailure(false);

            const response = await fetch('https://pyaar.ai/morph', {
                method: "POST",
                headers: {
                    Authorization: "ImageMorpherV1",
                },
                body: data,
            });

            if (response.ok) {
                const resJson = await response.json()
                console.log('resJson', resJson);
                setIsLoading(false);
                setMorphResponse(resJson.morphUri);
                // navigation.navigate('ResultsScreen', { morphUri: resJson.morphUri });
            } else {
                console.error(response);
                setIsFailure(true);
                throw new Error(response);
            }

        } catch (error) {
            setIsFailure(true);
            console.error(error);
            setIsLoading(false);
        }
    }

    const getMorphButton = () => {
        if (isLoading) {
            return (
                <View>
                    <Text>
                        Loading ...
                    </Text>
                </View>
            )
        }



        if (!firstImageRef || !secondImageRef) {
            return (
                <Text>
                    Both images are invalid
                </Text>
            )
        }

        if (!firstImageRef) {
            return (
                <Text>
                    First image is invalid
                </Text>
            )
        }
        if (!secondImageRef) {
            return (
                <Text>
                    Second image is invalid
                </Text>
            )
        }
        if (isFailure) {
            return (
                <View>
                    <Text>
                        Failed to get morph
                    </Text>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => getMorph(firstImageRef, secondImageRef)}>
                <Text>Get Morph {morphResponse}</Text>

            </TouchableOpacity>
        )
    }

    const morphButton = getMorphButton();
    return (
        morphButton
    )
}

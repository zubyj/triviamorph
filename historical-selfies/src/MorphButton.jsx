import React, { useState } from 'react';

export function MorphButton({ firstImageRef, secondImageRef }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);

    async function getMorph(firstImageRef, secondImageRef) {
        if (!firstImageRef || !secondImageRef) {
            return;
        }

        try {
            const data = new FormData(); n
            data.append("firstImageRef", firstImageRef);
            data.append("secondImageRef", secondImageRef);
            data.append("isAsync", "True");
            data.append("isSequence", "True");
            data.append("stepSize", "10");

            setIsLoading(true);
            setIsSuccess(false);
            setIsFailure(false);

            const response = await fetch('https://pyaar.ai/morph', {
                method: "POST",
                headers: {
                    Authorization: "ImageMorpherV1",
                },
                body: data,
            });

            if (response.ok) {
                const resJson = await response.json();
                console.log('resJson', resJson);
                setIsLoading(false);
                setIsSuccess(true);
                setIsFailure(false);

                return resJson.data;
            } else {
                throw new Error(response);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
            setIsSuccess(false);
            setIsFailure(true);
        }
    }

    return (
        <button onClick={() => getMorph(firstImageRef, secondImageRef)}>
            Morph
        </button>
    );
}

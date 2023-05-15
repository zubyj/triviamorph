export function generateMorphOptions(morph) {
    const correctOptions = morph.compositeImage.components.map(component => ({ name: component.name, slug: component.slug }));
    const allWrongOptions = [...morph.related];
    const wrongOptions = [];

    while (wrongOptions.length < 2) {
        const randomIndex = Math.floor(Math.random() * allWrongOptions.length);
        const selectedOption = allWrongOptions[randomIndex];
        wrongOptions.push({ name: selectedOption, slug: selectedOption.replace(' ', '-').toLowerCase() });
        allWrongOptions.splice(randomIndex, 1);
    }

    const options = correctOptions.concat(wrongOptions);
    return options.sort(() => 0.5 - Math.random()); // Shuffling the options
}

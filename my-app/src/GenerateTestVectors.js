const generateTestVectors = (inputConditions) => {
    let testVectors = [];

    const generateForCondition = (condition, values) => {
        const { Min, Max, TimeBetweenPoints } = condition;
        for (let i = Min; i <= Max; i += (TimeBetweenPoints > 0 ? TimeBetweenPoints : 1)) {
            values.push(i);
        }
    };

    for (let i = 0; i < 2; i++) {
        let values = [];
        generateForCondition(inputConditions[i], values);
        testVectors.push({
            Parameter: inputConditions[i].Parameter,
            Values: values
        });
    }

    let allCombinations = [];

    const generateCombinations = (currentIndex, currentCombination) => {
        if (currentIndex === testVectors.length) {
            allCombinations.push(currentCombination);
            return;
        }

        for (let value of testVectors[currentIndex].Values) {
            generateCombinations(currentIndex + 1, [...currentCombination, { Parameter: testVectors[currentIndex].Parameter, Value: value }]);
        }
    };

    generateCombinations(0, []);

    return allCombinations;
};

export default generateTestVectors;

// Various Formulas for calculating/converting between different units

const stepsToMiles = (steps: number, strideInFeet: number) => {
	const miles = steps * strideInFeet;

	return miles / 5280;
};

export { stepsToMiles };

export const required = (value) => (value ? undefined && 'Enter text..' : "Required");

export const mustBeNumber = (value) => (isNaN(value) ? "Must be a number" : undefined);


export const minValue = min => value => {
	if (!value) {
		return undefined
	} else
		if (value.length < min) {
			return `Should be greater than ${min}`
		} return undefined;
}

//  {
// 	isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`;
// }

export const maxLengthCreator = (maxLength) => (value) => {
	if (!value) {
		return undefined
	} else if (value.length > maxLength) {
		return `Max length is ${maxLength} symbols`;
	} return undefined;
}
export const convertInTag = str => {
	if (!str) {
		return undefined
	} else if (str[0] !== "#") {
		return 'Begin from "#"'
	} return undefined;
}

export const hasGaps = str => {

	if (!str) {
		return undefined
	} else if (str.includes(' ')) {
		return 'There are gaps'
	} return undefined;
}

export const composeValidators = (...validators) => (value) =>
	validators.reduce((error, validator) => error || validator(value), undefined);



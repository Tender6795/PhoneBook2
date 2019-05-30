import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateContactInput(data) {
	let errors = {};

	if (Validator.isEmpty(data.lastName)) {
		errors.lastName = 'This field is required';
	}
	if (Validator.isEmpty(data.firstName)) {
		errors.firstName = 'This field is required';
	}
	if (Validator.isEmpty(data.phone)) {
		errors.phone = 'This field is required';
	}
	if (Validator.isEmpty(data.email)) {
		errors.email = 'This field is required';
	}
	else if (!Validator.isEmail(data.email)) {
		errors.email = 'Email is invalid';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}
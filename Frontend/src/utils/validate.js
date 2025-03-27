import { isValidEmail, isValidPassword, isValidPhone } from './helper';
import _ from 'lodash';

export const isValidate = (data, type, errors) => {
    let error = false;
    let dataError = _.cloneDeep(errors);

    switch (type) {
        case 'name':
            if (data.name.length === 0) {
                dataError.name = 'Please complete this required field!';
                error = true;
            } else if (data.name.length > 200) {
                dataError.name = 'Maximum number of characters allowed: 200';
                error = true;
            } else {
                dataError.name = '';
            }
            break;
        case 'email':
            if (data.email.length === 0) {
                dataError.email = 'Please complete this required field!';
                error = true;
            } else if (!isValidEmail(data.email)) {
                dataError.email = 'Invalid email format';
                error = true;
            } else if (data.email.length > 200) {
                dataError.email = 'Maximum number of characters allowed: 200';
                error = true;
            } else {
                dataError.email = '';
            }
            break;
        case 'phone':
            if (data.phone.length === 0) {
                dataError.phone = 'Please complete this required field!';
                error = true;
            } else if (!isValidPhone(data.phone)) {
                dataError.phone = 'Please input 10-digit phone number';
                error = true;
            } else if (data.phone.length > 200) {
                dataError.phone = 'Maximum number of characters allowed: 200';
                error = true;
            } else {
                dataError.phone = '';
            }
            break;
        case 'address':
            if (data.address.length === 0) {
                dataError.address = 'Please complete this required field!';
                error = true;
            } else if (data.address.length > 500) {
                dataError.address = 'Maximum number of characters allowed: 500';
                error = true;
            } else {
                dataError.address = '';
            }
            break;
        case 'currentPassword':
            if (data.currentPassword.length === 0) {
                dataError.currentPassword = 'Please complete this required field!';
                error = true;
            } else if (!isValidPassword(data.currentPassword)) {
                dataError.currentPassword =
                    'Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters.';
                error = true;
            } else {
                dataError.currentPassword = '';
            }
            break;
        case 'password':
            if (data.password.length === 0) {
                dataError.password = 'Please complete this required field!';
                error = true;
            } else if (!isValidPassword(data.password)) {
                dataError.password =
                    'Password must be at least 6 characters and at most 50 characters, including uppercase and lowercase letters, numbers, and special characters.';
                error = true;
            } else {
                dataError.password = '';
            }
            break;
        case 'confirmPassword':
            if (data.confirmPassword.length === 0) {
                dataError.confirmPassword = 'Please complete this required field!';
                error = true;
            } else if (data.password && data.confirmPassword !== data.password) {
                dataError.confirmPassword = 'Passwords do not match. Please try again.';
                error = true;
            } else {
                dataError.confirmPassword = '';
            }
            break;
    }

    return {
        isError: error,
        error: dataError,
    };
};

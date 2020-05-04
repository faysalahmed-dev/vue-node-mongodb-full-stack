/* eslint-disable no-case-declarations */
import { isEmail, isLength, isEmpty } from 'validator';
import { passwordMaxLength, passwordMinLength } from '../../server/utils/constains';

const setErrorObj = (status, message) => {
    return { status, message: status ? message : '' };
};

export const validateStatus = (name, data) => {
    if (isEmpty(data[name].trim())) return setErrorObj(true, name + ' is required');
    switch (name) {
        case 'email':
            return setErrorObj(!isEmail(data.email), 'invalid email address');
        case 'password':
            const status = !isLength(data.password, {
                min: passwordMinLength,
                max: passwordMaxLength
            });
            return setErrorObj(
                status,
                `password must ${passwordMinLength} to ${passwordMaxLength} char`
            );
        case 'confirmPassword':
            return setErrorObj(data.password !== data.confirmPassword, 'password does not match');
        default:
            return setErrorObj(false);
    }
};

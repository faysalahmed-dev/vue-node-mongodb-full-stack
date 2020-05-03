/* eslint-disable no-case-declarations */
import { isEmail, isLength, isEmpty } from 'validator';

const setErrorObj = (status, message) => {
    return { status, message: status ? message : '' };
};

export const validateStatus = (name, data) => {
    if (isEmpty(data[name].trim()))
        return setErrorObj(true, name + ' is required');
    switch (name) {
        case 'email':
            return setErrorObj(!isEmail(data.email), 'invalid email address');
        case 'password':
            const status = !isLength(data.password, { min: 6, max: 72 });
            return setErrorObj(status, 'password must 6 to 72 char');
        case 'confirmPassword':
            return setErrorObj(
                data.password !== data.confirmPassword,
                'password does not match'
            );
        default:
            return setErrorObj(false);
    }
};

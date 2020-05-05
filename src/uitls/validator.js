import { isEmpty, isLength, isEmail } from 'validator';
import {
    nameLength,
    usernameLength,
    passwordMinLength,
    passwordMaxLength
} from '../../server/utils/constains';

export const setErrorObj = (status, message) => {
    return { status, message: status ? message : '' };
};

const validate = {
    nameValidator(value) {
        // check name is empty
        if (isEmpty(value)) {
            return setErrorObj(true, 'name field required');
            // is length is less then nameLength
        } else if (!isLength(value, { min: nameLength })) {
            return setErrorObj(true, 'name too short');
            // name only contians letters
        } else if (!/^[a-zA-Z ]+$/.test(value)) {
            return setErrorObj(true, 'name only contains alpha value');
        }
        return setErrorObj(false);
    },
    usernameValidator(value) {
        // check username is empty
        if (isEmpty(value)) {
            return setErrorObj(true, 'User Name field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: usernameLength })) {
            return setErrorObj(true, 'User Name Too Short');
        }
        return setErrorObj(false);
    },
    emailValidator(value) {
        if (isEmpty(value)) {
            return setErrorObj(true, 'Email Field Required');
            // is length is less then usernameLength
        } else if (!isEmail(value)) {
            return setErrorObj(true, 'Email Is Invalid');
        }
        return setErrorObj(false);
    },
    passwordValidator(value) {
        if (isEmpty(value)) {
            return setErrorObj(true, 'password field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: passwordMinLength, max: passwordMaxLength })) {
            return setErrorObj(
                true,
                `password should be between ${passwordMinLength} to ${passwordMaxLength}`
            );
        }
        return setErrorObj(false);
    },
    confirmPasswordValidator(value, password) {
        if (isEmpty(value)) {
            return setErrorObj(true, 'confirm password field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: passwordMinLength, max: passwordMaxLength })) {
            return setErrorObj(
                true,
                `confirm password should be between ${passwordMinLength} to ${passwordMaxLength}`
            );
        }

        return setErrorObj(value !== password, `password does not match`);
    }
};

export default (name, data) => {
    switch (name) {
        case 'name':
            return validate.nameValidator(data.name);
        case 'username':
            return validate.usernameValidator(data.username);
        case 'email':
            return validate.emailValidator(data.email);
        case 'password':
            return validate.passwordValidator(data.password);
        case 'confirmPassword':
            return validate.confirmPasswordValidator(data.confirmPassword, data.password);
        default:
            return setErrorObj(false);
    }
};

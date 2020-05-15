import { isEmail, isLength, isEmpty } from 'validator';
import _ from 'lodash';
import {
    nameLength,
    usernameLength,
    passwordMinLength,
    passwordMaxLength,
    descriptionsMaxWords,
    descriptionsMinWords,
    shortInfoMaxWords,
    shortInfoMinWords
} from '../../server/utils/constains';

export const setErrorObj = (status, message) => {
    return { status, message: status ? message : '' };
};

const validate = {
    nameValidator(value) {
        // check name is empty
        if (isEmpty(value || '')) {
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
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'User Name field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: usernameLength })) {
            return setErrorObj(true, 'User Name Too Short');
        }
        return setErrorObj(false);
    },
    emailValidator(value) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'Email Field Required');
            // is length is less then usernameLength
        } else if (!isEmail(value)) {
            return setErrorObj(true, 'Email Is Invalid');
        }
        return setErrorObj(false);
    },
    passwordValidator(value) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'password field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: passwordMinLength, max: passwordMaxLength })) {
            return setErrorObj(
                true,
                `password must be between ${passwordMinLength} to ${passwordMaxLength}`
            );
        }
        return setErrorObj(false);
    },
    confirmPasswordValidator(value, password) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'confirm password field required');
            // is length is less then usernameLength
        } else if (!isLength(value, { min: passwordMinLength, max: passwordMaxLength })) {
            return setErrorObj(
                true,
                `confirm password must be between ${passwordMinLength} to ${passwordMaxLength}`
            );
        }

        return setErrorObj(value !== password, `password does not match`);
    },
    titleValidator(value) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'title field required');
        } else if (!isLength(value, { min: 10 })) {
            return setErrorObj(true, 'title too short');
        }
        return setErrorObj(false);
    },
    fieldValidator(value, name) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, name + ' field required');
        } else if (!isLength(value, { min: 2 })) {
            return setErrorObj(true, `${name} too short`);
        }
        return setErrorObj(false);
    },
    shortInfoValidator(value) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'Short Info field required');
        } else if (
            _.words(value).length < shortInfoMinWords ||
            _.words(value).length > shortInfoMaxWords
        ) {
            return setErrorObj(
                true,
                `Descriptions must be between ${shortInfoMinWords} to ${shortInfoMaxWords} words`
            );
        }
        return setErrorObj(false);
    },
    descriptionsValidator(value) {
        if (isEmpty(value || '')) {
            return setErrorObj(true, 'Descriptions field required');
        } else if (
            _.words(value).length < descriptionsMinWords ||
            _.words(value).length > descriptionsMaxWords
        ) {
            return setErrorObj(
                true,
                `Descriptions must be between ${descriptionsMinWords} to ${descriptionsMaxWords} words`
            );
        }
        return setErrorObj(false);
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
        case 'city':
        case 'address':
            return validate.fieldValidator(data[name], name);
        case 'title':
            return validate.titleValidator(data.title);
        case 'shortInfo':
            return validate.shortInfoValidator(data.shortInfo);
        case 'descriptions':
            return validate.descriptionsValidator(data.descriptions);
        default:
            return setErrorObj(false);
    }
};

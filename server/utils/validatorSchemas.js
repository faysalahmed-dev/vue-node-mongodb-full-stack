const {
    nameLength,
    passwordMaxLength,
    passwordMinLength,
    usernameLength
} = require('../utils/constains');

function fieldRequired(filedName) {
    return {
        errorMessage: filedName + ' required',
        negated: true
    };
}

module.exports = {
    email: {
        isEmpty: fieldRequired('email'),
        isEmail: {
            errorMessage: 'invalid email address'
        }
    },
    name: {
        isEmpty: fieldRequired('name'),
        isLength: {
            errorMessage: 'first name too short',
            options: { min: nameLength }
        },
        custom: {
            errorMessage: 'name only contains alpha value',
            options(value) {
                return /^[a-zA-Z ]+$/.test(value);
            }
        }
    },
    username: {
        isEmpty: fieldRequired('user name'),
        isLength: {
            errorMessage: 'user name too short',
            options: { min: usernameLength }
        }
    },
    password: {
        isEmpty: fieldRequired('password'),
        isLength: {
            errorMessage: `password should be between ${passwordMinLength} to ${passwordMaxLength}`,
            options: { min: passwordMinLength, max: passwordMaxLength }
        }
    },
    confirmPassword: {
        isEmpty: fieldRequired('confirm password'),
        isLength: {
            errorMessage: `confirm password should be between ${passwordMinLength} to ${passwordMaxLength}`,
            options: { min: passwordMinLength, max: passwordMaxLength }
        },
        custom: {
            errorMessage: 'password does not match',
            options: (value, { req }) => value === req.body.password
        }
    }
};

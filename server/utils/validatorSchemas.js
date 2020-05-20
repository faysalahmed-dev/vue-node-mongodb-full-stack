const {
    nameLength,
    passwordMaxLength,
    passwordMinLength,
    usernameLength,
    titleMaxWord,
    titleMinWord,
    descriptionsMaxWords,
    descriptionsMinWords,
    shortInfoMaxWords,
    shortInfoMinWords,
    postTextMaxWord
} = require('../utils/constains');
const _ = require('lodash');
const moment = require('moment');
const {
    Types: { ObjectId }
} = require('mongoose');
const countyData = require('../utils/country-data');

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
    location: {
        city: {
            isEmpty: fieldRequired('meetup city'),
            isLength: {
                errorMessage: 'city name too short',
                options: { min: 2 }
            }
        },
        country: {
            isEmpty: fieldRequired('meetup country'),
            isLength: {
                errorMessage: 'county name too short',
                options: { min: 2 }
            }
        },
        isoCode: {
            isEmpty: fieldRequired('meetup iso code'),
            isLength: {
                errorMessage: 'county iso code too short',
                options: { min: 2 }
            },
            custom: {
                errorMessage: `invalid county iso code`,
                options(value) {
                    // false error
                    return !!countyData[value.toUpperCase()];
                }
            }
        },
        address: {
            isEmpty: fieldRequired('meetup address')
        }
    },
    title: {
        isEmpty: fieldRequired('title'),
        custom: {
            errorMessage: `title must be between ${titleMinWord} to ${titleMaxWord} words`,
            options(value) {
                const words = _.words(value).length;
                // false error
                return words >= titleMinWord && words <= titleMaxWord;
            }
        }
    },
    startDate: {
        isEmpty: fieldRequired('meetup start date'),
        custom: {
            errorMessage: `invalid date`,
            options(value) {
                // check date is valid formate
                if (!moment(new Date(value), true).isValid()) {
                    this.message =
                        'invalid date format. time format should be "YYYY-MM-DD" or "LLLL"';
                    return false;
                }
                // check date is passed
                if (moment().isAfter(new Date(value))) {
                    this.message = 'meetup date should not be expired';
                    return false;
                }
                return true;
            }
        }
    },
    timeFrom: {
        isEmpty: fieldRequired('meetup start time'),
        custom: {
            errorMessage: 'invalid time format. time should be "HH:MM AM/PM"',
            options(value) {
                return moment(value, 'LT', true).isValid();
            }
        }
    },
    timeTo: {
        isEmpty: fieldRequired('meetup end time'),
        custom: {
            errorMessage: 'invalid time format. time should be "HH:MM AM/PM"',
            options(value) {
                if (!moment(value, 'LT', true).isValid()) {
                    this.message = 'invalid time format. time should be "HH:MM AM/PM"';
                    return false;
                }
                // check time to atlest 10 min after time from
                return true;
            }
        }
    },
    category: {
        isEmpty: fieldRequired('meetup category'),
        custom: {
            errorMessage: 'invalid category id',
            options(value) {
                return ObjectId.isValid(value);
            }
        }
    },
    shortInfo: {
        isEmpty: fieldRequired('short Info'),
        custom: {
            errorMessage: `shortInfo must be between ${shortInfoMinWords} to ${shortInfoMaxWords} words`,
            options(value) {
                const words = _.words(value).length;
                return words >= shortInfoMinWords && words <= shortInfoMaxWords;
            }
        }
    },
    descriptions: {
        isEmpty: fieldRequired('descriptions'),
        custom: {
            errorMessage: `descriptions must be between ${descriptionsMinWords} to ${descriptionsMaxWords} words`,
            options(value) {
                const words = _.words(value).length;
                return words >= descriptionsMinWords && words <= descriptionsMaxWords;
            }
        }
    },
    text: {
        isEmpty: fieldRequired('post text'),
        custom: {
            errorMessage: `too long! post text max word count ${postTextMaxWord}`,
            options(value) {
                const words = _.words(value).length;
                return words <= postTextMaxWord;
            }
        }
    }
};

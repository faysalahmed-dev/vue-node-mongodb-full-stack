const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');
const constains = require('../utils/constains');
const isEmail = require('validator/lib/isEmail');

const Schema = mongoose.Schema;
//const Meetup = require('./meetups');
//const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        avatar: String,
        email: {
            type: String,
            required: [true, 'Email is Required'],
            lowercase: true,
            trim: true,
            unique: [true, 'email already exits'],
            validate: [isEmail, 'invalid email address']
        },
        name: {
            type: String,
            required: [true, 'name is Required'],
            trim: true,
            min: [constains.nameLength, 'Too short, min is {{VALUE}} characters'],
            validate: {
                validator(value) {
                    return /^[a-zA-Z ]+$/.test(value);
                },
                message: 'name only contains alpha value'
            }
        },
        username: {
            type: String,
            required: true,
            trim: true,
            min: [constains.usernameLength, 'Too short, min is {{VALUE}} characters']
        },
        password: {
            type: String,
            min: [constains.passwordMinLength, 'Too short, min is {{VALUE}} characters'],
            max: [constains.passwordMaxLength, 'Too long, max is {{VALUE}} characters'],
            required: 'Password is required'
        },
        info: String,
        joinedMeetups: [{ type: Schema.Types.ObjectId, ref: 'Meetup' }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

//Every user have acces to this methods
userSchema.methods.comparePassword = function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.methods.toJSON = transformObj;

module.exports = mongoose.model('User', userSchema);

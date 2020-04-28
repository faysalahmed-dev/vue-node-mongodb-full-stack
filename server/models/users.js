const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');

const Schema = mongoose.Schema;
const Meetup = require('./meetups');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/dev.js');

const userSchema = new Schema(
    {
        avatar: String,
        email: {
            type: String,
            required: 'Email is Required',
            lowercase: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
        },
        name: {
            type: String,
            required: true,
            min: [6, 'Too short, min is 6 characters']
        },
        username: {
            type: String,
            required: true,
            min: [6, 'Too short, min is 6 characters']
        },
        password: {
            type: String,
            min: [4, 'Too short, min is 4 characters'],
            max: [32, 'Too long, max is 32 characters'],
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
userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return callback(err);
        }

        callback(null, isMatch);
    });
};

userSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

userSchema.methods.toJSON = transformObj;

module.exports = mongoose.model('User', userSchema);

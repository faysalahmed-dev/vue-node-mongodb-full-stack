const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpError = require('http-errors');

const { transformObj } = require('../utils/utils');
const constains = require('../utils/constains');
const isEmail = require('validator/lib/isEmail');

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
            required: 'Password is required',
            select: false
        },
        changePasswordAt: Date,
        info: String,
        joinedMeetups: [{ type: Schema.Types.ObjectId, ref: 'Meetup' }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

userSchema.pre('save', async function(next) {
    try {
        if (this.isModified('password')) {
            const salt = await bcrypt.genSalt(12);
            this.password = await bcrypt.hash(this.password, salt);
        }

        if (this.isModified('password') && !this.isNew) this.changePasswordAt = Date.now();

        next();
    } catch (err) {
        next(httpError(500, 'something went wrong'));
    }
});

//Every user have acces to this methods
userSchema.statics.comparePassword = function(candidatePassword, USER_DB_PASSWORD) {
    return bcrypt.compare(candidatePassword, USER_DB_PASSWORD);
};

userSchema.methods.passwordIsChange = function(JWTTimeStamp) {
    if (this.changePasswordAt) {
        const changeTimpStamp = parseInt(this.changePasswordAt.getTime(), 10) / 1000;
        return JWTTimeStamp < changeTimpStamp;
    }
    // false mean password not change;
    return false;
};

userSchema.methods.genToken = function() {
    return jwt.sign({ id: this._id, username: this.username }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

userSchema.statics.verifyToken = function(userToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken, process.env.JWT_SECRET, function(err, payload) {
            if (err) reject(err);
            else resolve(payload);
        });
    });
};

userSchema.options.toJSON.transform = transformObj;

module.exports = model('User', userSchema);

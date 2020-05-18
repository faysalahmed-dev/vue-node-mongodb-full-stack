const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');
const _ = require('lodash');
const Schema = mongoose.Schema;
const {
    descriptionsMaxWords,
    descriptionsMinWords,
    shortInfoMaxWords,
    shortInfoMinWords,
    titleMaxWord,
    titleMinWord
} = require('../utils/constains');
const slugify = require('slugify');

const meetupSchema = new Schema(
    {
        location: {
            type: new Schema({
                city: { type: String, required: true },
                country: { type: String, required: true },
                address: { type: String, required: true },
                isoCode: { type: String, required: true }
            }),
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true,
            validate: {
                message: `title must be between ${titleMinWord} to ${titleMaxWord} words`,
                validator(value) {
                    const wordsLength = _.words(value).length;
                    // false mean error
                    return wordsLength >= titleMinWord && wordsLength <= titleMaxWord;
                }
            }
        },
        slug: String,
        images: {
            type: [{ type: String, required: true }],
            required: true
        },
        descriptions: {
            type: String,
            required: true,
            validate: {
                message: `descriptions must be between ${descriptionsMinWords} to ${descriptionsMaxWords} words`,
                validator(value) {
                    const wordsLength = _.words(value).length;
                    return (
                        wordsLength >= descriptionsMinWords && wordsLength <= descriptionsMaxWords
                    );
                }
            }
        },
        shortInfo: {
            type: String,
            required: true,
            validate: {
                message: `short info must be between ${shortInfoMinWords} to ${shortInfoMaxWords} words`,
                validator(value) {
                    const wordsLength = _.words(value).length;
                    return wordsLength >= shortInfoMinWords && wordsLength <= shortInfoMaxWords;
                }
            }
        },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        startDate: { type: Date, required: true },
        timeFrom: { type: String, required: true },
        timeTo: { type: String, required: true },
        status: String,
        joinedPeopleCount: { type: Number, default: 0 },
        meetupCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        joinedPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

meetupSchema.pre('save', function(next) {
    this.slug = slugify(this.title, {
        replacement: '-',
        remove: undefined,
        lower: true,
        strict: true
    });
    next();
});

meetupSchema.options.toJSON.transform = transformObj;
module.exports = mongoose.model('Meetup', meetupSchema);

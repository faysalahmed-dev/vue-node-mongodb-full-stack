const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');
const { postTextMaxWord } = require('../utils/constains');
const _ = require('lodash');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            validate: {
                message: `Too long, max is ${postTextMaxWord} words`,
                validator(value) {
                    const wordsLength = _.words(value).length;
                    // false mean error
                    return wordsLength <= postTextMaxWord;
                }
            }
            //max: [512, 'Too long, max is 512 characters']
        },
        thread: { type: Schema.Types.ObjectId, ref: 'Thread' },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

postSchema.options.toJSON.transform = transformObj;

module.exports = mongoose.model('Post', postSchema);

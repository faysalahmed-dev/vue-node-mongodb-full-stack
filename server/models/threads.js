const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');

const Schema = mongoose.Schema;

const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            max: [512, 'Too long, max is 512 characters']
        },
        meetup: { type: Schema.Types.ObjectId, ref: 'Meetup' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

threadSchema.options.toJSON.transform = transformObj;

module.exports = mongoose.model('Thread', threadSchema);

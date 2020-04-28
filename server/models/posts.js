const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            max: [512, 'Too long, max is 512 characters']
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

postSchema.virtual('id').get(function() {
    return this._id.toHexString();
});
postSchema.methods.toJSON = transformObj;
module.exports = mongoose.model('Post', postSchema);

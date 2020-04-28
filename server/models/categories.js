const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        name: String,
        image: String
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

categorySchema.virtual('id').get(function() {
    return this._id.toHexString();
});

categorySchema.methods.toJSON = transformObj;

module.exports = mongoose.model('Category', categorySchema);

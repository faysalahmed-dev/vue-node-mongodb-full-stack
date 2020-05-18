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

categorySchema.options.toJSON.transform = transformObj;

module.exports = mongoose.model('Category', categorySchema);

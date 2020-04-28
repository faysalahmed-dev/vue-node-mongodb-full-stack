const mongoose = require('mongoose');
const { transformObj } = require('../utils/utils');
const Schema = mongoose.Schema;

const meetupSchema = new Schema(
    {
        location: { type: String, required: true },
        processedLocation: String,
        title: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        shortInfo: { type: String, required: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category' },
        startDate: { type: Date, required: true },
        timeFrom: { type: String, required: true },
        timeTo: { type: String, required: true },
        status: String,
        joinedPeopleCount: { type: Number, default: 0 },
        meetupCreator: { type: Schema.Types.ObjectId, ref: 'User' },
        joinedPeople: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);
meetupSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

meetupSchema.methods.toJSON = transformObj;

module.exports = mongoose.model('Meetup', meetupSchema);

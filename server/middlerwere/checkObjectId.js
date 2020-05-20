const httpError = require('http-errors');
const {
    Types: { ObjectId }
} = require('mongoose');

exports.checkObjectId = ({ extractFrom, key }) => (req, res, next) => {
    if (!ObjectId.isValid(req[extractFrom || 'params'][key])) {
        return next(httpError(400, 'invalid cradintial'));
    }
    next();
};

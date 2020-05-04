const httpErrors = require('http-errors');

exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    next(httpErrors(401, 'Authentiction required'));
};

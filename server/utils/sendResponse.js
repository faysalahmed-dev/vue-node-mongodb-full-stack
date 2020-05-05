/**
 * @param statusCode Number
 * @param data {
 *  message?: String
 *  data?: Object
 *  error?: Object
 * }
 */
module.exports = (response, statusCode, data) => {
    if (!statusCode) statusCode = 500;
    // status => 'success' 'error' 'fail'
    const status =
        statusCode >= 200 && statusCode < 300
            ? 'success'
            : statusCode >= 400 && statusCode < 500
            ? 'fail'
            : 'error';

    response.status(statusCode).json({ status, ...data });
};

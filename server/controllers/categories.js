const Category = require('../models/categories');
const catchError = require('../utils/catchError');
const sendResponse = require('../utils/sendResponse');

exports.getCategories = catchError(async (req, res) => {
    const categories = await Category.find({});
    sendResponse(res, 200, { data: categories });
});

const multer = require('multer');
const jimp = require('jimp');
const httpError = require('http-errors');
const catchError = require('../utils/catchError');

// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null,'uploads');
//     },
//     filename(req, file, cb) {
//         const ext = file.mimetype.split('/')[1];
//         const fileName =
//             Math.random()
//                 .toString(36)
//                 .substr(2) +
//             Date.now() +
//             '.' +
//             ext;
//         cb(null, fileName);
//     }
// });

const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(httpError(400, 'Not an image ! please upload only image file'));
    }
}

exports.upload = multer({
    storage,
    fileFilter,
    limits: {
        fields: 1,
        files: '1MB'
    }
}).array('images', 5);

exports.resizeImage = catchError(async (req, res, next) => {
    const { files } = req;
    if (!files || !Array.isArray(files) || files.length < 1)
        return next(httpError(400, 'meetup sholud have atlest 1 image'));

    req.files.forEach(async file => {
        file.filename = `${req.user.id}-${Date.now()}.jpeg`;
        const img = await jimp.read(file.buffer);
        img.resize(500, 500);
        await img.writeAsync(`uploads/${file.filename}`);
    });
    next();
});

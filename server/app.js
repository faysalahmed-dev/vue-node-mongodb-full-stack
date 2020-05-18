const bodyParser = require('body-parser');
const express = require('express');
const sendResponse = require('./utils/sendResponse');
const path = require('path');

const meetupsRoutes = require('./routes/meetups'),
    usersRoutes = require('./routes/users'),
    threadsRoutes = require('./routes/threads'),
    postsRoutes = require('./routes/posts'),
    categoriesRoutes = require('./routes/categories');

const app = express();
app.use((req, res, next) => {
    //console.log(req.subdomains);
    // console.log(req.baseUrl);
    // console.log(req.originalUrl);
    // console.log(req.path);
    next();
});

app.use(require('morgan')('dev'));
app.use(express.static(path.join(__dirname, '..', 'statics')));
app.use(bodyParser.json());

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.log(err);
    const errRes = {};
    if (err.data) errRes.error = err.data;

    if (err.statusCode && err.statusCode < 500) {
        errRes.message = err.message;
    } else {
        errRes.message = 'some thing went wrong';
    }
    if (process.env.NODE_ENV === 'development') {
        errRes.stack = err.stack;
        errRes.message = err.message;
    }
    sendResponse(res, err.statusCode, errRes);
});

module.exports = app;

const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const MongodbStore = require('connect-mongodb-session')(expressSession);
const moment = require('moment');

const meetupsRoutes = require('./routes/meetups'),
    usersRoutes = require('./routes/users'),
    threadsRoutes = require('./routes/threads'),
    postsRoutes = require('./routes/posts'),
    categoriesRoutes = require('./routes/categories');

const app = express();

app.use(require('morgan')('dev'));

app.use(bodyParser.json());

const store = new MongodbStore({
    uri: process.env.DB_URL,
    collection: 'meetupSessions'
});

app.use(
    expressSession({
        secret: process.env.session_key,
        resave: false,
        saveUninitialized: false,
        store,
        cookie: {
            maxAge: moment.duration(1, 'hour').asMilliseconds()
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());
require('./passport/passport')(passport);

app.use('/api/v1/meetups', meetupsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);
app.use('/api/v1/threads', threadsRoutes);
app.use('/api/v1/categories', categoriesRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    let status = 'fail';
    if (statusCode >= 400 || statusCode < 500) {
        status = 'error';
    } else if (status < 300) status = 'success';
    /*
    TODO 
    check error message it is related to server or ganaral error message if it is server error message sent to client or sent "some thing went wrong"
    */
    const errRes = { status, message: err.message };
    if (err.data) errRes.error = err.data;
    if (process.env.NODE_ENV === 'development') {
        errRes.stack = err.stack;
    }
    res.status(statusCode).json(errRes);
});

module.exports = app;

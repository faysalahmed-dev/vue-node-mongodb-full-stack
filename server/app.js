const bodyParser = require('body-parser');
const express = require('express');
const passport = require('passport');
const expressSession = require('express-session');
const MongodbStore = require('connect-mongodb-session')(expressSession);
const moment = require('moment');
const sendResponse = require('./utils/sendResponse');

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

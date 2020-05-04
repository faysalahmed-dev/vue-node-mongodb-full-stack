const mongoose = require('mongoose');
const config = require('./config/dev.js');
const app = require('./app');

// require('./models/meetups');
// require('./models/users');
// require('./models/threads');
// require('./models/posts');
// require('./models/categories');

mongoose
    .connect(config.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 50,
        wtimeout: 30000,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => console.log(err.message));

const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
    console.log('App is running on port: ' + PORT);
});

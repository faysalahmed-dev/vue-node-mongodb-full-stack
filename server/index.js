const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(process.env.DB_URL, {
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

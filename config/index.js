const mongoose = require('mongoose');
require('dotenv').config();

const database_connection = process.env.MONGODB_URI;

const db = () => {
    mongoose.connect(database_connection,
        {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
}

module.exports = {
    db
}
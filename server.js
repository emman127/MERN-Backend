const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const { db } = require('./config/index');
const organization = require('./routes/organization.route');
const user = require('./routes/user.route');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/fail', (req, res) => {
    res.send('Google Auth not authenticate');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({}));
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

db();

app.use(organization);
app.use(user);

app.listen(PORT, () => console.log(`Server runs at port: ${PORT}`));
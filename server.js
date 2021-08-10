const express = require('express');
require('dotenv').config();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
var MongoStore = require('connect-mongo');

const app = express();
const PORT = process.env.PORT || 3001;
const stripe = require('stripe')(process.env.STRIPE_KEY);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/boolers-official', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(validator());
app.use(session({
    secret: 'supersecretsecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/boolers-official',
      }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({partialsDir: __dirname + '/views/partials/'}));


// log mongo queries ;)
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Server is running on ${PORT}...`));
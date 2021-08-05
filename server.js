const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({partialsDir: __dirname + '/views/partials/'}));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// log mongo queries ;)
mongoose.set('debug', true);

app.use(require('./routes'));

app.listen(PORT, () => console.log(`🌍 Server is running on ${PORT}...`));
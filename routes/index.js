const router = require('express').Router();
const apiRoutes = require('./api');
const Product = require('../models/Product');

//api requests
router.use('/api', apiRoutes);

//all client requests
router.get('/', (req, res) => {
    res.render('main', { layout: 'index', title: 'Boolers Offical - Home' });
});

router.get('/social', (req, res) => {
    res.render('social', { layout: 'index', title: 'Boolers Offical - Social' });
});

router.get('/merch', (req, res) => {
    res.render('merch', { layout: 'index', title: 'Boolers Offical - Merch', products: products });
});

router.get('/stories', (req, res) => {
    res.render('stories', { layout: 'index', title: 'Boolers Offical - Stories' });
});

router.use((req, res) => {
    res.status(404).send('<h1>404 Error: This page does not exist.</h1> <h4> Please try a different address route.</h4>');
});

module.exports = router;
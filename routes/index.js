const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./page');
const express = require('express');

router.use(express.static('public'));

//api requests
router.use('/api', apiRoutes);

//page requests
router.use('/', pageRoutes);

//all single client requests
router.get('/', (req, res) => {
    res.render('main', { layout: 'index', title: 'Boolers Official - Home' });
});

router.get('/social', (req, res) => {
    res.render('social', { layout: 'index', title: 'Boolers Official - Social' });
});

router.get('/stories', (req, res) => {
    res.render('stories', { layout: 'index', title: 'Boolers Official - Stories' });
});

router.use((req, res) => {
    res.status(404).send('<h1>404 Error: This page does not exist.</h1> <h4> Please try a different address route.</h4>');
});

module.exports = router;
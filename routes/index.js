const router = require('express').Router();
const apiRoutes = require('./api');
const pageRoutes = require('./page');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const express = require('express');
const passport = require('passport');

const csrf = require('csurf');
const csfrProtection = csrf();
router.use(csfrProtection);

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

router.get('/contact', (req, res) => {
    res.render('contact', { layout: 'index', title: 'Boolers Official - Contact Us' });
});

router.get('/stories', (req, res) => {
    res.render('stories', { layout: 'index', title: 'Boolers Official - Stories' });
});

// user stuff
router.get('/signup', (req, res) => {
    var messages = req.flash('error');
    res.render('signup', { layout: 'index', title: 'Boolers Official - Sign Up', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/merch',
    failureRedirect: '/signup',
    failureFlash: true
}));


// // cart stuff
// router.get('/add-to-cart:id', (req, res) => {
//     var productId = req.params.id;
//     var cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

//     Product.findById(productId, function(err, product) {
//         if (err) {
//             return res.redirect('/');
//         }
//         cart.add(product, product.id);
//         req.session.cart = cart;
//         console.log(req.session.cart);
//         req.redirect('/merch');
//     });
// });

router.use((req, res) => {
    res.status(404).send('<h1>404 Error: This page does not exist.</h1> <h4> Please try a different address route.</h4>');
});

module.exports = router;
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
    Product.find(function (err, docs) {
        var productChuncks = [];
        var chunkSize = 3
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChuncks.push(docs.slice(i, i + chunkSize));
        }
        res.render('main', { layout: 'index', title: 'Boolers Official - Home', products: productChuncks });
    }).lean();
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
// router.get('/signup', (req, res) => {
//     var messages = req.flash('error');
//     res.render('signup', { layout: 'index', title: 'Boolers Official - Sign Up', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
// });

// router.post('/signup', passport.authenticate('local.signup', {
//     successRedirect: '/merch',
//     failureRedirect: '/signup',
//     failureFlash: true
// }));

// router.get('/signin', (req, res) => {
//     var messages = req.flash('error');
//     res.render('signin', { layout: 'index', title: 'Boolers Official - Sign In', csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
// });

// router.post('/signin', passport.authenticate('local.signin', {
//     successRedirect: '/merch',
//     failureRedirect: '/signin',
//     failureFlash: true
// }));

// router.get('/profile', isLoggedIn, function(req, res) {
//     res.render('profile', { layout: 'index', title: 'Boolers Official - Profile' });
// });

// router.get('/logout', function(req, res, next) {
//     req.logout();
//     res.redirect('/');
// });

// cart stuff
router.get('/add-to-cart/:id', (req, res, next) => {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, productId);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/cart');
    });
});

router.get('/cart', function (req, res) {
    if (!req.session.cart) {
        return res.render('cart', { layout: 'index', title: 'Boolers Official - Cart', products: null });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', { layout: 'index', title: 'Boolers Official - Cart', products: cart.generateArray(), totalPrice: cart.totalPrice });
});

router.get('/reduce/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/remove/:id', function (req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.use((req, res) => {
    res.status(404).send('<h1>404 Error: This page does not exist.</h1> <h4> Please try a different address route.</h4>');
});

module.exports = router;

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }
//     res.redirect('/');
// };
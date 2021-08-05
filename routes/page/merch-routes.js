const router = require('express').Router();
const Product = require('../../models/Product');
const express = require('express');

router.get('/', (req, res) => {
    Product.find(function(err, docs) {
        var productChuncks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChuncks.push(docs.slice(i, i + chunkSize));
        }
        res.render('all-products', { layout: 'index', title: 'Boolers Offical - Merch', products: productChuncks });
    }).lean();
});

router.get('/:id', (req, res) => {
    router.use(express.static('public'));
    Product.findById(req.params.id, function(err, doc) {
        res.render('single-product', { layout: 'index', title: 'Boolers Offical - Merch', product: doc });
    }).lean();
});

module.exports = router;
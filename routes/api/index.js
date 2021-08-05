const router = require('express').Router();
const productRoutes = require('./product-routes');
//api use only
router.use('/products', productRoutes);

module.exports = router;
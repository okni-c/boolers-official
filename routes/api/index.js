const router = require('express').Router();
const merchRoutes = require('./product-routes');

router.use('/products', merchRoutes);

module.exports = router;
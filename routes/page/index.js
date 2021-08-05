const router = require('express').Router();
const merchRoutes = require('./merch-routes');

router.use('/merch', merchRoutes);

module.exports = router;
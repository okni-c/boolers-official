const router = require('express').Router();
const {
  getAllProducts,
  // getProductById,
  addProduct,
  updateProduct,
  removeProduct
} = require('../../controllers/product-controller');

// /api/products
router
  .route('/')
  .get(getAllProducts)
  .post(addProduct);

// // /api/product/:id
// router
//   .route('/:id')
//   .get(getProductById);

// // /api/product/:id
router
  .route('/:id')
  .put(updateProduct)
  .delete(removeProduct);

module.exports = router;
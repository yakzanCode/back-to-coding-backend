const express = require('express');
const Product = require('../models/product.model.js');
const { getProducts, getProduct, getSimilarProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller.js');
const router = express.Router();


router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/similar/:type', getSimilarProducts);

router.post('/', createProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);



module.exports = router;
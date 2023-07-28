const express = require('express');
const { creatingProduct, updatingProduct, fetchingProducts, deletingProduct } = require('../controllers/product.controller');



const productRoute = express.Router()

// Route to create a new product
productRoute.post('/', creatingProduct);

// Route to update a product 
productRoute.patch('/:id', updatingProduct);

// Route to get the products
productRoute.get('/', fetchingProducts);

// Route to delete the products
productRoute.delete('/:id', deletingProduct);


module.exports = { productRoute }
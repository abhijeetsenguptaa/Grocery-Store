const express = require('express');
const { fetchCartDetails, addToCart, updateCartDetails, deleteFromCart } = require('../controllers/cart.controller');
const { authentication } = require('../middleware/authentication.middleware');


const cartRoute = express.Router();

// Route to add a product to the cart
cartRoute.post('/', authentication, addToCart);

// Route to fetch cart details for the user
cartRoute.get('/', authentication, fetchCartDetails);

// Route to update cart details for a specific cart item
cartRoute.patch('/:id', authentication, updateCartDetails);

// Route to delete a product from the cart
cartRoute.delete('/:id', authentication, deleteFromCart);



module.exports = { cartRoute };
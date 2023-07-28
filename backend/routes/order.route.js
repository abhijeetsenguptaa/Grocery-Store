const express = require('express');
const { createOrder, fetchOrder, cancelOrder } = require('../controllers/order.controller');
const { authentication } = require('../middleware/authentication.middleware');

const orderRoute = express.Router();

// Create a new order
orderRoute.post('/', authentication, createOrder);

// Fetch the orders
orderRoute.get('/', authentication, fetchOrder);

// Cancel an order
orderRoute.patch('/:id/cancel', authentication, cancelOrder);

module.exports = { orderRoute };

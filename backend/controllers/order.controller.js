const { connection } = require("../configs/connection");

async function createOrder(req, res) {
    try {
        const { paymentMethod, paymentStatus, orderStatus, totalAmount, products } = req.body;

        if (!paymentMethod || !paymentStatus || !orderStatus || !totalAmount || !products) {
            return res.status(400).json({
                error: 'Please provide all required fields.'
            });
        }

        const insertQuery = 'INSERT INTO orders (userID, paymentMethod, paymentStatus, orderStatus, totalAmount, products) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await connection.promise().query(insertQuery, [userID, paymentMethod, paymentStatus, orderStatus, totalAmount, JSON.stringify(products)]);

        const query = `DELETE FROM cart WHERE userID = ${userID}`;
        await connection.promise().query(query, [userID]);

        res.status(201).json({
            message: 'Order created successfully',
            data: {
                id: result.insertId,
                userID,
                paymentMethod,
                paymentStatus,
                orderStatus,
                totalAmount,
                products
            }
        });
    } catch (error) {
        console.error('Error while creating order:', error);
        res.status(500).json({
            error: 'Failed to create order'
        });
    }
}



// Function to fetch orders
async function fetchOrder(req, res) {
    try {
        const id = req.query.id;

        let query = '';
        let queryParams = [];

        if (id) {
            // If the 'id' parameter is provided, check if the user is an admin
            if (role === "admin") {
                query = `SELECT * FROM orders WHERE id = ?`;
            } else {
                query = `SELECT * FROM orders WHERE id = ? AND userID = ${userID}`;
            }
            queryParams = [id];
        } else if (role === "admin") {
            // If the user is an admin and 'id' is not provided, fetch all orders
            query = 'SELECT * FROM orders';
        } else {
            // Fetch orders for the authenticated user
            query = 'SELECT * FROM orders WHERE userID = ?';
            queryParams = [userID];
        }

        const [result] = await connection.promise().query(query, queryParams);

        if (result.length === 0) {
            return res.status(404).json({
                error: 'Order not found'
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error while fetching order(s):', error);
        res.status(500).json({
            error: 'Failed to fetch order(s)'
        });
    }
}



// Function to cancel an order
async function cancelOrder(req, res) {
    try {
        const orderId = req.params.id;

        // Check if the order exists
        const selectQuery = `SELECT * FROM orders WHERE id = ? & userID = ${userID}`;
        const [orderResult] = await connection.promise().query(selectQuery, [orderId]);

        if (orderResult.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Check if the order is already cancelled
        if (orderResult[0].orderStatus === 'cancelled') {
            return res.status(400).json({ error: 'Order is already cancelled' });
        }

        // Update the order status to "cancelled"
        const updateQuery = 'UPDATE orders SET orderStatus = ? WHERE id = ?';
        await connection.promise().query(updateQuery, ['cancelled', orderId]);

        res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
        console.error('Error while cancelling order:', error);
        res.status(500).json({ error: 'Failed to cancel order' });
    }
}



module.exports = { createOrder, fetchOrder, cancelOrder }


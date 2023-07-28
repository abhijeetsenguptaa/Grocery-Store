const { connection } = require("../configs/connection");

// Function to add product to the cart Table
async function addToCart(req, res) {
    try {
        const { productID, quantity, amount, subtotal } = req.body;

        if (!productID || !quantity || !amount || !subtotal) {
            return res.status(400).json({
                error: 'Please provide all required fields.'
            });
        }


        // Add the product to the cart for the specified user
        const insertQuery = 'INSERT INTO cart (userID, productID, quantity, amount, subtotal) VALUES (?, ?, ?, ?, ?)';
        const [result] = await connection.promise().query(insertQuery, [userID, productID, quantity, amount, subtotal]);

        res.status(201).json({
            message: 'Item added to the cart successfully',
            data: {
                id: result.insertId,
                userID,
                productID,
                quantity,
                amount,
                subtotal
            }
        });
    } catch (error) {
        console.error('Error while adding item to cart:', error);
        res.status(500).json({
            error: 'Failed to add item to cart'
        });
    }
}

// Function to fetch data of the cart from the Cart Table
async function fetchCartDetails(req, res) {
    try {

        // Fetch cart details for the specified user
        const selectQuery = `SELECT * FROM cart WHERE userID = ${userID}`;
        const [rows] = await connection.promise().query(selectQuery, [userID]);

        res.status(200).json({
            cartDetails: rows
        });
    } catch (error) {
        console.error('Error while fetching cart details:', error);
        res.status(500).json({
            error: 'Failed to fetch cart details'
        });
    }
}

// Function to update the items in the Cart Table
async function updateCartDetails(req, res) {
    try {
        const { id } = req.params
        const { productID, quantity, amount, subtotal } = req.body;

        if (!productID || !quantity || !amount || !subtotal) {
            return res.status(400).json({
                error: 'Please provide all required fields.'
            });
        }

        // Update the cart details for the specified cartID
        const updateQuery = 'UPDATE cart SET productID = ?, quantity = ?, amount = ?, subtotal = ? WHERE id = ?';
        const [result] = await connection.promise().query(updateQuery, [productID, quantity, amount, subtotal, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Cart item not found'
            });
        }

        res.status(200).json({
            message: 'Cart item updated successfully'
        });
    } catch (error) {
        console.error('Error while updating cart details:', error);
        res.status(500).json({
            error: 'Failed to update cart item'
        });
    }
}

// Function to delete the items from the Cart Table
async function deleteFromCart(req, res) {
    try {
        const { id } = req.params

        // Delete the cart item for the specified cartID
        const deleteQuery = 'DELETE FROM cart WHERE id = ?';
        const [result] = await connection.promise().query(deleteQuery, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: 'Cart item not found'
            });
        }

        res.status(200).json({
            message: 'Cart item deleted successfully'
        });
    } catch (error) {
        console.error('Error while deleting cart item:', error);
        res.status(500).json({
            error: 'Failed to delete cart item'
        });
    }
}





module.exports = { addToCart, fetchCartDetails, updateCartDetails, deleteFromCart }
const { connection } = require("../configs/connection");

// Function for creating the products
async function creatingProduct(req, res) {
    try {
        const { name, description, amount, discount, image, category, brand, availability, rating } = req.body;

        // Validate required fields
        if (!name || !amount || !image || !category) {
            return res.status(400).json({ error: 'Please provide name, amount, image, and category for the product' });
        }

        // Insert the new product into the database
        const insertQuery =
            'INSERT INTO products (name, description, amount, discount, image, category, brand, availability, rating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await connection
            .promise()
            .query(insertQuery, [name, description, amount, discount, image, category, brand, availability, rating]);

        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error('Error while creating a new product:', error);
        res.status(500).json({ error: 'Failed to create a new product' });
    }
}

//Function for updating the products on basis of ID
async function updatingProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, amount, discount, image, category, brand, availability, rating } = req.body;

        // Update the product in the database
        const updateQuery =
            'UPDATE products SET name = ?, description = ?, amount = ?, discount = ?, image = ?, category = ?, brand = ?, availability = ?, rating = ? WHERE id = ?';
        const [result] = await connection
            .promise()
            .query(updateQuery, [name, description, amount, discount, image, category, brand, availability, rating, id]);

        // Check if the product with the given ID was found and updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
}

// Function for fetching the products on basis of id, category, brand.
async function fetchingProducts(req, res) {
    try {
        let queryConditions = '';
        let queryParams = [];

        // Check if query parameters are present and construct the query accordingly
        if (req.query.category) {
            queryConditions += 'category = ? AND ';
            queryParams.push(req.query.category);
        }
        if (req.query.brand) {
            queryConditions += 'brand = ? AND ';
            queryParams.push(req.query.brand);
        }
        // Add more conditions if needed based on other query parameters

        // Check if a specific product id is provided in the query parameters
        if (req.query.id) {
            queryConditions += 'id = ?';
            queryParams.push(req.query.id);
        }

        // Remove the trailing 'AND' from the query conditions string
        if (queryConditions.endsWith('AND ')) {
            queryConditions = queryConditions.slice(0, -4);
        }

        // Construct the final query
        let getProductsQuery = 'SELECT * FROM products';
        if (queryConditions !== '') {
            getProductsQuery += ' WHERE ' + queryConditions;
        }

        // Fetch products from the database based on the query
        const [rows] = await connection.promise().query(getProductsQuery, queryParams);

        // Return the response with the products
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

// Function to delete the products on basis of queries.
async function deletingProduct(req, res) {
    try {
        const { id } = req.params;

        // Delete the product from the database
        const deleteQuery = 'DELETE FROM products WHERE id = ?';
        const [result] = await connection.promise().query(deleteQuery, [id]);

        // Check if the product with the given ID was found and deleted
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error while deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
}


module.exports = { creatingProduct, updatingProduct, fetchingProducts, deletingProduct }
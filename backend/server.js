require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/connection');
const { userRoute } = require('./routes/user.route');
const { productRoute } = require('./routes/product.route');
const { cartRoute } = require('./routes/cart.route');
const { orderRoute } = require('./routes/order.route');




const PORT = process.env.PORT || 8080;

// Creation of the APP with express server.
const app = express();
app.use(express.json());
app.use(cors());


// Normal Welcome Message API.
app.get('/', async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            msg: 'Welcome to the Grocery-Store'
        })
    } catch (error) {
        res.status(500).json({
            'msg': error.message
        })
    }
});


app.use('/users', userRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/order', orderRoute)



app.listen(PORT, async () => {
    try {
        await connection.promise().connect();
        console.log('Server is connected to the database');
    } catch (err) {
        console.error('Failed to connect to the database:', err.message);
    }
    console.log(`Server is running at http://localhost:${PORT}`);
});

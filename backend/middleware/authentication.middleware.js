require('dotenv').config();
const jwt = require('jsonwebtoken');

async function authentication(req, res, next) {
    const token = req.headers.authorization; // Note: It should be 'Authorization' (with capital 'A')

    if (!token) {
        return res.status(401).json({
            error: 'No token provided'
        });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    error: 'Invalid token'
                });
            }

            // If the token is valid, the payload will be available in 'decode'
            userID = decode.user.id
            email = decode.user.email
            role = decode.user.role



            // Call the next middleware or route handler
            next();
        });
    } catch (error) {
        console.error('Error during authentication:', error.message);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
}

module.exports = { authentication };

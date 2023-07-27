require('dotenv').config();
const mysql = require('mysql2');
// const { createItemsTable } = require('../models/item.model');
const { createUserTable } = require('../models/user.model');

const DATABASE_URL = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@aws.connect.psdb.cloud/grocerystore`;

const connection = mysql.createConnection({
    uri: DATABASE_URL,
    ssl: {
        rejectUnauthorized: true
    }
});

connection.query(createUserTable, (err) => {
    if (err) {
        console.error('Error creating user table:', err.message);
    } else {
        console.log('User table created successfully');
    }
});



// Drop the users table if it exists
// const dropUsersTable = `
//   DROP TABLE IF EXISTS items
// `;

// connection.query(dropUsersTable, (err) => {
//     if (err) {
//         console.error('Error dropping users table:', err.message);
//     } else {
//         console.log('Users table dropped successfully');
//     }
// });

module.exports = { connection };

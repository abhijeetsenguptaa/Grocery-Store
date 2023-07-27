require("dotenv").config();
const { connection } = require("../configs/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Function for registering the new User
async function registeringNewUser(req, res) {
    const { firstName, lastName, email, password, age, gender } = req.body;

    if (!firstName || !lastName || !age || !gender || !email || !password) {
        return res
            .status(400)
            .json({
                error:
                    "Please provide firstName, lastName, email, password, age, and gender for the user",
            });
    }

    try {
        // Hash the password using bcrypt
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    msg: "Error in hashing the password",
                });
            } else {
                try {
                    // Insert the new user into the database
                    const query =
                        "INSERT INTO users (firstName, lastName, email, password, age, gender) VALUES (?, ?, ?, ?, ?, ?)";
                    const [result] = await connection
                        .promise()
                        .query(query, [firstName, lastName, email, hash, age, gender]);

                    res
                        .status(201)
                        .json({
                            id: result.insertId,
                            firstName,
                            lastName,
                            email,
                            age,
                            gender,
                            role: "customer",
                        });
                } catch (err) {
                    console.error("Error while creating a new user:", err);
                    res.status(500).json({ error: "Failed to create a new user" });
                }
            }
        });
    } catch (err) {
        console.error("Error while hashing the password:", err);
        res.status(500).json({ error: "Failed to hash the password" });
    }
}

// Function for login the user
async function loggingUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            status: false,
            msg: "Please provide the email and password.",
        });
    }

    try {
        // Check if the user exists in the database
        const query = "SELECT * FROM users WHERE email = ?";
        const [rows] = await connection.promise().query(query, [email]);

        if (rows.length === 0) {
            return res.status(404).json({
                status: false,
                msg: "User not found.",
            });
        }

        const user = rows[0];

        // Compare the provided password with the hashed password in the database
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    msg: "Error in comparing passwords.",
                });
            }

            if (!isMatch) {
                return res.status(401).json({
                    status: false,
                    msg: "Invalid password.",
                });
            }

            // Passwords match, create a JWT token
            const payload = {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                },
            };

            jwt.sign(
                payload,
                process.env.SECRET_KEY,
                { expiresIn: "7d" },
                (err, token) => {
                    if (err) {
                        return res.status(500).json({
                            status: false,
                            msg: "Error in generating JWT token.",
                        });
                    }

                    // Return the JWT token as a response
                    res.status(200).json({
                        status: true,
                        msg: "Login successful.",
                        token: token,
                    });
                }
            );
        });
    } catch (err) {
        console.error("Error while logging in:", err);
        res.status(500).json({
            status: false,
            msg: "Failed to log in.",
        });
    }
}

//Function for fetching the user
async function fetchingUser(req, res) {
    try {
        const id = req.query.id;

        if (id) {
            const query = `SELECT * FROM users WHERE id = ${id}`;
            const [rows] = await connection.promise().query(query);

            res.status(200).json(rows);
        } else {
            const query = "SELECT * FROM users";
            const [rows] = await connection.promise().query(query);

            res.status(200).json(rows);
        }
    } catch (err) {
        console.error("Error while fetching users:", err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// Function to delete a user by ID
async function deletingUser(req, res) {
    const userId = req.params.id;

    try {
        // Check if the user exists before attempting to delete
        const checkQuery = "SELECT * FROM users WHERE id = ?";
        const [checkRows] = await connection.promise().query(checkQuery, [userId]);

        if (checkRows.length === 0) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        // If the user exists, proceed with deletion
        const deleteQuery = "DELETE FROM users WHERE id = ?";
        await connection.promise().query(deleteQuery, [userId]);

        res.status(200).json({
            message: "User deleted successfully"
        });
    } catch (err) {
        console.error("Error while deleting the user:", err);
        res.status(500).json({
            error: "Failed to delete the user"
        });
    }
}


async function updatingUser(req, res) {
    const userId = req.params.id;
    const { firstName, lastName, email, age, gender } = req.body;

    // Validate that at least one field is provided for update
    if (!firstName && !lastName && !email && !age && !gender) {
        return res.status(400).json({ error: 'Please provide at least one field to update' });
    }

    try {
        // Check if the user exists in the database
        const checkQuery = 'SELECT * FROM users WHERE id = ?';
        const [checkRows] = await connection.promise().query(checkQuery, [userId]);

        if (checkRows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Construct the dynamic SQL query for updating user information
        let updateQuery = 'UPDATE users SET ';
        const updateValues = [];

        if (firstName) {
            updateQuery += 'firstName = ?, ';
            updateValues.push(firstName);
        }

        if (lastName) {
            updateQuery += 'lastName = ?, ';
            updateValues.push(lastName);
        }

        if (email) {
            updateQuery += 'email = ?, ';
            updateValues.push(email);
        }

        if (age) {
            updateQuery += 'age = ?, ';
            updateValues.push(age);
        }

        if (gender) {
            updateQuery += 'gender = ?, ';
            updateValues.push(gender);
        }

        // Remove the trailing comma and space from the query
        updateQuery = updateQuery.slice(0, -2);

        // Add the WHERE clause for updating the specific user
        updateQuery += ' WHERE id = ?';
        updateValues.push(userId);

        // Execute the update query with the provided values
        await connection.promise().query(updateQuery, updateValues);

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error while updating the user:', err);
        res.status(500).json({ error: 'Failed to update the user' });
    }
}

module.exports = {
    registeringNewUser,
    loggingUser,
    fetchingUser,
    deletingUser,
    updatingUser
};

const express = require('express');
const { registeringNewUser, loggingUser, fetchingUser, deletingUser, updatingUser } = require('../controllers/user.controller');



const userRoute = express.Router();


// Route for registering  user
userRoute.post("/register", registeringNewUser)

// Route for Logging User
userRoute.post("/login", loggingUser)

// Route to get all users
userRoute.get('/', fetchingUser);

// Route to delete a user by ID
userRoute.delete('/:id', deletingUser);

// Route to update a user by ID
userRoute.put("/:id", updatingUser)



module.exports = { userRoute };
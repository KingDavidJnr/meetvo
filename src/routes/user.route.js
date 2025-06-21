const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

// Create a new user
router.post("/user/register", userController.createUser);

// User login
router.post("/user/login", userController.login);

//Get user by username
router.get("/user/name/:username", userController.getUserByUsername);

// Check whether username exists
router.get("/user/username", userController.checkUsername);

// Check whether email exists
router.get("/user/email", userController.checkEmail);

// Get user by ID
router.get("/user/:id", auth.UserProfile, userController.getUserById);

// Update user by ID
router.patch("/user/:id", auth.UserProfile, userController.updateUser);

// Delete user by ID
router.delete("/user/:id", auth.UserProfile, userController.deleteUser);

module.exports = router;

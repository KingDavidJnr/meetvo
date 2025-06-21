const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const userController = require("../controllers/user.controller");

// Create a new user
router.post("/user/register", userController.createUser);

// User login
router.post("/user/login", userController.login);

// Check whether username exists
router.get("/user/username", userController.checkUsername);

module.exports = router;

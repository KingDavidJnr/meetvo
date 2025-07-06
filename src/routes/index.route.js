const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const profileRoutes = require("./profile.route");
const notificationRoutes = require("./notification.route");
const postRoutes = require("./post.route");
const followRoutes = require("./follow.route");

// Apply user routes
router.use("/", userRoutes);

// Apply Profile routes
router.use("/", profileRoutes);

// Apply all notification routes
router.use("/", notificationRoutes);

// Apply the post routes
router.use("/", postRoutes);

// Apply follow routes
router.use("/", followRoutes);

// Export the router to be used in the main server file
module.exports = router;

const express = require("express");
const router = express.Router();
const userRoutes = require("./user.route");
const profileRoutes = require("./profile.route");
const notificationRoutes = require("./notification.route");
const postRoutes = require("./post.route");
const followRoutes = require("./follow.route");
const engagementRoutes = require("./engagement.route");

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

// apply engagement routes
router.use("/", engagementRoutes);

// Export the router to be used in the main server file
module.exports = router;

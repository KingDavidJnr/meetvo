const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.controller");

// route to fetch all notifications
router.get("/notifications", NotificationController.getAll);

// route to fetch a single notification
router.get("/notifications/:notification_id", NotificationController.getOne);

// route to delete a notification
router.delete(
  "/notifications/:notification_id/delete",
  NotificationController.delete
);

// route to mark single notification as read
router.patch(
  "/notifications/:notification_id/read",
  NotificationController.markAsRead
);

// route to mark all notifications as read
router.patch("/notifications/read", NotificationController.markAllAsRead);

module.exports = router;

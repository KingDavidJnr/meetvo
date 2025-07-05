const notificationService = require("../services/notification.service");
const { extractUserId } = require("../utils/auth.util");

class NotificationController {
  async getAll(req, res) {
    try {
      const user_id = extractUserId(req);
      const notifications =
        await notificationService.getAllNotificationsForUser(user_id);

      return res.status(200).json({
        message: "Notifications fetched successfully",
        data: notifications,
      });
    } catch (error) {
      console.error("Error fetching notifications:", error);
      return res.status(500).json({ message: "Error fetching notifications" });
    }
  }

  async getOne(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.notification_id;

      const notification = await notificationService.getNotificationById(
        id,
        user_id
      );

      return res.status(200).json({
        message: "Notification fetched successfully",
        data: notification,
      });
    } catch (error) {
      console.error("Error fetching notification:", error);
      return res.status(500).json({ message: "Error fetching notification" });
    }
  }

  async delete(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.notification_id;

      await notificationService.deleteNotificationById(id, user_id);

      return res
        .status(200)
        .json({ message: "Notification deleted successfully" });
    } catch (error) {
      console.error("Error deleting notification:", error);
      return res.status(500).json({ message: "Error deleting notification" });
    }
  }

  async markAsRead(req, res) {
    try {
      const user_id = extractUserId(req);
      const id = req.params.notification_id;

      const updated = await notificationService.markAsRead(id, user_id);

      return res.status(200).json({
        message: "Notification marked as read",
        data: updated,
      });
    } catch (error) {
      console.error("Error deleting notification:", error);
      return res.status(500).json({ message: "Error marking as read" });
    }
  }

  async markAllAsRead(req, res) {
    try {
      const user_id = extractUserId(req);
      await notificationService.markAllAsRead(user_id);

      return res.status(200).json({
        message: "All notifications marked as read",
      });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      return res.status(500).json({ message: "Error marking all as read" });
    }
  }
}

module.exports = new NotificationController();

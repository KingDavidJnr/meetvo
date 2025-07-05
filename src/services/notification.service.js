const db = require("../../models");
const Notification = db.Notification;
const User = db.User;

class NotificationService {
  async createNotification(data) {
    return await Notification.create(data);
  }

  async getAllNotificationsForUser(receiver_id) {
    return await Notification.findAll({
      where: { receiver_id },
      order: [["createdAt", "DESC"]],
    });
  }

  async getNotificationById(id, receiver_id) {
    const notification = await Notification.findOne({
      where: { id, receiver_id },
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    return notification;
  }

  async deleteNotificationById(id, receiver_id) {
    const deleted = await Notification.destroy({
      where: { id, receiver_id },
    });

    if (!deleted) {
      throw new Error("Notification not found or already deleted");
    }

    return true;
  }

  async markAsRead(id, receiver_id) {
    const notification = await Notification.findOne({
      where: { id, receiver_id },
    });

    if (!notification) {
      throw new Error("Notification not found");
    }

    notification.is_read = true;
    await notification.save();
    return notification;
  }

  async markAllAsRead(receiver_id) {
    await Notification.update(
      { is_read: true },
      { where: { receiver_id, is_read: false } }
    );
  }
}

module.exports = new NotificationService();

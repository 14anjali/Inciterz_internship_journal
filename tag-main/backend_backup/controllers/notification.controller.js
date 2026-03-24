import "../models/associations.js";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";

const DEFAULT_LIMIT = 30;
const MAX_LIMIT = 50;

/**
 * GET /api/notifications
 * Returns recent site-wide notifications and unread count for the current user.
 */
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const limit = Math.min(parseInt(req.query.limit, 10) || DEFAULT_LIMIT, MAX_LIMIT);

    const user = await User.findByPk(userId, {
      attributes: ["notifications_read_at"],
    });
    const readAt = user?.notifications_read_at || new Date(0);

    const notifications = await Notification.findAll({
      order: [["created_at", "DESC"]],
      limit,
      attributes: ["id", "type", "reference_id", "title", "link_path", "created_at"],
    });

    const unreadCount = await Notification.count({
      where: {
        created_at: { [Op.gt]: readAt },
      },
    });

    return res.status(200).json({
      notifications: notifications.map((n) => ({
        id: n.id,
        type: n.type,
        referenceId: n.reference_id,
        title: n.title,
        linkPath: n.link_path,
        createdAt: n.created_at,
      })),
      unreadCount,
    });
  } catch (err) {
    console.error("getNotifications error:", err.message);
    return res.status(500).json({ message: "Failed to fetch notifications" });
  }
};

/**
 * PATCH /api/notifications/read
 * Marks all notifications as read for the current user (updates notifications_read_at).
 */
export const markNotificationsRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.update(
      { notifications_read_at: new Date() },
      { where: { id: userId } }
    );

    return res.status(200).json({ message: "Notifications marked as read" });
  } catch (err) {
    console.error("markNotificationsRead error:", err.message);
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};

import User from "../models/user.model.js";
import { Op, fn, col, where } from "sequelize";
import sequelize from "../lib/db.js";
import { getActiveUsersMap } from "../server.js";
import { broadcastUserSummaryStats, broadcastStats } from "../lib/statsBroadcaster.js";
import CommunityForum from "../models/community_forum_model.js";
import Comments from "../models/community_forum_comment.model.js";
import Community from "../models/community_chat.model.js";
import CommunityMember from "../models/community_member.model.js";
import CommunityMessage from "../models/community_chat_messages.model.js";
import Video from "../models/video.model.js";
import ConversationParticipant from "../models/conversation_participant.model.js";
import PersonalMessage from "../models/personal_message.model.js";
import SupportChatMessage from "../models/support_chat_message.model.js";
import SupportMember from "../models/support_member.model.js";
import FAQ from "../models/faq.model.js";
// Helper function to send status messages (like Flask's flash)
const sendResponseAndRedirect = (
  res,
  success,
  message,
  redirectPath = "/admin/manage-users"
) => {
  // In a REST API, you'd usually just send JSON.
  // Since the original code redirects, we'll send a message and tell the client where to go.
  return res.status(success ? 200 : 400).json({
    success,
    message,
    redirect: redirectPath,
  });
};
// Simple helper to enforce admin seniority rule
const assertCanActOnTargetAdmin = (currentUser, targetUser) => {
  // only applies when BOTH are admins
  if (currentUser.role === "admin" && targetUser.role === "admin") {
    // older admin = smaller createdAt
    if (targetUser.createdAt < currentUser.createdAt) {
      const err = new Error("You cannot modify an admin who is older than you");
      err.status = 403;
      throw err;
    }
  }
};

// GET /manage-users
export const manageUsers = async (req, res, next) => {
  try {
    const statusFilter = req.query.status;
    const validStatuses = ["active", "inactive", "locked"];

    // pagination
    const page = parseInt(req.query.page) || 1;
    const per_page = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * per_page;

    let queryOptions = {
      order: [["createdAt", "ASC"]],
      where: {},
      limit: per_page,
      offset,
    };

    let pageTitle = "Manage All Users";

    if (validStatuses.includes(statusFilter)) {
      queryOptions.where.status = statusFilter;
      pageTitle = `Manage ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
        } Users`;
    }

    // find + count for pagination
    const { count, rows } = await User.findAndCountAll(queryOptions);

    return res.json({
      title: pageTitle,
      users: rows,
      pagination: {
        total_items: count,
        current_page: page,
        totalPages: Math.ceil(count / per_page),
        pageSize: per_page,
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/activate
export const activateUser = async (req, res, next) => {
  try {
    const { userId } = req.params; // was userId
    const currentUser = req.user; // logged-in admin

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent admin from modifying their own account status
    if (user.id === currentUser.id) {
      return sendResponseAndRedirect(
        res,
        false,
        "You cannot activate your own account."
      );
    }

    // 🔴 AGE-BASED ADMIN CHECK
    assertCanActOnTargetAdmin(currentUser, user);

    user.status = "active";
    user.failed_login_attempts = 0;
    await user.save();
    
    // Broadcast update
    await broadcastUserSummaryStats();
    await broadcastStats(true);

    sendResponseAndRedirect(
      res,
      true,
      `User '${user.username || user.email}' has been activated.`
    );
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/deactivate
export const deactivateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.id === currentUser.id) {
      return sendResponseAndRedirect(
        res,
        false,
        "You cannot deactivate your own account."
      );
    }

    // 🔴 AGE-BASED ADMIN CHECK
    assertCanActOnTargetAdmin(currentUser, user);

    user.status = "inactive";
    await user.save();

    await broadcastUserSummaryStats();
    await broadcastStats(true);

    sendResponseAndRedirect(
      res,
      true,
      `User '${user.username || user.email}' has been deactivated.`
    );
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/unlock
export const unlockUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 🔴 AGE-BASED ADMIN CHECK (only matters if both are admins)
    assertCanActOnTargetAdmin(currentUser, user);

    if (user.status === "locked") {
      user.status = "active";
      user.failed_login_attempts = 0;
      await user.save();
      
      await broadcastUserSummaryStats();
      await broadcastStats(true);

      sendResponseAndRedirect(
        res,
        true,
        `User '${user.username || user.email}' has been unlocked.`
      );
    } else {
      sendResponseAndRedirect(
        res,
        false,
        `User '${user.username || user.email}' was not locked.`
      );
    }
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/toggle_admin
export const toggleAdmin = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Prevent self-modification
    if (user.id === currentUser.id) {
      return sendResponseAndRedirect(
        res,
        false,
        "You can't change your own admin rights."
      );
    }

    // 🔴 AGE-BASED ADMIN CHECK
    assertCanActOnTargetAdmin(currentUser, user);

    // Optional safety: prevent removing the last admin
    if (user.role === "admin") {
      const remainingAdminsCount = await User.count({
        where: { role: "admin" },
      });
      if (remainingAdminsCount <= 1) {
        return sendResponseAndRedirect(
          res,
          false,
          "You can't remove the last remaining admin."
        );
      }
    }

    // Toggle logic
    user.role = user.role === "admin" ? "user" : "admin";
    await user.save();

    // Broadcast update
    await broadcastUserSummaryStats();
    await broadcastStats(true);

    sendResponseAndRedirect(
      res,
      true,
      `Admin status for ${user.username || user.email} set to ${user.role === "admin"
      }.`
    );
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/toggle_support
export const toggleSupport = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const currentUser = req.user;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.id === currentUser.id) {
      return sendResponseAndRedirect(
        res,
        false,
        "You can't change your own support rights."
      );
    }

    // 🔴 AGE-BASED ADMIN CHECK
    assertCanActOnTargetAdmin(currentUser, user);

    // Assuming support is toggled between 'support' and 'user'
    user.role = user.role === "support" ? "user" : "support";
    await user.save();

    await broadcastUserSummaryStats();
    await broadcastStats(true);

    sendResponseAndRedirect(
      res,
      true,
      `Support Agent status for ${user.username || user.email} set to ${user.role === "support"
      }.`
    );
  } catch (error) {
    next(error);
  }
};

// POST /user/:id/delete
export const deleteUser = async (req, res) => {
  try {
    const currentUser = req.user;
    const { userId } = req.params;

    const targetUser = await User.findByPk(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.id === currentUser.id) {
      return res
        .status(400)
        .json({ message: "You cannot delete your own account" });
    }

    assertCanActOnTargetAdmin(currentUser, targetUser);

    // Find the oldest admin to receive ownership of transferred content.
    // Prefer the oldest admin (smallest createdAt) who is not the user being deleted.
    const receivingAdmin = await User.findOne({
      where: { role: "admin", id: { [Op.ne]: userId } },
      order: [["createdAt", "ASC"]],
    });

    if (!receivingAdmin) {
      return res.status(400).json({
        message: "No admin account found to receive ownership of this user's content. Ensure at least one other admin exists before deleting a user.",
      });
    }

    const deletedUserName = targetUser.name || targetUser.userid || "Deleted User";
    const transferNotice = `This content was originally created by "${deletedUserName}" whose account has been removed. Ownership has been transferred to admin.`;

    await sequelize.transaction(async (t) => {
      // --- Transfer content ownership to receiving admin ---

      // Forum posts
      await CommunityForum.update(
        {
          creator_id: receivingAdmin.id,
          is_ownership_transferred: true,
          original_owner_name: deletedUserName,
        },
        { where: { creator_id: userId }, transaction: t }
      );

      // Forum comments
      await Comments.update(
        {
          user_id: receivingAdmin.id,
          is_ownership_transferred: true,
          original_owner_name: deletedUserName,
        },
        { where: { user_id: userId }, transaction: t }
      );

      // Community chat groups created by user
      await Community.update(
        {
          created_by: receivingAdmin.id,
          is_ownership_transferred: true,
          original_owner_name: deletedUserName,
        },
        { where: { created_by: userId }, transaction: t }
      );

      // Community chat messages sent by user
      await CommunityMessage.update(
        {
          user_id: receivingAdmin.id,
          is_ownership_transferred: true,
        },
        { where: { user_id: userId }, transaction: t }
      );

      // Video guides submitted by user
      await Video.update(
        {
          submittedBy: receivingAdmin.id,
          is_ownership_transferred: true,
          original_owner_name: deletedUserName,
        },
        { where: { submittedBy: userId }, transaction: t }
      );

      // FAQs created by user
      await FAQ.update(
        { created_by: receivingAdmin.id },
        { where: { created_by: userId }, transaction: t }
      );

      // --- Nullify sender on private/support messages (preserve message history) ---
      await PersonalMessage.update(
        { sender_id: null },
        { where: { sender_id: userId }, transaction: t }
      );
      await SupportChatMessage.update(
        { sender_id: null },
        { where: { sender_id: userId }, transaction: t }
      );

      // --- Remove membership/participation records (no standalone content value) ---
      await CommunityMember.destroy({ where: { user_id: userId }, transaction: t });
      await ConversationParticipant.destroy({ where: { user_id: userId }, transaction: t });
      await SupportMember.destroy({ where: { user_id: userId }, transaction: t });

      // --- Finally destroy the user ---
      await targetUser.destroy({ transaction: t });
    });

    await broadcastUserSummaryStats();
    await broadcastStats(true);

    res.json({ message: "User deleted successfully. Their content has been transferred to admin." });
  } catch (err) {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Server error" });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { query, filter = {}, page = 1, pageSize = 12 } = req.query;

    const currentUserId = req.user?.id;

    if (!query || !query.trim()) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const offset = (page - 1) * pageSize;

    const where = {
      [Op.and]: [
        {
          [Op.or]: [
            { userid: { [Op.iLike]: `%${query}%` } },
            { name: { [Op.iLike]: `%${query}%` } },
            { email: { [Op.iLike]: `%${query}%` } },
          ],
        },
      ],
    };

    if (currentUserId) {
      where[Op.and].push({ id: { [Op.ne]: currentUserId } });
    }

    if (filter.role) where.role = filter.role;
    if (filter.status) where.status = filter.status;
    if (filter.gender) where.gender = filter.gender;
    if (filter.country_code) where.country_code = filter.country_code;
    if (filter.region) where.region = filter.region;

    const { rows: users, count: total } = await User.findAndCountAll({
      where,
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
      limit: pageSize,
      offset,
    });

    res.status(200).json({
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      users,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getLiveUsers = async (req, res) => {
  try {
    // Retrieve the actual live users from the server's memory
    const liveUsers = getActiveUsersMap();

    return res.status(200).json({
      success: true,
      data: liveUsers
    });
  } catch (error) {
    console.error("Error in getLiveUsers controller:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve live users"
    });
  }
};
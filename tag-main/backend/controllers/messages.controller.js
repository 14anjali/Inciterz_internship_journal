import "../models/associations.js";
import ConversationParticipant from "../models/conversation_participant.model.js";
import PersonalMessage from "../models/personal_message.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";
import sequelize from "../lib/db.js";

/**
 * GET /api/messages/unread-count
 * Returns total unread for the messages icon: direct messages + community mentions.
 */
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 1) Direct messages: count messages from others in user's conversations that are after last_read_at
    const participants = await ConversationParticipant.findAll({
      where: { user_id: userId },
      attributes: ["conversation_id", "last_read_at"],
    });

    let directCount = 0;
    const cutoff = new Date(0);
    for (const p of participants) {
      const where = {
        conversation_id: p.conversation_id,
        sender_id: { [Op.ne]: userId },
        is_deleted: false,
      };
      if (p.last_read_at) {
        where.created_at = { [Op.gt]: p.last_read_at };
      }
      const n = await PersonalMessage.count({ where });
      directCount += n;
    }

    // 2) Community mentions: messages where user is in mentioned_user_ids and after last_community_mentions_read_at
    const user = await User.findByPk(userId, {
      attributes: ["last_community_mentions_read_at"],
    });
    const mentionsReadAt = user?.last_community_mentions_read_at || new Date(0);

    let communityMentionsCount = 0;
    try {
      const [rows] = await sequelize.query(
        `SELECT COUNT(*)::int AS c FROM community_messages
         WHERE is_deleted = false AND created_at > :readAt
         AND :userId = ANY(COALESCE(mentioned_user_ids, ARRAY[]::uuid[]))`,
        { replacements: { readAt: mentionsReadAt, userId }, type: sequelize.QueryTypes.SELECT }
      );
      communityMentionsCount = (Array.isArray(rows) ? rows[0] : rows)?.c ?? 0;
    } catch (e) {
      console.error("Community mentions count error:", e.message);
    }

    const total = directCount + communityMentionsCount;

    return res.status(200).json({
      directCount,
      communityMentionsCount,
      total,
    });
  } catch (err) {
    console.error("getUnreadCount error:", err.message);
    return res.status(500).json({ message: "Failed to get unread count" });
  }
};

/**
 * PATCH /api/messages/conversation/:conversationId/read
 * Mark a private conversation as read (updates last_read_at for current user).
 */
export const markConversationRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { conversationId } = req.params;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [updated] = await ConversationParticipant.update(
      { last_read_at: new Date() },
      { where: { conversation_id: conversationId, user_id: userId } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Conversation not found or access denied" });
    }

    return res.status(200).json({ message: "Marked as read" });
  } catch (err) {
    console.error("markConversationRead error:", err.message);
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};

/**
 * PATCH /api/messages/community-mentions/read
 * Mark community chat mentions as read (updates last_community_mentions_read_at).
 */
export const markCommunityMentionsRead = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await User.update(
      { last_community_mentions_read_at: new Date() },
      { where: { id: userId } }
    );

    return res.status(200).json({ message: "Community mentions marked as read" });
  } catch (err) {
    console.error("markCommunityMentionsRead error:", err.message);
    return res.status(500).json({ message: "Failed to mark as read" });
  }
};

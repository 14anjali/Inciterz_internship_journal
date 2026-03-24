/**
 * Helper to create a site-wide notification (new community post, guide, species).
 * Call this when content is approved/created on the website.
 */
import Notification from "../models/notification.model.js";

/**
 * @param {Object} opts
 * @param {"community_post"|"text_guide"|"video_guide"|"new_species"} opts.type
 * @param {string} opts.referenceId - UUID of the post/guide/species
 * @param {string} opts.title - Short title for the notification
 * @param {string} [opts.linkPath] - Frontend path (e.g. /community-forum, /text-guides/123)
 */
export async function createNotification({ type, referenceId, title, linkPath }) {
  try {
    await Notification.create({
      type,
      reference_id: referenceId,
      title: title || "New update",
      link_path: linkPath || null,
    });
  } catch (err) {
    console.error("createNotification error:", err.message);
  }
}

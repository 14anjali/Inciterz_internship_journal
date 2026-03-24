// controllers/videoGuide.controller.js
import { Op } from "sequelize";
import VideoGuide from "../models/video.model.js";
import User from "../models/user.model.js";
import { getVideoDetails } from "../utils/youtube.util.js";
import { broadcastStats, broadcastContentStats } from "../lib/statsBroadcaster.js";
import { createNotification } from "../lib/createNotification.js";

export const createVideoGuide = async (req, res) => {
  try {
    const { title, youtubeLink, category, description } = req.body;
    const userId = req.user.id;
    const videoId = youtubeLink
      ? youtubeLink.split("v=")[1]?.substring(0, 11)
      : null;

    if (!title || !youtubeLink || !videoId) {
      return res
        .status(400)
        .json({ message: "Title, YouTube link, and video ID are required." });
    }

    const existing = await VideoGuide.findOne({ where: { videoId } });
    if (existing)
      return res.status(409).json({ message: "Video already exists." });

    const videoDetails = await getVideoDetails(videoId);
    const channelAvatarUrl = videoDetails?.channelAvatarUrl || null;

    const finalTitle = title.trim() || videoDetails?.title;
    const finalDescription = description?.trim() || videoDetails?.description;
    const newStatus =
      req.user && req.user.role === "admin" ? "approved" : "pending";
    const newVideo = await VideoGuide.create({
      title: finalTitle,
      youtubeLink,
      videoId,
      description: finalDescription,
      category,
      submittedBy: userId,
      channelAvatarUrl,
      status: newStatus,
    });

    if (newStatus === "approved") {
      await createNotification({
        type: "video_guide",
        referenceId: newVideo.id,
        title: `New video guide: ${finalTitle}`,
        linkPath: `/view/video/${newVideo.id}`,
      });
    }

    // Broadcast updates
    await Promise.all([
      broadcastStats(true),
      broadcastContentStats(),
    ]);

    res
      .status(201)
      .json({ message: "Video guide created successfully.", video: newVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating video guide." });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const isPrivileged =
      req.user && (req.user.role === "admin" || req.user.role === "support");

    const search = req.query.search || "";
    const where = isPrivileged ? {} : { submittedBy: req.user.id };

    if (search && search.trim()) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search.trim()}%` } },
        { description: { [Op.iLike]: `%${search.trim()}%` } },
      ];
    }

    const videos = await VideoGuide.findAll({
      where,
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "userid", "name", "email", "role"],
        },
      ],
    });

    res.status(200).json({
      message: "all video fetched successfully.",
      video: videos,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos." });
  }
};

export const approveVideo = async (req, res) => {
  try {
    const { ids } = req.body; // Expect array of ids

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "ids must be a non-empty array" });
    }

    await VideoGuide.update(
      { status: "approved" },
      {
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      }
    );

    const approvedVideos = await VideoGuide.findAll({
      where: { id: { [Op.in]: ids } },
      attributes: ["id", "title"],
    });
    for (const v of approvedVideos) {
      await createNotification({
        type: "video_guide",
        referenceId: v.id,
        title: `New video guide: ${v.title}`,
        linkPath: `/view/video/${v.id}`,
      });
    }

    // Broadcast updates
    await Promise.all([
      broadcastStats(true),
      broadcastContentStats(),
    ]);

    res.json({
      message: "Videos approved.",
      updatedCount: approvedVideos.length,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};

export const rejectVideo = async (req, res) => {
  try {
    const { ids } = req.body; // expect array of ids

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "ids must be a non-empty array" });
    }

    const updatedCount = await VideoGuide.update(
      { status: "rejected" },
      {
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      }
    );

    // Broadcast updates
    await Promise.all([
      broadcastStats(true),
      broadcastContentStats(),
    ]);

    res.json({
      message: "Videos rejected successfully.",
      updatedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject videos",
      error: error.message,
    });
  }
};

export const deleteVideoGuide = async (req, res) => {
  try {
    const { ids } = req.body; // array of ids

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "ids must be a non-empty array" });
    }

    const videos = await VideoGuide.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    if (!videos.length) {
      return res.status(404).json({ message: "No videos found." });
    }

    if (req.user.role !== "admin") {
      const unauthorized = videos.some(
        (video) =>
          video.submittedBy !== req.user.id || video.status !== "pending"
      );
      if (unauthorized) {
        return res.status(403).json({
          message:
            "You can only delete your own videos while they are in pending status.",
        });
      }
    }

    const deletedCount = await VideoGuide.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    // Broadcast updates
    await Promise.all([
      broadcastStats(true),
      broadcastContentStats(),
    ]);

    res.json({
      message: "Videos deleted successfully.",
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete videos",
      error: error.message,
    });
  }
};

export const deleteSelectedVideos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ message: "ids must be a non-empty array" });
    }

    const videos = await VideoGuide.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    if (!videos.length) {
      return res.status(404).json({ message: "No videos found." });
    }

    if (req.user.role !== "admin") {
      const unauthorized = videos.some(
        (video) =>
          video.submittedBy !== req.user.id || video.status !== "pending"
      );
      if (unauthorized) {
        return res.status(403).json({
          message:
            "You can only delete your own videos while they are in pending status.",
        });
      }
    }

    const deletedCount = await VideoGuide.destroy({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    });

    // Broadcast updates
    await Promise.all([
      broadcastStats(true),
      broadcastContentStats(),
    ]);

    res.json({
      message: "Videos deleted successfully.",
      deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete videos",
      error: error.message,
    });
  }
};

export const getActiveVideoGuides = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 12; // 4 items per row, 3 rows = 12 items per page
    const offset = (page - 1) * limit;
    const search = req.query.search || "";

    // Build where clause with search
    const whereClause = { isActive: true, status: "approved" };
    if (search && search.trim()) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search.trim()}%` } },
        { description: { [Op.iLike]: `%${search.trim()}%` } },
        { category: { [Op.iLike]: `%${search.trim()}%` } },
      ];
    }

    const { rows: videos, count: total } = await VideoGuide.findAndCountAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
      limit: limit,
      offset,
    });

    res.status(200).json({
      message: "Active video guides fetched successfully",
      videos,
      pagination: {
        total_items: total,
        current_page: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching active video guides:", error);
    res.status(500).json({
      message: "Failed to load video guides.",
      videos: [],
      pagination: {
        total_items: 0,
        current_page: 1,
        totalPages: 0,
        pageSize: 0,
      },
    });
  }
};

// 🧭 Admin route: Toggle 'isActive' status
export const toggleVideoActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await VideoGuide.findByPk(id);
    if (!video) return res.status(404).json({ message: "Video not found." });

    video.isActive = !video.isActive;
    await video.save();

    res.status(200).json({
      message: `Video is now ${video.isActive ? "active" : "inactive"}.`,
      video,
    });
  } catch (error) {
    console.error("Error toggling active status:", error);
    res.status(500).json({ message: "Error updating video status." });
  }
};

// Get video guide by ID
export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await VideoGuide.findByPk(id, {
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["id", "userid", "name", "email", "role"],
        },
      ],
    });

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.status(200).json(video);
  } catch (error) {
    console.error("Error fetching video guide:", error);
    res.status(500).json({ message: "Error fetching video guide" });
  }
};

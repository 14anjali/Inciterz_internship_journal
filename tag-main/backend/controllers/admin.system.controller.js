import axios from "axios";
import AdminLog from "../models/adminLog.model.js";

// Cloudflare Constants (Should ideally be in .env)
const CF_ZONE_ID = process.env.CLOUDFLARE_ZONE_ID || "597d738b1500c2751e6da101027aa891";
const CF_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || "yeROpmO3zK7arsjIcGbJQiEkQc6Z6hSa_377hxuh";

export const purgeCache = async (req, res) => {
  const adminUser = req.user; // Assumes auth middleware populates this
  
  // Get IP with priority: Cloudflare > Real IP > Forwarded > Direct
  let ipAddress = 
    req.headers['cf-connecting-ip'] || 
    req.headers['x-real-ip'] || 
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 
    req.ip || 
    req.connection.remoteAddress;

  // Clean up IPv6 mapped IPv4
  if (ipAddress && ipAddress.startsWith('::ffff:')) {
    ipAddress = ipAddress.replace('::ffff:', '');
  }

  // Attempt to capture both IPv4 and IPv6 if available (e.g. from X-Forwarded-For or specific headers)
  // Note: Standard requests only have one source IP. This handles edge cases where proxy might provide both.
  const ipv6 = req.headers['cf-connecting-ipv6'] || null;
  if (ipv6 && ipv6 !== ipAddress && ipAddress.includes('.')) {
      ipAddress = `${ipAddress} / ${ipv6}`;
  }

  try {
    // 1. Call Cloudflare API
    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/purge_cache`,
      { purge_everything: true },
      {
        headers: {
          "Authorization": `Bearer ${CF_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const resultData = response.data;
    const isSuccess = resultData.success;
    const status = isSuccess ? "SUCCESS" : "FAILED";

    // 2. Log the result
    await AdminLog.create({
      admin_id: adminUser.id,
      admin_email: adminUser.email,
      action: "PURGE_CACHE",
      status: status,
      details: resultData,
      ip_address: ipAddress,
    });

    if (isSuccess) {
      return res.status(200).json({
        success: true,
        message: "Cache purged successfully.",
        data: resultData
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Cloudflare refused the purge request.",
        data: resultData
      });
    }

  } catch (error) {
    console.error("Cache purge error:", error);

    // Log the failure
    await AdminLog.create({
      admin_id: adminUser?.id || "unknown",
      admin_email: adminUser?.email || "unknown",
      action: "PURGE_CACHE",
      status: "ERROR",
      details: {
        message: error.message,
        response: error.response?.data
      },
      ip_address: ipAddress,
    });

    return res.status(500).json({
      success: false,
      message: "Internal server error during cache purge.",
      error: error.message
    });
  }
};

export const getSystemLogs = async (req, res) => {
  try {
    const logs = await AdminLog.findAll({
      order: [['createdAt', 'DESC']],
      limit: 100, // Limit to last 100 logs
    });

    return res.status(200).json({
      success: true,
      logs
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch system logs."
    });
  }
};

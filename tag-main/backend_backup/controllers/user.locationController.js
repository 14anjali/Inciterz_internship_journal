import User from "../models/user.model.js";
import {
  getClientIp,
  getGeoLocation,
} from "../utils/location.util.js";

export const getUserLocations = async (req, res) => {
  try {
    const userId = req.user.id;

    const ipAddress = getClientIp(req);
    const location = await getGeoLocation(ipAddress);

    const updateData = {
      ip_address: ipAddress,
      last_seen: new Date(),
    };

    if (location) {
      if (location.country_code) updateData.country_code = location.country_code;
      if (location.region) updateData.region = location.region;
      if (location.latitude !== null && location.latitude !== undefined) updateData.latitude = location.latitude;
      if (location.longitude !== null && location.longitude !== undefined) updateData.longitude = location.longitude;
    }

    // Update user location info
    await User.update(updateData, { where: { id: userId } });

    return res.status(200).json({
      message: "User location updated successfully",
      location: {
        ip_address: ipAddress,
        country_code: updateData.country_code || null,
        region: updateData.region || null,
        latitude: updateData.latitude || null,
        longitude: updateData.longitude || null,
      },
    });
  } catch (error) {
    console.error("Error fetching user location:", error);
    return res.status(500).json({
      message: "Failed to get user location",
    });
  }
};

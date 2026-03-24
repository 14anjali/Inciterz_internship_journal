import User from "../models/user.model.js";
import Guest from "../models/guestModel.js";
import sequelize from "../lib/db.js";
import { Op, QueryTypes } from "sequelize";

export const fetchUserSummaryData = async () => {
  const [
    totalRegisteredUsers,
    inactiveUsers,
    activeUsers,
    lockedUsers,
    supportUsers,
    adminUsers,
    guestUsers,
  ] = await Promise.all([
    // Total users
    User.count(),

    // Status based
    User.count({ where: { status: "inactive" } }),
    User.count({ where: { status: "active" } }),
    User.count({ where: { status: "locked" } }),

    // Role based
    User.count({ where: { role: "support" } }),
    User.count({ where: { role: "admin" } }),

    // Guests
    Guest.count(),
  ]);

  return {
    total_users: totalRegisteredUsers,
    active_users: activeUsers,
    inactive_users: inactiveUsers,
    locked_users: lockedUsers,
    support_users: supportUsers,
    admin_users: adminUsers,
    guest_users: guestUsers,
  };
};

export const getUserSummaryStats = async (req, res) => {
  try {
    const data = await fetchUserSummaryData();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("User summary stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserGrowthStats = async (req, res) => {
  try {
    const interval = typeof req.query.interval === "string" ? req.query.interval : "monthly";
    const rawStart = typeof req.query.startDate === "string" ? req.query.startDate : undefined;
    const rawEnd = typeof req.query.endDate === "string" ? req.query.endDate : undefined;

    let unit;
    let bucketCount;
    const now = new Date();
    let start;
    let end;

    if (interval === "weekly") {
      unit = "day";
      bucketCount = 7;
      end = new Date(now);
      end.setHours(23, 59, 59, 999);
      start = new Date(end);
      start.setDate(end.getDate() - (bucketCount - 1));
    } else if (interval === "yearly") {
      unit = "year";
      bucketCount = 5;
      const endYear = now.getFullYear();
      const startYear = endYear - (bucketCount - 1);
      start = new Date(startYear, 0, 1, 0, 0, 0, 0);
      end = new Date(endYear, 11, 31, 23, 59, 59, 999);
    } else if (interval === "custom" && rawStart && rawEnd) {
      unit = "day";
      const parsedStart = new Date(rawStart);
      const parsedEnd = new Date(rawEnd);
      if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedEnd.getTime()) || parsedStart > parsedEnd) {
        return res.status(400).json({
          success: false,
          message: "Invalid custom date range",
        });
      }
      start = new Date(parsedStart);
      start.setHours(0, 0, 0, 0);
      end = new Date(parsedEnd);
      end.setHours(23, 59, 59, 999);
      const maxDays = 60;
      const diffDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      bucketCount = Math.min(maxDays, diffDays + 1);
    } else {
      unit = "month";
      bucketCount = 12;
      const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      end = new Date(
        endMonth.getFullYear(),
        endMonth.getMonth(),
        endMonth.getDate(),
        23,
        59,
        59,
        999
      );
      const startMonth = new Date(end);
      startMonth.setMonth(startMonth.getMonth() - (bucketCount - 1), 1);
      start = new Date(startMonth.getFullYear(), startMonth.getMonth(), 1, 0, 0, 0, 0);
    }

    const unitToken = unit === "day" ? "day" : unit === "year" ? "year" : "month";

    const rows = await sequelize.query(
      `
      SELECT
        date_trunc('${unitToken}', "createdAt") AS bucket,
        role,
        COUNT(*)::int AS count
      FROM "Users"
      WHERE "createdAt" BETWEEN :start AND :end
        AND role IN ('admin', 'support', 'user')
      GROUP BY bucket, role
      ORDER BY bucket ASC;
    `,
      {
        type: QueryTypes.SELECT,
        replacements: {
          start: start.toISOString(),
          end: end.toISOString(),
        },
      }
    );

    const bucketMap = new Map();
    for (const row of rows) {
      if (!row || !row.bucket || !row.role) continue;
      const bucketDate = new Date(row.bucket);
      const key =
        unitToken === "day"
          ? bucketDate.toISOString().slice(0, 10)
          : unitToken === "month"
          ? `${bucketDate.getFullYear()}-${String(bucketDate.getMonth() + 1).padStart(2, "0")}`
          : String(bucketDate.getFullYear());

      if (!bucketMap.has(key)) {
        bucketMap.set(key, { admin: 0, support: 0, user: 0 });
      }
      const entry = bucketMap.get(key);
      if (row.role === "admin") {
        entry.admin += Number(row.count) || 0;
      } else if (row.role === "support") {
        entry.support += Number(row.count) || 0;
      } else if (row.role === "user") {
        entry.user += Number(row.count) || 0;
      }
    }

    const data = [];
    const cursor = new Date(start);

    for (let i = 0; i < bucketCount; i += 1) {
      const key =
        unitToken === "day"
          ? cursor.toISOString().slice(0, 10)
          : unitToken === "month"
          ? `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`
          : String(cursor.getFullYear());

      const entry = bucketMap.get(key) || { admin: 0, support: 0, user: 0 };

      let label;
      if (unitToken === "day") {
        label = cursor.toLocaleDateString(undefined, { month: "short", day: "numeric" });
      } else if (unitToken === "month") {
        label = cursor.toLocaleDateString(undefined, { month: "short", year: "2-digit" });
      } else {
        label = String(cursor.getFullYear());
      }

      data.push({
        label,
        admin: entry.admin,
        support: entry.support,
        user: entry.user,
      });

      if (unitToken === "day") {
        cursor.setDate(cursor.getDate() + 1);
      } else if (unitToken === "month") {
        cursor.setMonth(cursor.getMonth() + 1);
      } else {
        cursor.setFullYear(cursor.getFullYear() + 1);
      }
    }

    return res.status(200).json({
      success: true,
      interval,
      start: start.toISOString(),
      end: end.toISOString(),
      data,
    });
  } catch (error) {
    console.error("User growth stats error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

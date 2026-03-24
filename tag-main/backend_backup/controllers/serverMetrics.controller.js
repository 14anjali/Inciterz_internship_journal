// backend/controllers/serverMetrics.controller.js
import si from "systeminformation";

const METRICS_HISTORY = [];
const MAX_HISTORY_SAMPLES = 2000;

const buildSample = (load, mem, disks, nets) => {
  const totalMem = mem.total;
  const usedMem = mem.active || (mem.total - mem.available);
  const memUsage = (usedMem / totalMem) * 100;

  const swapTotal = mem.swaptotal ?? 0;
  const swapUsed = mem.swapused ?? 0;
  const hasSwap = swapTotal > 0;
  const swapUsage = hasSwap ? (swapUsed / swapTotal) * 100 : 0;

  const totalDisk = disks.reduce((sum, d) => sum + d.size, 0);
  const usedDisk = disks.reduce((sum, d) => sum + d.used, 0);
  const diskUsage = totalDisk > 0 ? (usedDisk / totalDisk) * 100 : 0;

  const totalRx = nets.reduce((sum, n) => sum + n.rx_bytes, 0);
  const totalTx = nets.reduce((sum, n) => sum + n.tx_bytes, 0);

  const rawIoWait = load.currentLoadWait;
  const ioWaitPercent =
    typeof rawIoWait === "number" && rawIoWait >= 0 ? rawIoWait : null;

  const timestamp = new Date().toISOString();

  return {
    cpu: {
      usagePercent: load.currentLoad,
      ioWaitPercent,
    },
    memory: {
      totalBytes: totalMem,
      usedBytes: usedMem,
      usagePercent: memUsage,
      swapTotalBytes: hasSwap ? swapTotal : 0,
      swapUsedBytes: hasSwap ? swapUsed : 0,
      swapUsagePercent: swapUsage,
    },
    disk: {
      totalBytes: totalDisk,
      usedBytes: usedDisk,
      usagePercent: diskUsage,
    },
    network: {
      totalRxBytes: totalRx,
      totalTxBytes: totalTx,
    },
    timestamp,
  };
};

export const getServerMetrics = async (req, res) => {
  try {
    const [load, mem, disks, nets] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
    ]);

    const sample = buildSample(load, mem, disks, nets);

    METRICS_HISTORY.push(sample);
    if (METRICS_HISTORY.length > MAX_HISTORY_SAMPLES) {
      METRICS_HISTORY.splice(0, METRICS_HISTORY.length - MAX_HISTORY_SAMPLES);
    }

    res.json(sample);
  } catch (err) {
    console.error("Server metrics error:", err);
    res.status(500).json({ message: "Failed to read system metrics" });
  }
};

export const getServerMetricsHistory = (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: "start and end are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return res.status(400).json({ message: "Invalid date range" });
    }

    const data = METRICS_HISTORY.filter((sample) => {
      const ts = new Date(sample.timestamp).getTime();
      return ts >= startDate.getTime() && ts <= endDate.getTime();
    });

    res.json({
      success: true,
      start: startDate.toISOString(),
      end: endDate.toISOString(),
      data,
    });
  } catch (err) {
    console.error("Server metrics history error:", err);
    res.status(500).json({ message: "Failed to read system metrics history" });
  }
};

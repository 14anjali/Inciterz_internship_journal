import { useQuery } from "@tanstack/react-query";
import httpClient from "@/api/axiosSetup";

interface ServerStatsResponse {
  cpu: { usagePercent: number; ioWaitPercent: number | null };
  memory: {
    totalBytes: number;
    usedBytes: number;
    usagePercent: number;
    swapTotalBytes: number | null;
    swapUsedBytes: number | null;
    swapUsagePercent: number | null;
  };
  disk: { totalBytes: number; usedBytes: number; usagePercent: number };
  network: { totalRxBytes: number; totalTxBytes: number };
  timestamp: string;
}

const fetchServerStats = async (): Promise<ServerStatsResponse> => {
  const res = await httpClient.get<ServerStatsResponse>("/stats/system", {
    headers: { useAuth: true },
  });
  return res.data;
};

export const useServerStats = () =>
  useQuery({
    queryKey: ["serverStats"],
    queryFn: fetchServerStats,
    refetchInterval: 3000, // refresh every 10s (10_000)
  });

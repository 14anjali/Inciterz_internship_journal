import { useQuery } from "@tanstack/react-query";
import httpClient from "@/api/axiosSetup";

interface WaitEvent {
  event: string;
  count: number;
}

interface TableBloatEntry {
  schemaname: string;
  relname: string;
  n_live_tup: number;
  n_dead_tup: number;
  dead_tuple_ratio: number;
}

interface PostgresStatsResponse {
  essential: {
    meanExecTimeMs: number | null;
    totalCalls: number | null;
    sharedBufferHitRatio: number | null;
    transactionThroughputTps: number | null;
  };
  deepHealth: {
    activeConnections: number;
    idleConnections: number;
    waitEvents: WaitEvent[];
    tableBloat: TableBloatEntry[];
    replicationLagBytes: number | null;
    replicationLagMb: number | null;
  };
  meta: {
    database: string;
    statsReset: string | null;
  };
}

const fetchPostgresStats = async (): Promise<PostgresStatsResponse> => {
  const res = await httpClient.get<PostgresStatsResponse>("/stats/postgres", {
    headers: { useAuth: true },
  });
  return res.data;
};

export const usePostgresStats = () =>
  useQuery({
    queryKey: ["postgresStats"],
    queryFn: fetchPostgresStats,
    refetchInterval: 15000,
  });


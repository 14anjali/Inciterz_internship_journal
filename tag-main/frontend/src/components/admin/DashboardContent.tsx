import { useEffect, useMemo, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { socket } from "@/lib/socket";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import {
  UserCheck,
  UserX,
  Radio,
  Lock,
  HeadphonesIcon,
  ShieldCheck,
  Cpu,
  HardDrive,
  Network,
  Activity,
  Fish,
  FolderOpen,
  Image,
  MessageCircle,
  Clock,
  Zap,
  Database,
  Sprout,
  Download,
  Upload,
  MemoryStick,
} from "lucide-react";
import { useUserSummary } from "@/hooks/useUserSummary";
import { UserSummaryStatsResponse } from "@/api/apiTypes";
import CircularLoader from "../ui/CircularLoader";
import { useServerStats } from "@/hooks/useServerStats";
import { useQueryClient } from "@tanstack/react-query";
import { useContentStats } from "@/hooks/useContentStats";
import { usePostgresStats } from "@/hooks/usePostgresStats";
import httpClient from "@/api/axiosSetup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
  Tooltip,
} from "recharts";

// --- TYPES ---

type TimeInterval = "weekly" | "monthly" | "yearly" | "custom";

type UserGrowthPoint = {
  label: string;
  admin: number;
  support: number;
  user: number;
};

const chartConfig = {
  admin: { label: "Admin", color: "#2563eb" },
  support: { label: "Support", color: "#059669" },
  user: { label: "User", color: "#f59e0b" },
} as const;

// --- MAIN CONTENT ---

export const DashboardContent = () => {
  const { data, isLoading } = useUserSummary();
  const userSummary = data as UserSummaryStatsResponse | undefined;
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleUserSummaryUpdate = (newData: any) => {
      // Optimistically update the cache
      queryClient.setQueryData(["userSummary"], {
        success: true,
        data: newData,
      });
    };

    const handleContentStatsUpdate = (newData: any) => {
      queryClient.setQueryData(["contentStats"], newData);
    };

    socket.on("userSummaryUpdate", handleUserSummaryUpdate);
    socket.on("contentStatsUpdate", handleContentStatsUpdate);

    return () => {
      socket.off("userSummaryUpdate", handleUserSummaryUpdate);
      socket.off("contentStatsUpdate", handleContentStatsUpdate);
    };
  }, [queryClient]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Accounts Overview</h2>
        <AccountsTab data={userSummary} isLoading={isLoading} />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Server Performance</h2>
        <ServerTab />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Content Summary</h2>
        <ContentTab />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-foreground">Database Health</h2>
        <DatabaseTab />
      </section>
    </div>
  );
};

// --- LIVE ACTIVE USERS CARD ---

const LiveActiveUsersCard = () => {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<{ index: number; value: number }[]>([]);
  const { userid, role } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const auth: { userId?: string | null; role?: string | null } = {};
    if (userid) auth.userId = userid;
    if (role) auth.role = role;
    socket.auth = auth;
    
    if (socket.connected) {
      socket.disconnect();
    }
    socket.connect();

    const handleUpdate = (data: unknown) => {
      if (Array.isArray(data)) {
        setCount(data.length);
        setHistory((prev) => {
          const newHistory = [...prev, { index: prev.length, value: data.length }];
          return newHistory.slice(-20);
        });
      }
    };

    socket.on("live-tracking-update", handleUpdate);
    
    const fetchLive = async () => {
       try {
         const res = await httpClient.get("/manage_users/live-users", { headers: { useAuth: true } });
         if (res.data?.success && Array.isArray(res.data.data)) {
           handleUpdate(res.data.data);
         }
       } catch (e) { console.error(e); }
    };
    fetchLive();

    return () => {
      socket.off("live-tracking-update", handleUpdate);
      socket.disconnect();
    };
  }, [userid, role]);

  return (
    <div className="p-3 bg-card rounded-lg border border-border flex flex-col justify-between min-h-[88px]">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-4 w-4 text-green-500" />
          <span className="text-xs text-muted-foreground font-medium">Active Users (Live)</span>
        </div>
        <div className="flex items-center justify-between gap-2 h-10">
          <p className="text-xl font-bold text-foreground">{count}</p>
          <div className="h-[30px] w-[60px]">
             <LineChart width={60} height={30} data={history}>
               <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
               <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
             </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- ACCOUNTS TAB ---

const AccountsTab = (props: { data?: UserSummaryStatsResponse; isLoading: boolean }) => {
  const accountStats = [
    { label: "Active Accounts", value: props?.data?.data?.active_users || 0, icon: UserCheck, color: "text-green-500" },
    { label: "Inactive Users", value: props?.data?.data?.inactive_users || 0, icon: UserX, color: "text-amber-500" },
    { label: "Guest Users", value: props?.data?.data?.guest_users || 0, icon: Radio, color: "text-emerald-500" },
    { label: "Locked Users", value: props?.data?.data?.locked_users || 0, icon: Lock, color: "text-red-500" },
    { label: "Support Users", value: props?.data?.data?.support_users || 0, icon: HeadphonesIcon, color: "text-blue-500" },
    { label: "Admin Users", value: props?.data?.data?.admin_users || 0, icon: ShieldCheck, color: "text-purple-500" },
  ];

  if (props.isLoading) {
    return (
      <div className="py-10">
        <CircularLoader />
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          <LiveActiveUsersCard />
          {accountStats.map((stat) => (
            <div key={stat.label} className="p-3 bg-card rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={cn("h-4 w-4", stat.color)} />
                <span className="text-xs text-muted-foreground truncate">{stat.label}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2">
        <UserGrowthChart />
      </div>
    </div>
  );
};

// --- USER GROWTH CHART (TABS CONTAINER) ---

const UserGrowthChart = () => {
  return (
    <Card className="h-full">
      <Tabs defaultValue="registrations" className="w-full h-full flex flex-col">
        <CardHeader className="pb-2 space-y-4">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-[320px] grid-cols-2 h-9">
              <TabsTrigger value="registrations" className="text-xs">New Registrations</TabsTrigger>
              <TabsTrigger value="growthByType" className="text-xs">User Growth by Type</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <TabsContent value="registrations" className="mt-0 flex-1 outline-none border-none">
          <RegistrationsView />
        </TabsContent>

        <TabsContent value="growthByType" className="mt-0 flex-1 outline-none border-none">
          <GrowthByTimeView />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

// --- TAB 1: NEW REGISTRATIONS VIEW ---

const RegistrationsView = () => {
  const [interval, setInterval] = useState<TimeInterval>("monthly");
  const [chartData, setChartData] = useState<UserGrowthPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      if (interval === "custom" && (!customStart || !customEnd)) return;
      setLoading(true);
      try {
        const params: Record<string, string> = { interval };
        if (interval === "custom") {
          params.startDate = customStart;
          params.endDate = customEnd;
        }
        const res = await httpClient.get("/manage_users/stats/user-growth", { params, headers: { useAuth: true } });
        setChartData(res.data.data || []);
      } catch (err) {
        console.error("Registrations fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [interval, customStart, customEnd]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 flex items-center justify-between mb-2">
        <div className="flex gap-1">
          {["weekly", "monthly", "yearly", "custom"].map((opt) => (
            <button
              key={opt}
              onClick={() => setInterval(opt as TimeInterval)}
              className={cn(
                "px-2 py-1 rounded border text-[10px] transition-colors",
                interval === opt ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:bg-muted text-muted-foreground"
              )}
            >
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </button>
          ))}
        </div>
        <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
      </div>

      {interval === "custom" && (
        <div className="px-6 flex items-center gap-2 mb-3 text-[10px] text-muted-foreground">
          <span>From</span>
          <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)} className="bg-background border rounded px-1 h-6" />
          <span>to</span>
          <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="bg-background border rounded px-1 h-6" />
        </div>
      )}

      {loading ? (
        <div className="h-[200px] flex items-center justify-center"><CircularLoader /></div>
      ) : (
        <ChartComponent data={chartData} />
      )}
    </div>
  );
};

// --- TAB 2: GROWTH BY TYPE VIEW ---

const GrowthByTimeView = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<string>(String(currentYear));
  const [chartData, setChartData] = useState<UserGrowthPoint[]>([]);
  const [loading, setLoading] = useState(false);

  const yearOptions = useMemo(() => {
    const startYear = 2025;
    const years = [];
    const limit = Math.max(currentYear, startYear);
    for (let y = limit; y >= startYear; y--) {
      years.push(String(y));
    }
    return years;
  }, [currentYear]);

  useEffect(() => {
    const fetchGrowth = async () => {
      setLoading(true);
      try {
        const res = await httpClient.get("/manage_users/stats/user-growth", {
          params: { interval: "monthly", year: selectedYear },
          headers: { useAuth: true }
        });

        // Convert raw new registration data into cumulative growth data
        let adminAcc = 0;
        let supportAcc = 0;
        let userAcc = 0;

        const cumulative = (res.data.data || []).map((point: UserGrowthPoint) => {
          adminAcc += (point.admin || 0);
          supportAcc += (point.support || 0);
          userAcc += (point.user || 0);
          return {
            label: point.label,
            admin: adminAcc,
            support: supportAcc,
            user: userAcc,
          };
        });

        setChartData(cumulative);
      } catch (err) {
        console.error("Growth fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrowth();
  }, [selectedYear]);

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 flex items-center justify-between mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="h-7 rounded border border-border bg-background px-2 text-[11px] outline-none"
        >
          {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
        <CardTitle className="text-sm font-medium">User Growth vs Time</CardTitle>
      </div>

      {loading ? (
        <div className="h-[200px] flex items-center justify-center"><CircularLoader /></div>
      ) : (
        <ChartComponent data={chartData} />
      )}
    </div>
  );
};

// --- SHARED CHART COMPONENT ---

const ChartComponent = ({ data }: { data: UserGrowthPoint[] }) => {
  return (
    <CardContent className="h-[220px] pt-0">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <LineChart data={data} margin={{ left: 10, right: 10, top: 10, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
          <XAxis 
            dataKey="label" 
            tickLine={false} 
            axisLine={false} 
            tick={{fontSize: 10}} 
            dy={10}
          />
          <YAxis 
            allowDecimals={false} 
            tickLine={false} 
            axisLine={false} 
            tick={{fontSize: 10}}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend />
          <Line 
            type="monotone" 
            dataKey="admin" 
            stroke="var(--color-admin)" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="support" 
            stroke="var(--color-support)" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 5 }}
          />
          <Line 
            type="monotone" 
            dataKey="user" 
            stroke="var(--color-user)" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  );
};

// --- SERVER PERFORMANCE TAB ---

const formatBytes = (bytes: number) => {
  if (!bytes || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes.toFixed(0)} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
};

const formatBytesToMbGb = (bytes: number) => {
  if (!bytes || bytes <= 0) return "0 MB";
  const mb = bytes / 1_000_000;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(2)} GB`;
};

type ServerHistoryPoint = {
  time: string;
  cpu: number;
  memory: number;
  disk: number;
  rxSpeed?: number;
  txSpeed?: number;
};

const serverChartConfig = {
  cpu: { label: "CPU", color: "#2563eb" },
  memory: { label: "Memory", color: "#059669" },
  disk: { label: "Disk", color: "#f59e0b" },
} as const;

const ServerTab = () => {
  const { data, isLoading } = useServerStats();
  const [liveHistory, setLiveHistory] = useState<ServerHistoryPoint[]>([]);
  const [history, setHistory] = useState<ServerHistoryPoint[]>([]);
  const [mode, setMode] = useState<"live" | "custom">("live");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);
  const lastNetworkStats = useRef<{ rx: number; tx: number; time: number } | null>(null);

  const cpuSparkData = useMemo(() => 
    liveHistory.map((point, index) => ({ index, value: point.cpu })), [liveHistory]
  );

  const networkSparkData = useMemo(() => 
    liveHistory.map((point, index) => ({ 
      index, 
      rx: point.rxSpeed || 0,
      tx: point.txSpeed || 0 
    })), [liveHistory]
  );

  const networkProgress = useMemo(() => {
    if (liveHistory.length === 0) return 0;
    const latest = liveHistory[liveHistory.length - 1];
    const currentTotal = (latest.rxSpeed || 0) + (latest.txSpeed || 0);
    const maxTotal = Math.max(...liveHistory.map(p => (p.rxSpeed || 0) + (p.txSpeed || 0)));
    if (maxTotal === 0) return 0;
    return Math.min(100, (currentTotal / maxTotal) * 100);
  }, [liveHistory]);

  const latestRx = liveHistory.length > 0 ? liveHistory[liveHistory.length - 1].rxSpeed : 0;
  const latestTx = liveHistory.length > 0 ? liveHistory[liveHistory.length - 1].txSpeed : 0;

  useEffect(() => {
    if (!data) return;
    const now = Date.now();
    const label = new Date(data.timestamp).toLocaleTimeString();
    
    let rxSpeed = 0;
    let txSpeed = 0;

    if (lastNetworkStats.current) {
      const timeDiff = (now - lastNetworkStats.current.time) / 1000; // seconds
      if (timeDiff > 0) {
        const rxDiff = data.network.totalRxBytes - lastNetworkStats.current.rx;
        const txDiff = data.network.totalTxBytes - lastNetworkStats.current.tx;
        rxSpeed = Math.max(0, rxDiff) / timeDiff;
        txSpeed = Math.max(0, txDiff) / timeDiff;
      }
    }

    lastNetworkStats.current = {
      rx: data.network.totalRxBytes,
      tx: data.network.totalTxBytes,
      time: now
    };

    setLiveHistory((prev) => {
      const next = [...prev, {
        time: label,
        cpu: data.cpu.usagePercent,
        memory: data.memory.usagePercent,
        disk: data.disk.usagePercent,
        rxSpeed,
        txSpeed
      }];
      return next.slice(-30);
    });
  }, [data]);

  useEffect(() => {
    if (mode === "live") setHistory(liveHistory);
  }, [mode, liveHistory]);

  useEffect(() => {
    if (mode !== "custom" || !customStart || !customEnd) return;
    let cancelled = false;
    const loadHistory = async () => {
      try {
        setHistoryLoading(true);
        setHistoryError(null);
        const res = await httpClient.get("/stats/system/history", {
          params: { start: new Date(customStart).toISOString(), end: new Date(customEnd).toISOString() },
          headers: { useAuth: true },
        });
        if (cancelled) return;
        const points = (res.data.data || []).map((sample: any) => ({
          time: new Date(sample.timestamp).toLocaleString(),
          cpu: sample.cpu.usagePercent,
          memory: sample.memory.usagePercent,
          disk: sample.disk.usagePercent,
        }));
        setHistory(points);
      } catch (err) {
        if (!cancelled) setHistoryError("Failed to load history");
      } finally {
        if (!cancelled) setHistoryLoading(false);
      }
    };
    loadHistory();
    return () => { cancelled = true; };
  }, [mode, customStart, customEnd]);

  if (isLoading && !data) return <div className="py-6 text-sm text-muted-foreground">Loading metrics...</div>;
  if (!data) return <div className="py-6 text-sm text-muted-foreground">No metrics available.</div>;

  const getUsageColor = (percent: number) => {
    if (percent <= 25) return "#22c55e"; // Green
    if (percent <= 50) return "#3b82f6"; // Blue
    if (percent <= 75) return "#f97316"; // Orange
    return "#ef4444"; // Red
  };

  const serverStats = [
    { 
      label: "CPU Usage", 
      value: `${data.cpu.usagePercent.toFixed(1)}%`, 
      icon: Cpu, 
      color: "#2563eb", 
      detail: "Server CPU load",
      type: "cpu",
      chartData: cpuSparkData,
      progress: data.cpu.usagePercent
    },
    { 
      label: "Memory Usage", 
      value: `${data.memory.usagePercent.toFixed(1)}%`, 
      icon: MemoryStick, 
      color: getUsageColor(data.memory.usagePercent), 
      detail: `${formatBytesToMbGb(data.memory.usedBytes)} / ${formatBytesToMbGb(data.memory.totalBytes)}`,
      type: "memory",
      chartData: [{ value: data.memory.usagePercent, fill: getUsageColor(data.memory.usagePercent) }, { value: 100 - data.memory.usagePercent, fill: getUsageColor(data.memory.usagePercent), opacity: 0.25 }],
      progress: data.memory.usagePercent
    },
    { 
      label: "Disk Usage", 
      value: `${data.disk.usagePercent.toFixed(1)}%`, 
      icon: HardDrive, 
      color: getUsageColor(data.disk.usagePercent), 
      detail: `${formatBytesToMbGb(data.disk.usedBytes)} / ${formatBytesToMbGb(data.disk.totalBytes)}`,
      type: "disk",
      chartData: [{ value: data.disk.usagePercent, fill: getUsageColor(data.disk.usagePercent) }, { value: 100 - data.disk.usagePercent, fill: getUsageColor(data.disk.usagePercent), opacity: 0.25 }],
      progress: data.disk.usagePercent
    },
    { 
      label: "Network I/O", 
      value: (
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-emerald-500">
            <Download className="h-4 w-4" />
            <span>{formatBytes(latestRx || 0)}/s</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-blue-500">
            <Upload className="h-4 w-4" />
            <span>{formatBytes(latestTx || 0)}/s</span>
          </div>
        </div>
      ),
      icon: Network, 
      color: "#9333ea", 
      detail: `Total: ${formatBytesToMbGb(data.network.totalRxBytes)} / ${formatBytesToMbGb(data.network.totalTxBytes)}`,
      type: "network",
      chartData: networkSparkData,
      progress: networkProgress
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {serverStats.map((stat) => (
          <div key={stat.label} className="p-3 bg-card rounded-lg border border-border flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
              </div>
              <div className="flex items-center justify-between gap-2 min-h-[40px]">
                <div className="text-xl font-bold text-foreground">{stat.value}</div>
                
                {stat.type === "cpu" && stat.chartData && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="h-[30px] w-[150px] cursor-pointer">
                        <LineChart width={120} height={30} data={stat.chartData}>
                          <Line type="monotone" dataKey="value" stroke={stat.color} strokeWidth={2} dot={false} isAnimationActive={false} />
                          <YAxis domain={[0, 100]} hide />
                        </LineChart>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] p-4" side="left">
                       <div className="space-y-2">
                         <h4 className="text-sm font-semibold">CPU History</h4>
                         <div className="h-[150px] w-full">
                           <LineChart width={280} height={150} data={stat.chartData}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                              <XAxis dataKey="index" hide />
                              <YAxis domain={[0, 100]} fontSize={10} />
                              <Tooltip contentStyle={{ fontSize: '12px' }} />
                              <Line type="monotone" dataKey="value" stroke={stat.color} strokeWidth={2} dot={false} name="Usage %" />
                           </LineChart>
                         </div>
                       </div>
                    </HoverCardContent>
                  </HoverCard>
                )}

                {(stat.type === "memory" || stat.type === "disk") && stat.chartData && (
                  <div className="h-[60px] w-[60px] drop-shadow-md">
                    <PieChart width={60} height={60}>
                      <Pie
                        data={stat.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={18}
                        outerRadius={28}
                        startAngle={90}
                        endAngle={-270}
                        dataKey="value"
                        stroke="none"
                        isAnimationActive={false}
                      >
                         {stat.chartData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.fill} 
                            fillOpacity={entry.opacity || 1}
                            stroke={entry.fill} 
                            strokeOpacity={entry.opacity || 1}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </div>
                )}

                {stat.type === "network" && stat.chartData && (
                   <HoverCard>
                    <HoverCardTrigger asChild>
                      <div className="h-[30px] w-[120px] cursor-pointer">
                        <LineChart width={120} height={30} data={stat.chartData}>
                          <Line type="monotone" dataKey="rx" stroke="#10b981" strokeWidth={2} dot={false} isAnimationActive={false} />
                          <Line type="monotone" dataKey="tx" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
                          <YAxis hide />
                        </LineChart>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] p-4" side="left">
                       <div className="space-y-2">
                         <h4 className="text-sm font-semibold">Network Traffic (Live)</h4>
                         <div className="flex justify-between text-xs text-muted-foreground">
                            <span className="text-emerald-500">Rx: {formatBytes(latestRx || 0)}/s</span>
                            <span className="text-blue-500">Tx: {formatBytes(latestTx || 0)}/s</span>
                         </div>
                         <div className="h-[150px] w-full">
                           <LineChart width={280} height={150} data={stat.chartData}>
                              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                              <XAxis dataKey="index" hide />
                              <YAxis fontSize={10} tickFormatter={(val) => formatBytes(val)} width={50} />
                              <Tooltip 
                                contentStyle={{ fontSize: '12px' }} 
                                formatter={(value: number) => [formatBytes(value) + '/s', '']}
                              />
                              <Line type="monotone" dataKey="rx" stroke="#10b981" strokeWidth={2} dot={false} name="Download" />
                              <Line type="monotone" dataKey="tx" stroke="#3b82f6" strokeWidth={2} dot={false} name="Upload" />
                           </LineChart>
                         </div>
                       </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
            </div>
            
            <div className="mt-2 space-y-2">
              <p className="text-[10px] text-muted-foreground truncate font-medium">{stat.detail}</p>
              <div className="h-1 bg-muted rounded-full overflow-hidden w-full">
                <div 
                  className="h-full rounded-full transition-all duration-500" 
                  style={{ 
                    width: `${stat.progress}%`,
                    backgroundColor: stat.color 
                  }} 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Card className="w-full">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-sm">Resource History</CardTitle>
            <div className="flex items-center gap-2 text-[10px]">
              {mode === "custom" && (
                <div className="flex items-center gap-2 mr-2">
                  <input type="datetime-local" value={customStart} onChange={e => setCustomStart(e.target.value)} className="bg-background border rounded px-1 h-6 text-xs" />
                  <span>-</span>
                  <input type="datetime-local" value={customEnd} onChange={e => setCustomEnd(e.target.value)} className="bg-background border rounded px-1 h-6 text-xs" />
                </div>
              )}
              <button onClick={() => setMode("live")} className={cn("px-2 py-1 rounded border", mode === "live" ? "bg-primary text-white" : "bg-background")}>Live</button>
              <button onClick={() => setMode("custom")} className={cn("px-2 py-1 rounded border", mode === "custom" ? "bg-primary text-white" : "bg-background")}>Custom</button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[200px] pt-0">
          <ChartContainer config={serverChartConfig} className="h-full w-full">
            <LineChart data={history} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis 
                dataKey="time" 
                tick={{fontSize: 10}} 
                minTickGap={30}
                tickFormatter={(value) => {
                    // Try to format nicely based on length
                    if (!value) return "";
                    // If full date string, maybe show only time or short date
                    // Assuming value is locale string as per useEffect logic
                    return value.split(',')[1] || value; 
                }}
              />
              <YAxis domain={[0, 100]} tick={{fontSize: 10}} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="cpu" stroke="var(--color-cpu)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="memory" stroke="var(--color-memory)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="disk" stroke="var(--color-disk)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

// --- CONTENT TAB ---

const ContentTab = () => {
  const { data, isLoading } = useContentStats();
  if (isLoading || !data) return <div className="py-10"><CircularLoader /></div>;

  const contentStats = [
    { label: "Total Species", value: data.totalSpecies, icon: Fish, link: "/admin#manage-species" },
    { label: "Media Files", value: data.mediaFiles, icon: FolderOpen, link: "/admin#manage-video-guides" },
    { label: "Images", value: data.images, icon: Image, link: "/admin#manage-species" },
    { label: "Aquatic Plants", value: data.aquaticPlants, icon: Sprout, link: "/admin#manage-plants" },
    { label: "Forum Posts", value: data.forumPosts, icon: MessageCircle, link: "/admin#manage-forum" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {contentStats.map((stat) => (
        <div key={stat.label} onClick={() => window.open(stat.link, "_blank")} className="p-3 bg-card rounded-lg border border-border cursor-pointer hover:bg-accent/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className="text-xl font-bold text-foreground">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// --- DATABASE TAB ---

const DatabaseTab = () => {
  const { data, isLoading, isError } = usePostgresStats();
  if (isError) return <div className="py-6 text-sm text-red-500">Failed to load database metrics.</div>;
  if (isLoading || !data) return <div className="py-6 text-sm text-muted-foreground">Loading database metrics...</div>;

  const dbStats = [
    { label: "Mean Exec Time", value: `${data.essential.meanExecTimeMs?.toFixed(2) || 0} ms`, icon: Clock },
    { label: "Total Queries", value: data.essential.totalCalls?.toLocaleString() || "0", icon: Zap },
    { label: "Shared Buffer Hit", value: `${((data.essential.sharedBufferHitRatio || 0) * 100).toFixed(2)} %`, icon: Database },
    { label: "Txn Throughput", value: `${data.essential.transactionThroughputTps?.toFixed(2) || 0} TPS`, icon: Database },
    { label: "Active vs Idle", value: `${data.deepHealth.activeConnections} / ${data.deepHealth.idleConnections}`, icon: Activity },
    { label: "Top Wait Event", value: data.deepHealth.waitEvents[0]?.event || "None", icon: Clock },
    { label: "Bloated Table", value: data.deepHealth.tableBloat[0]?.relname || "None", icon: Database },
    { label: "Replication Lag", value: data.deepHealth.replicationLagMb ? `${data.deepHealth.replicationLagMb.toFixed(2)} MB` : "None", icon: Database },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {dbStats.map((stat) => (
        <div key={stat.label} className="p-3 bg-card rounded-lg border border-border">
          <div className="flex items-center gap-2 mb-2">
            <stat.icon className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{stat.label}</span>
          </div>
          <p className="text-xl font-bold text-foreground truncate">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardContent;
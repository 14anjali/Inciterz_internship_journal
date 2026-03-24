import { useState, useEffect, useMemo } from "react";
import type { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import store, { RootState } from "@/store/store";
import { setHasUnreadSupportChat } from "@/store/userSlice";
import { connectSupportSocket, onNewSupportChat, disconnectSupportSocket } from "@/socket/supportSocket";
import "leaflet/dist/leaflet.css";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  FileText,
  Video,
  Fish,
  MessagesSquare,
  Activity,
  Menu,
  Download,
  HelpCircle,
  Settings,
  Trash2,
  Megaphone,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ManageTextGuides from "@/components/admin/ManageTextGuides";
import ManageVideoGuides from "@/components/admin/ManageVideoGuides";
import ManageUsers from "@/components/admin/ManageUsers";
import ManageSpecies from "@/components/admin/ManageSpecies";
import { DashboardContent } from "@/components/admin/DashboardContent";
import ManageCommunityForum from "@/components/admin/ManageCommunityForum";
import ManageFaq from "@/components/admin/ManageFaq";
import ManageAds from "@/components/admin/ManageAds";
import SupportChatPanel from "@/components/admin/SupportChatPanel";
import SystemContent from "@/components/admin/SystemContent";
import SettingsContent from "@/components/admin/SettingsContent";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import L from "leaflet";
import httpClient from "@/api/axiosSetup";
import { socket } from "@/lib/socket";
import { performanceSocket, connectPerformanceSocket } from "@/socket/performance.socket";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIconProto = L.Icon.Default.prototype as unknown as {
  _getIconUrl?: () => string;
};
delete defaultIconProto._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const adminPin = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
const supportPin = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png";
const userPin = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
const guestPin = "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png";

const extractIPv4 = (ip: string) => {
  if (!ip) return "";
  const ipv4Regex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
  const match = ip.match(ipv4Regex);
  return match ? match[0] : ip.split('/')[0].trim();
};

const mapMarkerIcons = {
  Admin: new L.Icon({
    iconUrl: adminPin,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Support: new L.Icon({
    iconUrl: supportPin,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  User: new L.Icon({
    iconUrl: userPin,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
  Guest: new L.Icon({
    iconUrl: guestPin,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  }),
};

const MapAutoResize = () => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);
  return null;
};

type TabType =
  | "dashboard"
  | "manage-users"
  | "manage-forum"
  | "manage-text-guides"
  | "manage-video-guides"
  | "manage-species"
  | "manage-chat"
  | "manage-faq"
  | "manage-ads"
  | "settings"
  | "live-users"
  | "system";

const sidebarItems: { id: TabType; label: string; icon: typeof LayoutDashboard; adminOnly?: boolean }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "manage-users", label: "Manage Users", icon: Users },
  { id: "manage-forum", label: "Manage Forum Posts", icon: MessageSquare },
  { id: "manage-text-guides", label: "Manage Text Guides", icon: FileText },
  { id: "manage-video-guides", label: "Manage Video Guides", icon: Video },
  { id: "manage-species", label: "Manage Species", icon: Fish },
  { id: "manage-chat", label: "Manage Chat Sessions", icon: MessagesSquare },
  { id: "manage-faq", label: "Manage FAQ", icon: HelpCircle },
  { id: "manage-ads", label: "Manage Ads", icon: Megaphone, adminOnly: true },
  { id: "settings", label: "Settings", icon: Settings, adminOnly: true },
  { id: "live-users", label: "Live Users Data", icon: Activity },
  { id: "system", label: "Clear Cache", icon: Trash2 },
];

const VALID_SECTIONS: TabType[] = [
  "dashboard",
  "manage-users",
  "manage-forum",
  "manage-text-guides",
  "manage-video-guides",
  "manage-species",
  "manage-chat",
  "manage-faq",
  "manage-ads",
  "settings",
  "live-users",
  "system",
];

const sectionToTab = (section: string | undefined): TabType => {
  if (!section) return "dashboard";
  return (VALID_SECTIONS as string[]).includes(section) ? (section as TabType) : "dashboard";
};

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const hasUnreadSupportChat = useSelector((state: RootState) => state.user.hasUnreadSupportChat);

  const activeTab = sectionToTab(section);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const role = useSelector((state: RootState) => state.user.role);
  const panelTitle = role === "support" ? "Support Panel" : "Admin Panel";

  const [userLocations, setUserLocations] = useState<any[]>([]);
  const [activeUsersCount, setActiveUsersCount] = useState(0);

  const handleTabChange = (tab: TabType) => {
    navigate(`/admin/${tab}`);
    setIsMobileMenuOpen(false);
    if (tab === "manage-chat") dispatch(setHasUnreadSupportChat(false));
  };

  // Redirect invalid section URL to dashboard; manage-ads is admin-only
  useEffect(() => {
    if (section && !(VALID_SECTIONS as string[]).includes(section)) {
      navigate("/admin/dashboard", { replace: true });
    } else if ((section === "manage-ads" || section === "settings") && role !== "admin") {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [section, navigate, role]);

  // Connect support socket when on dashboard so we receive new chat notifications on any tab
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = store.getState().user.role;
    if (!token || (role !== "admin" && role !== "support")) return;
    connectSupportSocket(token);
    onNewSupportChat(() => {
      dispatch(setHasUnreadSupportChat(true));
    });
    return () => {
      disconnectSupportSocket();
    };
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    // Connect performance socket for live map
    if (token) {
      connectPerformanceSocket(token);
    } else if (!performanceSocket.connected) {
      performanceSocket.connect();
    }

    const onLiveLocations = (data: any) => {
      // data: { activeUsersCount: number, locations: [...] }
      if (data && Array.isArray(data.locations)) {
        setUserLocations(data.locations);
        setActiveUsersCount(data.activeUsersCount || 0);
      }
    };

    performanceSocket.on("live-locations", onLiveLocations);

    return () => {
      performanceSocket.off("live-locations", onLiveLocations);
      performanceSocket.disconnect();
    };
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-xl font-bold text-primary">{panelTitle}</h2>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems
          .filter((item) => !("adminOnly" in item && item.adminOnly) || role === "admin")
          .map((item) => (
          <button
            key={item.id}
            onClick={() => handleTabChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 relative",
              activeTab === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "hover:bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            <span className="font-medium">{item.label}</span>
            {item.id === "manage-chat" && hasUnreadSupportChat && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" aria-hidden />
            )}
          </button>
        ))}
      </nav>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard": return <DashboardContent />;
      case "manage-users": return <ManageUsers />;
      case "manage-forum": return <ManageCommunityForum placeholder={"Start typing"} />;
      case "manage-text-guides": return <ManageTextGuides placeholder={"Start typing"} />;
      case "manage-video-guides": return <ManageVideoGuides />;
      case "manage-species": return <ManageSpecies />;
      case "manage-chat": return <SupportChatPanel />;
      case "manage-faq": return <ManageFaq />;
      case "manage-ads": return <ManageAds />;
      case "settings": return <SettingsContent />;
      case "live-users": return <LiveUsersContent />;
      case "system": return <SystemContent />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div className="bg-background h-full flex flex-col">
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card">
        <h2 className="text-lg font-bold text-primary">{panelTitle}</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open(window.location.origin, "_blank")}
            title="Open Frontend in New Tab"
          >
            <ExternalLink className="h-5 w-5" />
          </Button>
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="sr-only">
                <SheetHeader>
                  <SheetTitle>Admin Navigation Menu</SheetTitle>
                </SheetHeader>
              </div>
              <SidebarContent />
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex flex-1 items-start">
        <aside className="hidden lg:block w-72 fixed top-16 left-0 h-[calc(100vh-4rem)] bg-card border-r border-border overflow-y-auto z-40">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-primary">{panelTitle}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.open(window.location.origin, "_blank")}
                title="Open Frontend in New Tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              {sidebarItems
                .filter((item) => !("adminOnly" in item && item.adminOnly) || role === "admin")
                .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 relative",
                    activeTab === item.id
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                  {item.id === "manage-chat" && hasUnreadSupportChat && (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-orange-500 shrink-0" aria-hidden />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>
        <main className="flex-1 p-6 max-sm:p-0 lg:ml-72">{renderContent()}</main>
      </div>
    </div>
  );
};

type LiveUser = {
  socketId?: string;
  name?: string;
  type?: string;
  role?: string;
  ip?: string;
  coords?: [number, number];
  latitude?: number;
  longitude?: number;
  city?: string;
  [key: string]: unknown;
};

const getUserMarkerIcon = (user: LiveUser) => {
  const raw = (user?.role || user?.type || "").toString().toLowerCase();
  if (raw === "admin" || raw === "staff") {
    return mapMarkerIcons.Admin;
  }
  if (raw === "support") {
    return mapMarkerIcons.Support;
  }
  if (raw === "user" || raw === "registered") {
    return mapMarkerIcons.User;
  }
  return mapMarkerIcons.Guest;
};

const getSharedMarkerIcon = (groupUsers: LiveUser[]) => {
  const hasAdmin = groupUsers.some((u) => {
    const raw = (u.role || u.type || "").toString().toLowerCase();
    return raw === "admin" || u.type === "Admin";
  });
  const hasSupport = groupUsers.some((u) => {
    const raw = (u.role || u.type || "").toString().toLowerCase();
    return raw === "support" || u.type === "Support";
  });
  const hasUser = groupUsers.some((u) => {
    const raw = (u.role || u.type || "").toString().toLowerCase();
    return raw === "user" || raw === "registered" || u.type === "User";
  });
  const hasGuest = groupUsers.some((u) => {
    const raw = (u.role || u.type || "").toString().toLowerCase();
    return raw === "guest" || u.type === "Guest";
  });

  const colors: string[] = [];
  if (hasAdmin) colors.push("#ef4444");
  if (hasSupport) colors.push("#a855f7");
  if (hasUser) colors.push("#22c55e");
  if (hasGuest) colors.push("#3b82f6");
  if (colors.length === 0) {
    colors.push("#3b82f6");
  }

  const segments = colors
    .map((color, index) => {
      const start = Math.round((index / colors.length) * 100);
      const end = Math.round(((index + 1) / colors.length) * 100);
      return `${color} ${start}% ${end}%`;
    })
    .join(", ");

  const html = `<div style="position:relative;width:26px;height:26px;border-radius:9999px;background-image:linear-gradient(135deg,${segments});border:2px solid hsl(var(--background));box-shadow:0 0 0 2px hsl(var(--primary)),0 6px 12px hsl(var(--primary)/0.7);">
    <div style="position:absolute;left:50%;bottom:-8px;transform:translateX(-50%);width:0;height:0;border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid hsl(var(--primary));"></div>
  </div>`;

  return L.divIcon({
    html,
    className: "",
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -30],
  });
};

const LiveUsersContent = () => {
  const [liveUsers, setLiveUsers] = useState<LiveUser[]>([]);
  const { userid, role } = useSelector((state: RootState) => state.user);

  const groupedByIp = useMemo(() => {
    const groups = new Map<string, LiveUser[]>();
    for (const u of liveUsers) {
      const key =
        typeof u.ip === "string" && u.ip.trim().length > 0
          ? u.ip.trim()
          : `${u.coords?.[0]}_${u.coords?.[1]}_${u.city || ""}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      groups.get(key)!.push(u);
    }
    return groups;
  }, [liveUsers]);

  const sharedLocationSummary = useMemo(() => {
    const summary = { admin: 0, support: 0, user: 0, guest: 0, totalUsers: 0, totalGroups: 0 };
    for (const [, users] of groupedByIp) {
      if (users.length < 2) continue;
      summary.totalGroups += 1;
      summary.totalUsers += users.length;
      for (const u of users) {
        const raw = (u.role || u.type || "").toString().toLowerCase();
        if (raw === "admin" || u.type === "Admin") {
          summary.admin += 1;
        } else if (raw === "support" || u.type === "Support") {
          summary.support += 1;
        } else if (raw === "user" || raw === "registered" || u.type === "User") {
          summary.user += 1;
        } else {
          summary.guest += 1;
        }
      }
    }
    return summary;
  }, [groupedByIp]);

  const typeSummary = useMemo(() => {
    const summary = { admin: 0, support: 0, user: 0, guest: 0 };
    for (const u of liveUsers) {
      const raw = (u.role || u.type || "").toString().toLowerCase();
      if (raw === "admin" || u.type === "Admin") {
        summary.admin += 1;
      } else if (raw === "support" || u.type === "Support") {
        summary.support += 1;
      } else if (raw === "user" || raw === "registered" || u.type === "User") {
        summary.user += 1;
      } else {
        summary.guest += 1;
      }
    }
    return summary;
  }, [liveUsers]);

  const flatRows = useMemo(() => {
    return liveUsers.map((u) => {
      const lat = Number(u.coords?.[0] ?? u.latitude);
      const lng = Number(u.coords?.[1] ?? u.longitude);
      const key =
        typeof u.ip === "string" && u.ip.trim().length > 0
          ? u.ip.trim()
          : `${u.coords?.[0]}_${u.coords?.[1]}_${u.city || ""}`;
      const groupUsers = groupedByIp.get(key) ?? [u];
      const sharedCount = groupUsers.length;
      const isShared = sharedCount > 1;
      const raw = (u.role || u.type || "").toString().toLowerCase();
      let typeLabel = "Guest";
      if (raw === "admin" || u.type === "Admin") {
        typeLabel = "Admin";
      } else if (raw === "support" || u.type === "Support") {
        typeLabel = "Support";
      } else if (raw === "user" || raw === "registered" || u.type === "User") {
        typeLabel = "User";
      }
      return {
        name: u.name || "Visitor",
        type: typeLabel,
        role: u.role || u.type || "",
        ip: extractIPv4(u.ip || ""),
        city: u.city || "",
        latitude: isNaN(lat) ? "" : lat.toFixed(4),
        longitude: isNaN(lng) ? "" : lng.toFixed(4),
        sharedCount,
        isShared,
      };
    });
  }, [liveUsers, groupedByIp]);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPages = flatRows.length === 0 ? 1 : Math.ceil(flatRows.length / pageSize);
  const currentPage = Math.min(page, totalPages);
  const pagedRows = flatRows.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleDownloadBlob = (content: string | Blob, filename: string, type: string) => {
    const blob = content instanceof Blob ? content : new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportCsv = () => {
    const rows = flatRows;
    const headers = [
      "Name",
      "Type",
      "Role",
      "IP",
      "City",
      "Latitude",
      "Longitude",
      "SharedGroupSize",
      "IsSharedLocation",
    ];
    const lines = [headers.join(",")];
    rows.forEach((r) => {
      const values = [
        r.name,
        r.type,
        String(r.role ?? ""),
        r.ip,
        r.city,
        String(r.latitude),
        String(r.longitude),
        String(r.sharedCount),
        r.isShared ? "yes" : "no",
      ].map((v) => {
        const s = String(v ?? "");
        if (s.includes(",") || s.includes("\"") || s.includes("\n")) {
          return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
      });
      lines.push(values.join(","));
    });
    const csv = lines.join("\r\n");
    handleDownloadBlob(csv, "live-users.csv", "text/csv;charset=utf-8;");
  };

  const handleExportExcel = () => {
    const rows = flatRows;
    const headers = [
      "Name",
      "Type",
      "Role",
      "IP",
      "City",
      "Latitude",
      "Longitude",
      "SharedGroupSize",
      "IsSharedLocation",
    ];
    const headerHtml = `<tr>${headers
      .map((h) => `<th style="border:1px solid #ccc;padding:4px;text-align:left;">${h}</th>`)
      .join("")}</tr>`;
    const bodyHtml = rows
      .map((r) => {
        const cells = [
          r.name,
          r.type,
          String(r.role ?? ""),
          r.ip,
          r.city,
          String(r.latitude),
          String(r.longitude),
          String(r.sharedCount),
          r.isShared ? "yes" : "no",
        ];
        return `<tr>${cells
          .map(
            (c) =>
              `<td style="border:1px solid #ccc;padding:4px;text-align:left;">${String(c ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</td>`,
          )
          .join("")}</tr>`;
      })
      .join("");
    const html = `<table>${headerHtml}${bodyHtml}</table>`;
    handleDownloadBlob(html, "live-users.xls", "application/vnd.ms-excel");
  };

  const handleExportSheets = () => {
    const rows = flatRows;
    const headers = [
      "Name",
      "Type",
      "Role",
      "IP",
      "City",
      "Latitude",
      "Longitude",
      "SharedGroupSize",
      "IsSharedLocation",
    ];
    const lines = [headers.join(",")];
    rows.forEach((r) => {
      const values = [
        r.name,
        r.type,
        String(r.role ?? ""),
        r.ip,
        r.city,
        String(r.latitude),
        String(r.longitude),
        String(r.sharedCount),
        r.isShared ? "yes" : "no",
      ].map((v) => {
        const s = String(v ?? "");
        if (s.includes(",") || s.includes("\"") || s.includes("\n")) {
          return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
      });
      lines.push(values.join(","));
    });
    const csv = lines.join("\r\n");
    handleDownloadBlob(csv, "live-users-google-sheets.csv", "text/csv;charset=utf-8;");
  };

  const handleExportDocs = () => {
    const rows = flatRows;
    const headers = [
      "Name",
      "Type",
      "Role",
      "IP",
      "City",
      "Latitude",
      "Longitude",
      "SharedGroupSize",
      "IsSharedLocation",
    ];
    const headerHtml = `<tr>${headers
      .map((h) => `<th style="border:1px solid #ddd;padding:1px;text-align:left;">${h}</th>`)
      .join("")}</tr>`;
    const bodyHtml = rows
      .map((r) => {
        const cells = [
          r.name,
          r.type,
          String(r.role ?? ""),
          r.ip,
          r.city,
          String(r.latitude),
          String(r.longitude),
          String(r.sharedCount),
          r.isShared ? "yes" : "no",
        ];
        return `<tr>${cells
          .map(
            (c) =>
              `<td style="border:1px solid #eee;padding:6px;text-align:left;">${String(c ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</td>`,
          )
          .join("")}</tr>`;
      })
      .join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Live Users</title></head><body><h1>Live Users</h1><table style="border-collapse:collapse;font-family:system-ui,Arial,sans-serif;font-size:12px;">${headerHtml}${bodyHtml}</table></body></html>`;
    handleDownloadBlob(html, "live-users-docs.html", "text/html;charset=utf-8;");
  };

  const handleExportPdf = () => {
    const rows = flatRows;
    const headers = [
      "Name",
      "Type",
      "Role",
      "IP",
      "City",
      "Latitude",
      "Longitude",
      "SharedGroupSize",
      "IsSharedLocation",
    ];
    const headerHtml = `<tr>${headers
      .map((h) => `<th style="border:1px solid #ddd;padding:6px;text-align:left;">${h}</th>`)
      .join("")}</tr>`;
    const bodyHtml = rows
      .map((r) => {
        const cells = [
          r.name,
          r.type,
          String(r.role ?? ""),
          r.ip,
          r.city,
          String(r.latitude),
          String(r.longitude),
          String(r.sharedCount),
          r.isShared ? "yes" : "no",
        ];
        return `<tr>${cells
          .map(
            (c) =>
              `<td style="border:1px solid #eee;padding:6px;text-align:left;">${String(c ?? "")
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</td>`,
          )
          .join("")}</tr>`;
      })
      .join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Live Users</title></head><body><h1>Live Users</h1><table style="border-collapse:collapse;width:100%;font-family:system-ui,Arial,sans-serif;font-size:12px;">${headerHtml}${bodyHtml}</table></body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.open();
    win.document.write(html);
    win.document.close();
    win.focus();
    win.print();
  };

  type Html2CanvasFn = (element: HTMLElement, options?: { useCORS?: boolean }) => Promise<HTMLCanvasElement>;

  const loadHtml2Canvas = () => {
    return new Promise<Html2CanvasFn>((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("No window"));
        return;
      }
      const w = window as typeof window & { html2canvas?: Html2CanvasFn };
      if (w.html2canvas) {
        resolve(w.html2canvas);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";
      script.async = true;
      script.onload = () => {
        const wLoaded = window as typeof window & { html2canvas?: Html2CanvasFn };
        if (wLoaded.html2canvas) {
          resolve(wLoaded.html2canvas);
        } else {
          reject(new Error("html2canvas not available"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load html2canvas"));
      document.body.appendChild(script);
    });
  };

  const handleExportMapImage = async () => {
    try {
      const html2canvas = await loadHtml2Canvas();
      const element = document.getElementById("live-users-map");
      if (!element) return;
      const canvas = await html2canvas(element, { useCORS: true });
      const dataUrl = canvas.toDataURL("image/png");
      handleDownloadBlob(dataUrlToBlob(dataUrl), "live-users-map.png", "image/png");
    } catch {
      return;
    }
  };

  const dataUrlToBlob = (dataUrl: string) => {
    const parts = dataUrl.split(",");
    const byteString = atob(parts[1]);
    const mimeString = parts[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const fetchUsers = async () => {
    try {
      const res = await httpClient.get("/manage_users/live-users", {
        headers: { useAuth: true }
      });
      if (res.data?.success && Array.isArray(res.data.data)) {
        setLiveUsers(res.data.data);
      }
    } catch (err) {
      const axiosError = err as AxiosError | undefined;
      if (
        axiosError?.code === "ECONNABORTED" ||
        axiosError?.message === "Request aborted"
      ) {
        return;
      }
      console.error("Map fetch error:", err);
    }
  };

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
        setLiveUsers(data as LiveUser[]);
      }
    };

    fetchUsers();
    socket.on("live-tracking-update", handleUpdate);
    const interval = setInterval(fetchUsers, 30000);
    return () => {
      socket.off("live-tracking-update", handleUpdate);
      clearInterval(interval);
    };
  }, [userid, role]);

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] space-y-4">
      <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Live Monitor</h1>
          <p className="text-xs text-primary/80 font-mono uppercase tracking-widest mt-1">System Online</p>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="font-bold text-primary text-sm">
              {liveUsers.length} Active Pointers
            </div>
            <div className="flex flex-wrap gap-2 justify-end">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" /> Admin: {typeSummary.admin}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-purple-500" /> Support: {typeSummary.support}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" /> User: {typeSummary.user}
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Guest: {typeSummary.guest}
              </span>
            </div>
            <div className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold text-primary">
                {sharedLocationSummary.totalUsers} users
              </span>{" "}
              from{" "}
              <span className="font-semibold text-primary">
                {sharedLocationSummary.totalGroups} shared IP/locations
              </span>{" "}
              (A:{sharedLocationSummary.admin} S:{sharedLocationSummary.support} U:
              {sharedLocationSummary.user} G:{sharedLocationSummary.guest})
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 min-h-[420px]">
        <div
          id="live-users-map"
          className="flex-[1] min-w-0 rounded-2xl border border-border overflow-hidden relative bg-card"
        >
          <style>
            {`.dark #live-users-map .leaflet-pane.leaflet-tile-pane img { filter: invert(1) grayscale(1) contrast(1.1); }`}
          </style>
          <MapContainer
            center={[20, 0]}
            zoom={2}
            minZoom={1.5}
            maxZoom={10}
            maxBounds={[
              [-85, -180],
              [85, 180],
            ]}
            maxBoundsViscosity={1.0}
            attributionControl={false}
            style={{ height: "100%", width: "100%" }}
          >
            <MapAutoResize />
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap
            />
            {Array.from(groupedByIp.entries()).map(([key, groupUsers], idx) => {
              // Use the first user in the group for coordinates
              const user = groupUsers[0];
              const lat = Number(user.coords?.[0] ?? user.latitude);
              const lng = Number(user.coords?.[1] ?? user.longitude);
              
              if (isNaN(lat) || isNaN(lng)) return null;

              const isSharedLocation = groupUsers.length > 1;
              const userIcon = isSharedLocation
                ? getSharedMarkerIcon(groupUsers)
                : getUserMarkerIcon(user);
              
              const typeRaw = (user.role || user.type || "").toString().toLowerCase();
              let typeLabel = "Guest";
              let typeColor = "text-blue-600";
              if (typeRaw === "admin" || user.type === "Admin") {
                typeLabel = "Admin";
                typeColor = "text-red-600";
              } else if (typeRaw === "support" || user.type === "Support") {
                typeLabel = "Support";
                typeColor = "text-purple-600";
              } else if (typeRaw === "user" || typeRaw === "registered" || user.type === "User") {
                typeLabel = "User";
                typeColor = "text-green-600";
              } else if (user.type === "Guest") {
                typeLabel = "Guest";
                typeColor = "text-blue-600";
              }

              return (
                <Marker key={key} position={[lat, lng]} icon={userIcon}>
                  <Popup>
                    <div className={cn(
                      "min-w-[180px] max-w-[260px] rounded-xl border bg-card/95 shadow-lg overflow-hidden",
                      isSharedLocation ? "border-amber-400 shadow-[0_0_0_1px_rgba(251,191,36,0.6),0_12px_20px_rgba(15,23,42,0.6)]" : "border-border"
                    )}>
                      <div className={cn(
                        "px-3 py-2 flex items-center justify-between gap-2",
                        isSharedLocation ? "bg-accent0/95" : "bg-primary/90"
                      )}>
                        <div className="flex flex-col flex-1 min-w-0">
                          <p className="text-[11px] font-semibold text-primary-foreground truncate">
                            {isSharedLocation ? "Shared location" : user.name || "Visitor"}
                          </p>
                          {isSharedLocation && (
                            <p className="text-[10px] text-primary-foreground/80">
                              {groupUsers.length} users on this IP/location
                            </p>
                          )}
                        </div>
                        <span
                          className={cn(
                            "text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-card/10",
                            isSharedLocation ? "text-white" : typeColor
                          )}
                        >
                          {isSharedLocation ? "Shared" : typeLabel}
                        </span>
                      </div>
                      <div className="px-3 py-2 space-y-1.5">
                        <p className="text-[11px] font-medium text-foreground">
                          {user.city || "Locating..."}
                        </p>
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span className="font-mono">
                            Lat: {lat.toFixed(2)}°<span className="ml-1">Lng: {lng.toFixed(2)}°</span>
                          </span>
                          {!isSharedLocation && (
                            <span className="text-[9px] uppercase tracking-wide bg-secondary text-muted-foreground px-1.5 py-0.5 rounded">
                              Live
                            </span>
                          )}
                        </div>
                        {isSharedLocation && (
                          <div className="mt-1 pt-1 border-t border-amber-200/70 space-y-1 max-h-40 overflow-y-auto">
                            {groupUsers.map((sharedUser, sharedIdx) => {
                              const sharedRaw = (sharedUser.role || sharedUser.type || "").toString().toLowerCase();
                              let sharedLabel = "Guest";
                              let sharedColor = "text-blue-600";
                              if (sharedRaw === "admin" || sharedUser.type === "Admin") {
                                sharedLabel = "Admin";
                                sharedColor = "text-red-600";
                              } else if (sharedRaw === "support" || sharedUser.type === "Support") {
                                sharedLabel = "Support";
                                sharedColor = "text-purple-600";
                              } else if (sharedRaw === "user" || sharedRaw === "registered" || sharedUser.type === "User") {
                                sharedLabel = "User";
                                sharedColor = "text-green-600";
                              } else if (sharedUser.type === "Guest") {
                                sharedLabel = "Guest";
                                sharedColor = "text-blue-600";
                              }

                              return (
                                <div
                                  key={sharedUser.socketId || sharedIdx}
                                  className="flex items-center justify-between text-[10px] text-foreground"
                                >
                                  <span className="truncate max-w-[120px]">
                                    {sharedUser.name || "Visitor"}
                                  </span>
                                  <span
                                    className={cn(
                                      "ml-2 text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-accent",
                                      sharedColor
                                    )}
                                  >
                                    {sharedLabel}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>

          <div className="absolute bottom-4 left-4 z-[1000] bg-primary/90 p-3 rounded-lg border border-border text-[10px] text-white space-y-2 backdrop-blur-sm">
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full" /> Admin</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-purple-500 rounded-full" /> Support</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full" /> User</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-500 rounded-full" /> Guest</div>
          </div>
          <div className="absolute bottom-1 left-0 right-0 z-[900] flex justify-between px-3 text-[9px] text-muted-foreground pointer-events-none">
            <span>© TheAquaGuide</span>
            <span>Map data © OpenStreetMap contributors</span>
          </div>
        </div>

        <div className="flex-[3] min-w-[420px] max-w-[640px] rounded-2xl border border-border bg-card/95 text-card-foreground flex flex-col shadow-xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Live User Table
              </p>
            </div>
            <div className="flex flex-wrap gap-1">
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportCsv}
                title="Export CSV"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportExcel}
                title="Export Excel (.xls)"
              >
                <span className="text-[9px] font-semibold">XLS</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportSheets}
                title="Export for Google Sheets"
              >
                <span className="text-[9px] font-semibold">GS</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportDocs}
                title="Export for Google Docs"
              >
                <span className="text-[9px] font-semibold">DOC</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportPdf}
                title="Export PDF via print"
              >
                <span className="text-[9px] font-semibold">PDF</span>
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 border-border bg-slate-900 text-foreground hover:bg-accent"
                onClick={handleExportMapImage}
                title="Save map as image"
              >
                <span className="text-[9px] font-semibold">IMG</span>
              </Button>
            </div>
          </div>
          <div className="flex-1 px-3 pb-2">
            <Table className="w-full text-xs min-w-max whitespace-nowrap">
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead className="text-[10px] text-muted-foreground">Name</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground">Type</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground">IP</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground">City</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground">Lat</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground">Lng</TableHead>
                  <TableHead className="text-[10px] text-muted-foreground text-right">Shared</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagedRows.map((row, index) => (
                  <TableRow key={index} className="border-border">
                    <TableCell className="py-2 pr-2 text-[11px]">
                      <div className="flex flex-col">
                        <span>{row.name}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {row.role}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2 pr-2 text-[11px]">
                      {row.type}
                    </TableCell>
                    <TableCell className="py-2 pr-2 text-[11px]">
                      <span className="font-mono text-[10px]">
                        {row.ip || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 pr-2 text-[11px]">
                      {row.city || "-"}
                    </TableCell>
                    <TableCell className="py-2 pr-1 text-[11px]">
                      {row.latitude || "-"}
                    </TableCell>
                    <TableCell className="py-2 pr-2 text-[11px]">
                      {row.longitude || "-"}
                    </TableCell>
                    <TableCell className="py-2 pr-3 text-[11px] text-right">
                      {row.isShared ? `${row.sharedCount}` : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="border-t border-border px-4 py-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Pagination className="w-auto justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.max(1, prev - 1));
                    }}
                  />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((prev) => Math.min(totalPages, prev + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

const ManageChatContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold text-foreground">Manage Chat Sessions</h1>
    <p className="text-muted-foreground">Monitor and moderate community chat sessions.</p>
  </div>
);

export default AdminDashboard;

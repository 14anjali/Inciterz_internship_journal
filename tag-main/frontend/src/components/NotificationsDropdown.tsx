import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, MessageSquare, FileText, Video, Fish } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notificationsApi } from "@/api/modules/notifications";
import type { NotificationItem, NotificationType } from "@/api/apiTypes";
import { cn } from "@/lib/utils";

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: React.ElementType; label: string }
> = {
  community_post: { icon: MessageSquare, label: "Community" },
  text_guide: { icon: FileText, label: "Text guide" },
  video_guide: { icon: Video, label: "Video guide" },
  new_species: { icon: Fish, label: "Species" },
};

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

interface NotificationsDropdownProps {
  className?: string;
  /** When used in right sidebar, open popover to the left */
  popoverSide?: "top" | "right" | "bottom" | "left";
}

export default function NotificationsDropdown({ className, popoverSide }: NotificationsDropdownProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await notificationsApi.getNotifications(1);
      setUnreadCount(res.data.unreadCount);
    } catch {
      setUnreadCount(0);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await notificationsApi.getNotifications(30);
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
      // Mark as read when user opens the panel so badge clears
      await notificationsApi.markAsRead();
      setUnreadCount(0);
    } catch {
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Badge: load unread count on mount so bell shows count before user opens panel
  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  useEffect(() => {
    if (open) {
      fetchNotifications();
    }
  }, [open, fetchNotifications]);

  const handleMarkReadAndClose = () => {
    setOpen(false);
  };

  const handleNotificationClick = (item: NotificationItem) => {
    if (item.linkPath) {
      navigate(item.linkPath);
    }
    handleMarkReadAndClose();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "px-[4px] flex items-center justify-center text-primary hover:opacity-80 transition-opacity relative",
            className
          )}
          aria-label="Notifications"
        >
          <Bell className="h-[22px] w-[22px] fill-primary" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-500 text-[10px] font-medium text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[360px] p-0" sideOffset={8} side={popoverSide}>
        <div className="border-b px-4 py-3">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <p className="text-xs text-muted-foreground">
            Updates from the website
          </p>
        </div>
        <ScrollArea className="h-[320px]">
          {loading ? (
            <div className="flex items-center justify-center py-12 text-muted-foreground text-sm">
              Loading…
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center text-muted-foreground text-sm">
              <Bell className="h-10 w-10 mb-2 opacity-50" />
              <p>No notifications yet</p>
              <p className="text-xs mt-1">
                New community posts, guides, and species will appear here.
              </p>
            </div>
          ) : (
            <ul className="py-2">
              {notifications.map((item) => {
                const config = TYPE_CONFIG[item.type];
                const Icon = config.icon;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className="w-full px-4 py-3 flex gap-3 text-left hover:bg-muted/60 transition-colors border-b border-border/50 last:border-0"
                      onClick={() => handleNotificationClick(item)}
                    >
                      <span className="shrink-0 mt-0.5 rounded-full bg-primary/10 p-1.5">
                        <Icon className="h-4 w-4 text-primary" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-2">
                          {item.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {config.label} · {formatRelativeTime(item.createdAt)}
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </ScrollArea>
        {!loading && notifications.length > 0 && (
          <div className="border-t px-4 py-2">
            <button
              type="button"
              className="text-xs text-primary hover:underline"
              onClick={handleMarkReadAndClose}
            >
              Close
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

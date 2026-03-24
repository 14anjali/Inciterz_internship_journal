import httpClient from "@/api/axiosSetup";
import type { NotificationsResponse } from "@/api/apiTypes";

export const notificationsApi = {
  getNotifications: (limit?: number) =>
    httpClient.get<NotificationsResponse>(
      limit ? `/notifications?limit=${limit}` : "/notifications",
      { headers: { useAuth: true } }
    ),

  markAsRead: () =>
    httpClient.patch<{ message: string }>("/notifications/read", undefined, {
      headers: { useAuth: true },
    }),
};

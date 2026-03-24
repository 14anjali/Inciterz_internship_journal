import httpClient from "@/api/axiosSetup";

export interface UnreadCountResponse {
  directCount: number;
  communityMentionsCount: number;
  total: number;
}

export const messagesApi = {
  getUnreadCount: () =>
    httpClient.get<UnreadCountResponse>("/messages/unread-count", {
      headers: { useAuth: true },
    }),

  markConversationRead: (conversationId: string) =>
    httpClient.patch<{ message: string }>(
      `/messages/conversation/${conversationId}/read`,
      undefined,
      { headers: { useAuth: true } }
    ),

  markCommunityMentionsRead: () =>
    httpClient.patch<{ message: string }>(
      "/messages/community-mentions/read",
      undefined,
      { headers: { useAuth: true } }
    ),
};

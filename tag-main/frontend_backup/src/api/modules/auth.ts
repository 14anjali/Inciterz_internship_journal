import httpClient from "@/api/axiosSetup";

import {
  LoginPayload,
  RegisterPayload,
  LoginResponse,
  RegisterResponse,
  UpdatePasswordResponse,
  UpdatePasswordPayload,
  UserDetailsResponse,
  RoleResponse,
  Guest,
  UserSummaryStatsResponse,
} from "@/api/apiTypes";

export const authApi = {
  register: (data: RegisterPayload) =>
    httpClient.post<RegisterResponse>("/auth/signup", data, {
      headers: { useAuth: true },
    }),

  login: (data: LoginPayload) =>
    httpClient.post<LoginResponse>("/auth/login", data, {
      headers: { useAuth: true },
    }),

  logout: () =>
    httpClient.post<string>("/auth/logout", {
      headers: { useAuth: true },
    }),

  updatePassword: (data: UpdatePasswordPayload) =>
    httpClient.put<UpdatePasswordResponse>("/auth/update-password", data, {
      headers: { useAuth: true },
    }),

  forgotPassword: (email: string) =>
    httpClient.post<{ message: string }>("/auth/forgot-password", { email }),

  resetPassword: (token: string, newPassword: string) =>
    httpClient.post<{ message: string }>("/auth/reset-password", {
      token,
      newPassword,
    }),

  getUser: () =>
    httpClient.get<UserDetailsResponse>("/auth/user-details", {
      headers: { useAuth: true },
    }),

  getRole: (userid: string) =>
    httpClient.get<RoleResponse>(`/auth/getrole?userid=${userid}`, {
      headers: { useAuth: true },
    }),

  getUsersData: async (page: number): Promise<UserDetailsResponse> => {
    const res = await httpClient.get<UserDetailsResponse>(
      `/manage_users/manage-users?page=${page}&limit=10`,
      {
        headers: { useAuth: true },
      }
    );
    return res.data;
  },

  searchUsersData: async (
    page: number,
    query: string,
    filters?: {
      role?: string;
      status?: string;
      gender?: string;
      country_code?: string;
      region?: string;
    }
  ): Promise<UserDetailsResponse> => {
    const queryParams = new URLSearchParams();
    if (query) queryParams.append('query', query);
    if (page) queryParams.append('page', page.toString());
    if (filters) {
      if (filters.role) queryParams.append('role', filters.role);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.gender) queryParams.append('gender', filters.gender);
      if (filters.country_code) queryParams.append('country_code', filters.country_code);
      if (filters.region) queryParams.append('region', filters.region);
    }
    const res = await httpClient.get<UserDetailsResponse>(
      `/manage_users/search?${queryParams.toString()}`,
      {
        headers: { useAuth: true },
      }
    );
    return res.data;
  },

  deactivateUser: async (userId: string): Promise<string> => {
    const res = await httpClient.post<string>(
      `/manage_users/user/${userId}/deactivate`,
      {}, // empty body
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },

  activateUser: async (userId: string): Promise<string> => {
    const res = await httpClient.post<string>(
      `/manage_users/user/${userId}/activate`,
      {}, // empty body
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },

  toggleSupport: async (userId: string): Promise<string> => {
    const res = await httpClient.post<string>(
      `/manage_users/user/${userId}/toggle_support`,
      {}, // empty body
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },

  deleteUser: async (userId: string): Promise<string> => {
    const res = await httpClient.post<string>(
      `/manage_users/user/${userId}/delete`,
      {}, // empty body
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },

  toggleAdmin: async (userId: string): Promise<string> => {
    const res = await httpClient.post<string>(
      `/manage_users/user/${userId}/toggle_admin`,
      {}, // empty body
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },

  createGuest: async () => {
    const res = await httpClient.post<Guest>(`/auth/guestCreate`, {});
  },

  heartbeat: async (useAuth: boolean = false) => {
    const res = await httpClient.post(`/auth/heartbeat`, {}, {
      headers: { useAuth },
    });
    return res.data;
  },

  getUserSummary: async (): Promise<UserSummaryStatsResponse> => {
    const res = await httpClient.get<UserSummaryStatsResponse>(
      "/manage_users/stats/user-summary",
      {
        headers: { useAuth: true },
      }
    );

    return res.data;
  },
};

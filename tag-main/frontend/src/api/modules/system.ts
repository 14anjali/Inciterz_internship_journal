import httpClient from "../axiosSetup";

export interface SystemLog {
  id: number;
  admin_email: string;
  action: string;
  status: string;
  details: any;
  ip_address: string;
  createdAt: string;
}

export const systemApi = {
  purgeCache: async () => {
    const res = await httpClient.post<{ success: boolean; message: string; data: any }>(
      `/api/admin/system/purge-cache`,
      {},
      {
        headers: { useAuth: true },
      }
    );
    return res.data;
  },

  getLogs: async () => {
    const res = await httpClient.get<{ success: boolean; logs: SystemLog[] }>(
      `/api/admin/system/logs`,
      {
        headers: { useAuth: true },
      }
    );
    return res.data;
  }
};

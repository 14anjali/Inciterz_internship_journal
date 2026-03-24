import httpClient from "@/api/axiosSetup";

export interface AdItem {
  id: string;
  location: string;
  name?: string | null;
  content_type: "script" | "image";
  content: string;
  image_link_url?: string | null;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface AdByLocationResponse {
  data: {
    id: string;
    location: string;
    content_type: "script" | "image";
    content: string;
    image_link_url: string | null;
  } | null;
}

export interface GetAdsResponse {
  ads: AdItem[];
  predefinedLocations: { id: string; label: string }[];
  allLocations: { id: string; label: string }[];
}

export interface AdPayload {
  location: string;
  name?: string;
  content_type: "script" | "image";
  content: string;
  image_link_url?: string;
  is_active?: boolean;
}

export const adsApi = {
  getByLocation: (location: string) =>
    httpClient.get<AdByLocationResponse>(`/ads/by-location/${encodeURIComponent(location)}`),

  getAds: () =>
    httpClient.get<GetAdsResponse>("/ads", { headers: { useAuth: true } }),

  createOrUpdate: (data: AdPayload) =>
    httpClient.post<{ message: string; data: AdItem }>("/ads", data, {
      headers: { useAuth: true },
    }),

  update: (id: string, data: Partial<AdPayload>) =>
    httpClient.put<{ message: string }>(`/ads/${id}`, data, {
      headers: { useAuth: true },
    }),

  delete: (id: string) =>
    httpClient.delete<{ message: string }>(`/ads/${id}`, {
      headers: { useAuth: true },
    }),

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return await httpClient.post<{ path: string }>("/ads/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        useAuth: true,
      } as any,
    });
  },
};

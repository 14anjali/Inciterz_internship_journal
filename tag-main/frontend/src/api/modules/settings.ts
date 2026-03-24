import httpClient from "@/api/axiosSetup";
import config from "@/api/config";

/** Resolve logo URL from backend static endpoint. */
export function logoImageSrc(path: string): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/uploads/")) {
    const normalizedBase = String(config.baseUrl || "").replace(/\/+$/, "");
    const baseWithoutApi = normalizedBase.replace(/\/api$/, "");
    return `${baseWithoutApi}${path}`;
  }
  return path;
}

export interface SiteSettings {
  logo_light: string;
  logo_dark: string;
  heading_font: string;
  text_font: string;
}

export const settingsApi = {
  get: () => httpClient.get<SiteSettings>("/settings"),
  update: (data: Partial<SiteSettings>) =>
    httpClient.put<SiteSettings>("/settings", data, { headers: { useAuth: true } as Record<string, unknown> }),
  uploadLogo: (file: File, type: "light" | "dark") => {
    const formData = new FormData();
    formData.append("logo", file);
    formData.append("type", type);
    return httpClient.post<{ path: string }>("/settings/upload-logo", formData, {
      headers: { "Content-Type": "multipart/form-data", useAuth: true } as Record<string, unknown>,
    });
  },
};

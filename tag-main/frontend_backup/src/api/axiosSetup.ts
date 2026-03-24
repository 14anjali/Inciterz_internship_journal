import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
  InternalAxiosRequestConfig,
} from "axios";
import config from "@/api/config";
import store from "@/store/store";
import { logout } from "@/store/userSlice";

// Custom config type for Axios with optional auth token
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  useAuth?: boolean;
  useRefreshToken?: boolean; // Flag to indicate if auth is needed
}

const httpClient = axios.create({
  baseURL: config.baseUrl,
  timeout: 180000,
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "ngrok-skip-browser-warning": "69420",
    //"Content-Type": "application/json",
  },
});

// Request Interceptor to attach token if required
httpClient.interceptors.request.use(
  (config) => {
    // Add /api prefix if not already present
    if (config.url && !config.url.startsWith('/api/') && !config.url.startsWith('api/')) {
      config.url = `/api${config.url}`;
    }
    const customConfig = config as any;
    const needsAuth = customConfig.useAuth || customConfig.headers?.useAuth;
    if (needsAuth) {
      const token = customConfig.useRefreshToken
        ? localStorage.getItem("refreshToken")
        : localStorage.getItem("accessToken");

      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      config.withCredentials = true;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor for error handling
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Dispatch logout action to Redux
      store.dispatch(logout());

      // Redirect to login page
      window.location.href = "/#/login";
    }
    console.error(`API Error on ${error.config?.baseURL || ''}${error.config?.url}:`, error);
    return Promise.reject(error);
  }
);

export default httpClient;

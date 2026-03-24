import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { disconnectPrivateSocket } from "@/socket/privateInstance";
import { disconnectCommunitySocket } from "@/socket/index";

interface UserState {
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiry: string | number | null;
  name: string | null;
  email: string | null;
  isLoggedIn: string | null;
  id: string | null; // UUID
  userid: string | null; // username
  role: string | null;
  authModalOpen: boolean;
  authModalView: "login" | "register";
  hasUnreadSupportChat: boolean;
}

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  tokenExpiry: localStorage.getItem("tokenExpiry") || 0,
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  isLoggedIn: localStorage.getItem("isLoggedIn") || null,
  id: localStorage.getItem("id") || null,
  userid: localStorage.getItem("userid") || null,
  role: localStorage.getItem("role") || "guest", // Default to guest
  authModalOpen: false,
  authModalView: "login",
  hasUnreadSupportChat: false,
};

/**
 * Async logout thunk that disconnects sockets before clearing auth
 * CRITICAL: This prevents socket persistence across sessions
 */
export const performLogout = createAsyncThunk(
  "user/performLogout",
  async () => {
    console.log("🚪 Performing logout - disconnecting sockets...");
    // Disconnect both socket instances
    disconnectPrivateSocket();
    disconnectCommunitySocket();
    console.log("✅ All sockets disconnected");
    return null;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string | null>) => {
      state.role = action.payload;
      if (action.payload) localStorage.setItem("role", action.payload);
    },

    setIsLoggedIn: (state, action: PayloadAction<string | null>) => {
      state.isLoggedIn = action.payload;
      if (action.payload) localStorage.setItem("isLoggedIn", action.payload);
    },

    setAuthData: (state, action: PayloadAction<any>) => {
      const {
        accessToken,
        refreshToken,
        tokenExpiry,
        name,
        email,
        id,
        userid,
        role,
      } = action.payload;

      // Update State
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.tokenExpiry = tokenExpiry;
      state.name = name;
      state.id = id;
      state.userid = userid;
      state.role = role;
      state.email = email;
      state.isLoggedIn = "true";

      // Sync LocalStorage
      localStorage.setItem("accessToken", accessToken || "");
      localStorage.setItem("refreshToken", refreshToken || "");
      localStorage.setItem("id", id || "");
      localStorage.setItem("userid", userid || "");
      localStorage.setItem("role", role || "user");
      localStorage.setItem("tokenExpiry", tokenExpiry?.toString() || "");
      localStorage.setItem("name", name || "");
      localStorage.setItem("email", email || "");
      localStorage.setItem("isLoggedIn", "true");
    },

    /**
     * 🔒 CRITICAL: Logout action clears all auth data
     * Used after performLogout thunk has disconnected sockets
     */
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.name = null;
      state.email = null;
      state.id = null;
      state.userid = null;
      state.isLoggedIn = null;
      state.role = "guest";
      state.hasUnreadSupportChat = false;
      localStorage.clear();
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("supportChatId");
        sessionStorage.removeItem("supportWelcomeShown");
      }
    },

    setHasUnreadSupportChat: (state, action: PayloadAction<boolean>) => {
      state.hasUnreadSupportChat = action.payload;
    },

    setAuthModalOpen: (state, action: PayloadAction<boolean>) => {
      state.authModalOpen = action.payload;
    },

    setAuthModalView: (state, action: PayloadAction<"login" | "register">) => {
      state.authModalView = action.payload;
    },

    // Adding these back to ensure Navbar.tsx doesn't break
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload;
      if (action.payload) localStorage.setItem("name", action.payload);
    },
    setEmail: (state, action: PayloadAction<string | null>) => {
      state.email = action.payload;
      if (action.payload) localStorage.setItem("email", action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(performLogout.fulfilled, (state) => {
      // After sockets are disconnected, clear the auth state
      state.accessToken = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.name = null;
      state.email = null;
      state.id = null;
      state.userid = null;
      state.isLoggedIn = null;
      state.role = "guest";
      state.hasUnreadSupportChat = false;
      localStorage.clear();
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("supportChatId");
        sessionStorage.removeItem("supportWelcomeShown");
      }
    });
  },
});

// Explicitly exporting all actions required by App.tsx and Navbar.tsx
export const {
  setAuthData,
  setRole,
  logout,
  setIsLoggedIn,
  setAuthModalOpen,
  setAuthModalView,
  setName,
  setEmail,
  setHasUnreadSupportChat,
} = userSlice.actions;

export default userSlice.reducer;
import { io } from "socket.io-client";
import config from "../api/config";

// The backend expects a JWT token for authentication in the optional 'auth' object
// middleware: socketAuthMiddleware, socketAdminOrSupportMiddleware
export let performanceSocket = io(`${config.baseUrl}/performance`, {
    auth: {
        token: localStorage.getItem("accessToken"), // Required by socketAuthMiddleware
    },
    autoConnect: false, // We'll connect manually when the dashboard loads
    transports: ["websocket"],
});

export const connectPerformanceSocket = (token: string) => {
    if (performanceSocket) {
        performanceSocket.disconnect();
    }
    
    performanceSocket = io(`${config.baseUrl}/performance`, {
        auth: {
            token: token
        },
        transports: ["websocket"],
        autoConnect: true
    });
    
    return performanceSocket;
};

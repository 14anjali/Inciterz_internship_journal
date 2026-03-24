import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMySupportChats, startSupportChat } from "@/api/support";
import { setAuthModalOpen, setAuthModalView } from "@/store/userSlice";

const SESSION_WELCOME_KEY = "supportWelcomeShown";
const SESSION_CHAT_ID_KEY = "supportChatId";

export const useSupportChat = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state: { user: { isLoggedIn: string | null } }) => state.user.isLoggedIn === "true"
  );
  const userName = useSelector(
    (state: { user: { name: string | null } }) => state.user.name
  );
  const userId = useSelector(
    (state: { user: { id: string | null } }) => state.user.id
  );
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDescribeForm, setShowDescribeForm] = useState(false);

  const handleSupportIconClick = () => {
    if (!isLoggedIn) {
      dispatch(setAuthModalView("login"));
      dispatch(setAuthModalOpen(true));
      return;
    }
    setOpen(true);
  };

  // 🔐 Reset support chat when user changes (different account logged in)
  useEffect(() => {
    if (isLoggedIn && userId) {
      // Store current user ID in session
      const storedUserId = typeof sessionStorage !== "undefined" ? sessionStorage.getItem("supportUserIdSession") : null;
      
      if (storedUserId && storedUserId !== userId) {
        // User has changed - reset support chat completely
        console.log("🔄 User changed, resetting support chat");
        setOpen(false);
        setChatId(null);
        setDesc("");
        setShowDescribeForm(false);
        
        // Clear all support-related session storage
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.removeItem("supportWelcomeShown");
          sessionStorage.removeItem("supportChatId");
          sessionStorage.removeItem("supportUserIdSession");
        }
      }
      
      // Store the new user ID
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("supportUserIdSession", userId);
      }
    }
  }, [userId, isLoggedIn]);

  // Sync "past welcome" from session when opening with no existing chat
  useEffect(() => {
    if (open && !chatId && typeof sessionStorage !== "undefined" && sessionStorage.getItem("supportWelcomeShown") === "1") {
      setShowDescribeForm(true);
    }
  }, [open, chatId]);

  // Reset describe form state when widget closes
  useEffect(() => {
    if (!open) setShowDescribeForm(false);
  }, [open]);

  // Fetch existing chat when widget opens
  useEffect(() => {
    if (!open) return;

    const loadExistingChat = async () => {
      try {
        setLoading(true);
        const resp = await getMySupportChats();
        const sessionChatId = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(SESSION_CHAT_ID_KEY) : null;

        if (resp.success && resp.chats.length > 0) {
          const activeChats = resp.chats.filter((c) => c.status === "active");

          if (activeChats.length > 0 && sessionChatId) {
            const restored = activeChats.find((c) => c.id === sessionChatId);
            if (restored) {
              setChatId(restored.id);
            } else {
              setChatId(null);
            }
          } else {
            setChatId(null);
          }
        } else {
          setChatId(null);
        }
      } catch (err) {
        console.error("Failed to fetch chats", err);
      } finally {
        setLoading(false);
      }
    };

    loadExistingChat();
  }, [open]);

  const handleStart = async () => {
    if (!desc.trim()) {
      setError("Please describe your issue");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const resp = await startSupportChat(desc);
      if (resp?.chat?.id) {
        setChatId(resp.chat.id);
        if (typeof sessionStorage !== "undefined") {
          sessionStorage.setItem(SESSION_CHAT_ID_KEY, resp.chat.id);
        }
      } else {
        setError("Failed to create chat");
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Failed to start chat");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setChatId(null);
  };

  return {
    open,
    chatId,
    desc,
    setDesc,
    loading,
    error,
    showDescribeForm,
    setShowDescribeForm,
    userName,
    handleSupportIconClick,
    handleStart,
    handleClose,
  };
};

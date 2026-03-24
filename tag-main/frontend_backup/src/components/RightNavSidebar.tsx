import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Moon, Sun, MessageCircle, User, Settings, LifeBuoy, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout, setAuthModalOpen, setAuthModalView, performLogout } from "@/store/userSlice";
import { messagesApi } from "@/api/modules/messages";
import NotificationsDropdown from "./NotificationsDropdown";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useSupportChat } from "@/hooks/useSupportChat";
import SupportChatWindow from "./SupportChatWindow";

/**
 * Right-side vertical bar with nav icons (theme, messages, notifications).
 * Shown only on xl and larger (desktop/laptop), hidden on mobile and tablet.
 */
export default function RightNavSidebar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoggedIn, role, name } = useSelector((state: RootState) => state.user);
  const [messagesUnreadCount, setMessagesUnreadCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Support chat state
  const {
    open: supportOpen,
    chatId: supportChatId,
    desc: supportDesc,
    setDesc: setSupportDesc,
    loading: supportLoading,
    error: supportError,
    showDescribeForm: supportShowDescribeForm,
    setShowDescribeForm: setSupportShowDescribeForm,
    userName: supportUserName,
    handleSupportIconClick,
    handleStart: handleSupportStart,
    handleClose: handleSupportClose,
  } = useSupportChat();

  useEffect(() => {
    if (isLoggedIn !== "true") {
      setMessagesUnreadCount(0);
      return;
    }
    messagesApi
      .getUnreadCount()
      .then((res) => setMessagesUnreadCount(res.data.total))
      .catch(() => setMessagesUnreadCount(0));
  }, [isLoggedIn, location.pathname]);

  // 🔐 Close support chat when user logs out
  useEffect(() => {
    if (isLoggedIn !== "true") {
      handleSupportClose();
      // Clear support chat session data
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.removeItem("supportWelcomeShown");
        sessionStorage.removeItem("supportChatId");
      }
    }
  }, [isLoggedIn, handleSupportClose]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const openAuthModal = (view: "login" | "register") => {
    dispatch(setAuthModalView(view));
    dispatch(setAuthModalOpen(true));
  };

  const handleLogout = async () => {
    await dispatch(performLogout() as any);
    navigate("/");
    toast.success("Logged out successfully");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <aside
      className={cn(
        "hidden xl:flex flex-col items-center justify-between gap-6 py-6 w-14 fixed top-0 bottom-0 z-50",
        "right-sidebar-glass"
      )}
      style={{ right: "var(--removed-body-scroll-bar-size, 0px)" }}
      aria-label="Quick actions"
    >
      <div className="flex flex-col items-center gap-5">
        {/* Login / User menu */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              className="right-sidebar-icon-btn p-2.5 rounded-full transition-colors"
              aria-label={isLoggedIn === "true" ? "User menu" : "Login or register"}
            >
              {isLoggedIn === "true" ? (
                <Avatar className="h-6 w-6 cursor-pointer">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="h-6 w-6 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            side="left"
            sideOffset={8}
            className="w-48 rounded-lg"
          >
            {isLoggedIn === "true" ? (
              <>
                <DropdownMenuItem asChild className="hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary">
                  <Link to="/profile" className="w-full cursor-pointer">
                    My Profile
                  </Link>
                </DropdownMenuItem>
                {(role === "admin" || role === "support") && (
                  <DropdownMenuItem asChild className="hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary">
                    <Link to="/admin" className="w-full cursor-pointer">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  className="w-full cursor-pointer hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem
                  className="w-full cursor-pointer hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
                  onClick={() => openAuthModal("login")}
                >
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full cursor-pointer hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
                  onClick={() => openAuthModal("register")}
                >
                  Register
                </DropdownMenuItem>
              </>
            )}            
          </DropdownMenuContent>
        </DropdownMenu>
		{/* Messages - only when logged in */}
        {isLoggedIn === "true" && (
          <button
            onClick={() => navigate("/community-chat")}
            className="right-sidebar-icon-btn relative p-2.5 rounded-full transition-colors"
            aria-label="Messages"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            {messagesUnreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 min-w-[18px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-medium text-white">
                {messagesUnreadCount > 99 ? "99+" : messagesUnreadCount}
              </span>
            )}
          </button>
        )}
        {/* Notifications - only when logged in; popover opens left so it doesn't go off-screen */}
        {isLoggedIn === "true" && (
          <div className="[&_button]:right-sidebar-icon-btn [&_button]:p-2.5 [&_button]:rounded-full [&_button]:transition-colors">
            <NotificationsDropdown popoverSide="left" />
          </div>
        )}
        {/* Search Icon */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="right-sidebar-icon-btn p-2.5 rounded-full transition-colors"
          aria-label="Search"
        >
          <Search className="h-5 w-5" strokeWidth={2} />
        </button>
		{/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="right-sidebar-icon-btn p-2.5 rounded-full transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" strokeWidth={2} />
          ) : (
            <Sun className="h-5 w-5" strokeWidth={2} />
          )}
        </button>
		</div>
		
        {/* Support Chat - only when logged in */}
		<div className="mt-auto">
        {isLoggedIn === "true" && (
          <button
            onClick={handleSupportIconClick}
            className="right-sidebar-icon-btn p-2.5 rounded-full transition-colors"
            aria-label="Support Chat"
          >
            {/* <LifeBuoy className="h-5 w-5" strokeWidth={2} /> */}
            <img className="h-7 w-7" src="/technical-support.png" />
          </button>
        )}
      </div>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="w-[95vw] sm:w-full sm:max-w-[600px] top-[20%] translate-y-0 gap-0 p-0 overflow-hidden bg-background border shadow-lg">
          <div className="p-4 border-b">
            <form onSubmit={handleSearch}>
              <input
                autoFocus
                type="text"
                placeholder="Search videos, guides, species, community..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </form>
          </div>
          <div className="p-4 text-sm text-muted-foreground">
            Press Enter to search or click a suggestion below
          </div>
        </DialogContent>
      </Dialog>

      {/* Support Chat Window - rendered when open */}
      {supportOpen && supportChatId && (
        <div className="fixed bottom-6 right-20 z-[60]">
          <SupportChatWindow chatId={supportChatId} onClose={handleSupportClose} />
        </div>
      )}

      {/* Support Chat Welcome/Form - rendered when open */}
      {supportOpen && !supportChatId && (
        <div className="fixed bottom-6 right-20 z-[60]">
          {!supportLoading && !supportShowDescribeForm && typeof sessionStorage !== "undefined" && sessionStorage.getItem("supportWelcomeShown") !== "1" && (
            <div className="w-72 p-4 bg-card text-card-foreground rounded-lg shadow-lg border">
              <div className="font-semibold text-base mb-1">Welcome{supportUserName ? `, ${supportUserName}` : ""}!</div>
              <p className="text-sm text-muted-foreground mb-4">
                We&apos;re here to help. Tell us what you need and we&apos;ll connect you with support.
              </p>
              <button
                onClick={() => {
                  if (typeof sessionStorage !== "undefined") {
                    sessionStorage.setItem("supportWelcomeShown", "1");
                  }
                  setSupportShowDescribeForm(true);
                }}
                className="w-full bg-primary text-white p-2.5 rounded font-medium hover:opacity-90 transition-opacity"
              >
                Get started
              </button>
            </div>
          )}

          {(supportLoading || supportShowDescribeForm || (typeof sessionStorage !== "undefined" && sessionStorage.getItem("supportWelcomeShown") === "1")) && (
            <div className="w-64 p-3 bg-card text-card-foreground rounded-lg shadow-lg border">
              {supportLoading && !supportShowDescribeForm ? (
                <div className="text-sm text-muted-foreground py-2">Loading...</div>
              ) : (
                <>
                  <div className="font-semibold mb-2">Need help?</div>

                  {supportError && (
                    <div className="text-red-500 text-sm mb-2">{supportError}</div>
                  )}

                  <textarea
                    value={supportDesc}
                    onChange={(e) => setSupportDesc(e.target.value)}
                    placeholder="Describe your issue..."
                    className="w-full p-2 border rounded mb-2 bg-background text-foreground"
                  />

                  <button
                    onClick={handleSupportStart}
                    disabled={supportLoading}
                    className="w-full bg-primary text-white p-2 rounded"
                  >
                    {supportLoading ? "Starting..." : "Start Chat"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

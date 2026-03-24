import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Moon, Sun, Menu, MessageCircle, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout, setIsLoggedIn, setRole, setAuthModalOpen, setAuthModalView, performLogout } from "@/store/userSlice";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ChangePasswordModal from "./ChangePasswordModal";
import AuthModal from "./AuthModal";
import NotificationsDropdown from "./NotificationsDropdown";
import { authApi } from "@/api/modules/auth";
import { messagesApi } from "@/api/modules/messages";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { logoImageSrc } from "@/api/modules/settings";

const Navbar = () => {
  const { settings } = useSiteSettings();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [messagesUnreadCount, setMessagesUnreadCount] = useState(0);

  // Auth Modal State from Redux
  const authModalOpen = useSelector((state: RootState) => state.user.authModalOpen);
  const authModalView = useSelector((state: RootState) => state.user.authModalView);

  const role = useSelector((state: RootState) => state.user.role);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userid = localStorage.getItem("userid");

  useEffect(() => {
    const getRoles = async () => {
      // Check for token before making the request
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await authApi.getRole(userid);
        //console.log(res?.data?.role || "user");
        dispatch(setRole(res?.data?.role || "user"));
      } catch (error) {
        return "user";
      }
    };
    if (userid) {
      getRoles();
    }
  }, [userid, dispatch]);

  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== null) {
      dispatch(setIsLoggedIn(localStorage.getItem("isLoggedIn")));
    }
  }, [isLoggedIn]);

  // Fetch messages unread count when logged in; refetch when location changes (e.g. after viewing chat)
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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const openAuthModal = (view: "login" | "register") => {
    dispatch(setAuthModalView(view));
    dispatch(setAuthModalOpen(true));
    setIsOpen(false);
  };

  // Flattened menu items matching the screenshot
  const flatMenuItems = [
    { name: "Home", path: "/" },
    { name: "Video Guides", path: "/video-guides" },
    { name: "Text Guides", path: "/text-guides" },
    { name: "Species", path: "/species-dictionary" },
    { name: "Community", path: "/community-forum" },
    { name: "FAQ", path: "/faq" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const { name } = useSelector((state: RootState) => state.user);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background border-none shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand Name - Re-added as per first screenshot */}
            <Link
              to="/"
              className="flex items-center gap-2 mr-4 shrink-0"
            >
              <img
                src={resolvedTheme === "dark"
                  ? logoImageSrc(settings.logo_dark || "/dark_theme_logo.webp")
                  : logoImageSrc(settings.logo_light || "/light_theme_logo.webp")}
                alt="Aqua Guide"
                className="h-10 md:h-12 w-auto max-w-[150px] object-contain"
              />
            </Link>

            {/* Desktop Navigation - Flat Menu Items with 20px padding */}
            <div className="hidden lg:flex items-center flex-1 justify-center">
              {flatMenuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-3 xl:px-5 py-2 text-sm font-medium transition-colors whitespace-nowrap",
                    isActive(item.path)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Icons as per screenshot */}
            <div className="hidden md:flex items-center ml-4">
              {/* Search Icon - Blue outline (hidden on xl - shown in RightNavSidebar) */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="xl:hidden px-[4px] flex items-center justify-center text-primary hover:opacity-80 transition-opacity"
                aria-label="Search"
              >
                <Search className="h-[22px] w-[22px]" strokeWidth={2} />
              </button>

              {/* Messages + Notifications: hidden on xl (shown in RightNavSidebar) */}
              <div className="xl:hidden flex items-center">
                {isLoggedIn === "true" && (
                  <button
                    className="px-[4px] flex items-center justify-center text-primary hover:opacity-80 transition-opacity relative"
                    aria-label="Messages"
                    onClick={() => navigate("/community-chat")}
                  >
                    <MessageCircle className="h-[22px] w-[22px] fill-primary" />
                    {messagesUnreadCount > 0 && (
                      <span className="absolute top-0 right-0 flex h-2.5 min-w-[20px] items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-medium text-white">
                        {messagesUnreadCount > 99 ? "99+" : messagesUnreadCount}
                      </span>
                    )}
                  </button>
                )}
                {isLoggedIn === "true" && <NotificationsDropdown />}
              </div>

              {/* Profile Picture / Login - hidden on xl (shown in RightNavSidebar) */}
              <div className="xl:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="relative px-[4px] focus:outline-none">
                      {isLoggedIn === "true" ? (
                        <Avatar className="h-[20px] w-[20px] cursor-pointer">
                          <AvatarImage src="" />
                          <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                            {name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-[22px] w-[22px] rounded-full flex items-center justify-center">
                          <User className="h-[20px] w-[20px] text-primary" />
                        </div>
                      )}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-lg">
                  {isLoggedIn === "true" ? (
                    <>
                      <DropdownMenuItem asChild className="hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary">
                        <Link to="/profile" className="w-full cursor-pointer">
                          My Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="w-full cursor-pointer hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
                        onClick={() => setIsChangePasswordOpen(true)}
                      >
                        Change Password
                      </DropdownMenuItem>
                      {role === "admin" || role === "support" ? (
                        <DropdownMenuItem asChild className="hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary">
                          <Link to="/admin" className="w-full cursor-pointer">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      ) : null}
                      <DropdownMenuItem
                        className="w-full cursor-pointer hover:bg-transparent hover:text-primary focus:bg-transparent focus:text-primary"
                        onClick={async () => {
                          await dispatch(performLogout() as any);
                          navigate("/");
                          toast.success("Logged out successfully");
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                      {/* Theme + settings quick actions remain in header; theme also exists in sidebar */}
                      <div className="border-t border-gray-200 my-1"></div>
                      <div className="flex items-center justify-center gap-4 px-2 py-2">
                        <button
                          onClick={toggleTheme}
                          className="text-primary hover:opacity-80 transition-opacity"
                          aria-label="Toggle theme"
                        >
                          {theme === "light" ? (
                            <Moon className="h-5 w-5 fill-primary" />
                          ) : (
                            <Sun className="h-5 w-5 fill-primary" />
                          )}
                        </button>
                        <button
                          className="text-primary/80 hover:opacity-80 transition-opacity"
                          aria-label="Settings"
                        >
                          <Settings className="h-5 w-5 fill-primary/80" />
                        </button>
                      </div>
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
                      <div className="border-t border-gray-200 my-1"></div>
                      <div className="flex items-center justify-center gap-4 px-2 py-2">
                        <button
                          onClick={toggleTheme}
                          className="text-primary hover:opacity-80 transition-opacity"
                          aria-label="Toggle theme"
                        >
                          {theme === "light" ? (
                            <Moon className="h-5 w-5 fill-primary" />
                          ) : (
                            <Sun className="h-5 w-5 fill-primary" />
                          )}
                        </button>
                        <button
                          className="text-primary/80 hover:opacity-80 transition-opacity"
                          aria-label="Settings"
                        >
                          <Settings className="h-5 w-5 fill-primary/80" />
                        </button>
                      </div>
                    </>
                  )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex md:hidden items-center gap-2">
              {isLoggedIn === "true" && (
                <NotificationsDropdown className="shrink-0" />
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full text-foreground hover:bg-muted"
              >
                {theme === "light" ? (
                  <Moon className="h-6 w-6" />
                ) : (
                  <Sun className="h-6 w-6" />
                )}
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full text-foreground hover:bg-muted">
                    <Menu className="h-7 w-7" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && searchQuery.trim()) {
                            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                            setIsOpen(false);
                            setSearchQuery("");
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto">
                      {flatMenuItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "px-[10px] py-2 text-sm font-medium rounded-md transition-colors",
                            isActive(item.path)
                              ? "text-primary"
                              : "text-foreground/80 hover:text-primary"
                          )}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    <div className="flex flex-col gap-3">
                      {isLoggedIn === "true" ? (
                        <>
                          <Link to="/profile" onClick={() => setIsOpen(false)}>
                            <Button variant="ocean" className="w-full">
                              Profile
                            </Button>
                          </Link>
                          {role === "admin" || role === "support" ? (
                            location.pathname.startsWith("/admin") ? (
                              <Link to="/" onClick={() => setIsOpen(false)}>
                                <Button variant="ocean" className="w-full">
                                  Go to Main Website
                                </Button>
                              </Link>
                            ) : (
                              <Link to="/admin" onClick={() => setIsOpen(false)}>
                                <Button variant="ocean" className="w-full">
                                  Admin Dashboard
                                </Button>
                              </Link>
                            )
                          ) : (
                            <></>
                          )}

                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={async () => {
                              await dispatch(performLogout() as any);
                              navigate("/");
                              toast.success("Logged out successfully");
                            }}
                          >
                            Logout
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => openAuthModal("login")}
                          >
                            Dive In
                          </Button>
                          <Button
                            variant="ocean"
                            className="w-full"
                            onClick={() => openAuthModal("register")}
                          >
                            Join Reef
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>


      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
      <AuthModal
        isOpen={authModalOpen}
        onOpenChange={(open) => dispatch(setAuthModalOpen(open))}
        defaultView={authModalView}
      />
      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="w-[95vw] sm:w-full sm:max-w-[600px] top-[20%] translate-y-0 gap-0 p-0 overflow-hidden bg-background border shadow-lg">
           <div className="p-4 border-b">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                  setIsSearchOpen(false);
                }
              }}
              className="flex items-center gap-3"
            >
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search everything..."
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-muted-foreground"
                autoFocus
              />
              <Button type="submit" size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                Search
              </Button>
            </form>
          </div>
          <div className="bg-muted/50 p-4 text-xs text-muted-foreground flex justify-between">
             <span>Press Enter to search</span>
             <span>Esc to close</span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;

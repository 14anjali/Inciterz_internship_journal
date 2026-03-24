import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogHeader 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { authApi } from "@/api/modules/auth";
import { toast } from "sonner";
import { setAuthData } from "@/store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Lock, Mail, Calendar, UserCircle, CheckCircle2 } from "lucide-react";
import PasswordValidationPopover from "@/components/PasswordValidationPopover";
import UsernameSuggestionPopover from "@/components/UsernameSuggestionPopover";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import { socket as chatSocket, updateSocketAuth } from "@/socket";
import { updateRootSocketAuth, socket as rootSocket } from "@/lib/socket";

interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultView?: "login" | "register";
}

const AuthModal = ({ isOpen, onOpenChange, defaultView = "login" }: AuthModalProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Forgot Password State
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register State
  const [registerData, setRegisterData] = useState({
    name: "",
    userid: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    role: "user",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [showPasswordPopover, setShowPasswordPopover] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showUsernamePopover, setShowUsernamePopover] = useState(false);
  const [usernamePopoverShown, setUsernamePopoverShown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsFlipped(defaultView === "register");
    }
  }, [isOpen, defaultView]);

  // Ported Username Logic
  useEffect(() => {
    if (registerData.userid.length >= 6 && !usernamePopoverShown) {
      setShowUsernamePopover(true);
      setUsernamePopoverShown(true);
    }
  }, [registerData.userid, usernamePopoverShown]);

  const handleUsernameSelect = (userid: string) => {
    setRegisterData({ ...registerData, userid });
    setShowUsernamePopover(false);
  };

  const handlePasswordChange = (value: string) => {
    setRegisterData({ ...registerData, password: value });
    setPasswordConfirmed(false);
    setShowPasswordPopover(value.length > 0);
  };

  const handlePasswordConfirm = () => {
    setPasswordConfirmed(true);
    setShowPasswordPopover(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.login({ email: loginEmail, password: loginPassword });
      
      // Emit conversion event BEFORE updating auth/reconnecting
      chatSocket.emit("guest-converted", { userId: res.data.user.id });
      rootSocket.emit("guest-converted", { userId: res.data.user.id });

      dispatch(setAuthData(res.data.user));

      // Update socket auth and reconnect
      updateSocketAuth(res.data.user.id);
      updateRootSocketAuth(res.data.user.id);

      toast.success("Login successful!");
      onOpenChange(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authApi.register(registerData);
      toast.success("Registration successful! Please log in.");
      setIsFlipped(false);
      setLoginEmail(registerData.email);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  // Helper for input styling to keep it DRY
  const inputClasses = "h-[50px] rounded-[30px] bg-muted/50 dark:bg-muted/20 border border-input text-foreground px-6 pr-12 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-transparent border-none shadow-none p-0 w-[95vw] sm:w-full max-w-[500px] overflow-visible">
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>{isFlipped ? "Register Account" : "Login to Your Account"}</DialogTitle>
          </DialogHeader>
        </VisuallyHidden.Root>

        <div className={`${isFlipped ? "h-[660px]" : "h-[420px]"} perspective-1000 w-full relative transition-all duration-500 max-h-[90vh]`}>
          <div className="relative h-full bg-card text-card-foreground rounded-[30px] shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
            
            {/* Gradient Header */}
            <div className="relative bg-gradient-to-r from-[#1F9DED] to-[#00609D] h-24 flex-shrink-0 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/5"></div>
              <h2 className="text-3xl font-zolina font-bold text-white relative z-10 bottom-5">
                {isFlipped ? "Register" : "Login"}
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-card text-card-foreground rounded-t-[30px]"></div>
            </div>
            
            <div className={`${isFlipped ? "pt-8 pb-8" : "pt-4 pb-4"} px-8 h-full bg-card text-card-foreground flex-1 overflow-hidden`}>
              <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                
                {/* LOGIN SIDE */}
                <div className={`absolute w-full ${isFlipped ? "h-full" : "h-auto"} backface-hidden flex flex-col bg-card`}>
                   <form onSubmit={handleLogin} className="space-y-5 w-full">
                      <div className="relative">
                        <Input
                          type="text"
                          className={inputClasses}
                          placeholder="Email or Username"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                        <User className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                      </div>

                      <div className="relative">
                        <Input
                          type={showLoginPassword ? "text" : "password"}
                          className={inputClasses}
                          placeholder="Password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-primary transition-colors">
                          {showLoginPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>

                      <div className="flex justify-end mt-1">
                        <button
                          type="button"
                          onClick={() => setShowForgotPassword(true)}
                          className="text-sm font-medium text-muted-foreground hover:text-primary hover:underline transition-colors"
                        >
                          Forgot Password?
                        </button>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-[50px] rounded-[30px] text-lg font-semibold bg-gradient-to-r from-[#1F9DED] to-[#00609D] hover:opacity-90 text-white shadow-lg" 
                        disabled={loading}
                      >
                        {loading ? "Loading..." : "Login"}
                      </Button>

                      <div className="text-center mt-4 text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <button 
                          type="button" 
                          className="text-primary font-bold hover:text-primary/80 hover:underline ml-1 transition-colors" 
                          onClick={() => setIsFlipped(true)}
                        >
                          Register
                        </button>
                      </div>
                   </form>
                </div>

                {/* REGISTER SIDE */}
                <div className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col bg-card">
                   <form onSubmit={handleRegister} className="space-y-4 w-full overflow-y-auto pr-2 custom-scrollbar">
                      {/* Name */}
                      <div className="relative">
                        <Input
                          className={inputClasses}
                          placeholder="Full Name"
                          value={registerData.name}
                          onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                          required
                        />
                        <UserCircle className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                      </div>

                      {/* Username + Popover */}
                      <div className="relative">
                        <Input
                          className={`${inputClasses} ${registerData.userid.length >= 6 ? "border-green-500/50" : ""}`}
                          placeholder="Username (min 6 chars)"
                          value={registerData.userid}
                          onChange={(e) => {
                            setRegisterData({ ...registerData, userid: e.target.value });
                            if (e.target.value.length < 6) {
                              setUsernamePopoverShown(false);
                              setShowUsernamePopover(false);
                            }
                          }}
                          required
                        />
                        <User className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                        {showUsernamePopover && (
                          <div className="absolute z-50 w-full top-full mt-1">
                             <UsernameSuggestionPopover 
                                baseUsername={registerData.userid} 
                                onSelect={handleUsernameSelect}
                                onClose={() => setShowUsernamePopover(false)}
                             />
                          </div>
                        )}
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <Input
                          type="email"
                          className={inputClasses}
                          placeholder="Email Address"
                          value={registerData.email}
                          onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                          required
                        />
                        <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                      </div>

                      {/* DOB & Gender Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="relative">
                          <Input
                            type="date"
                            className="h-[50px] rounded-[30px] bg-muted/50 dark:bg-muted/20 border border-input px-4 text-xs text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                            value={registerData.dob}
                            onChange={(e) => setRegisterData({...registerData, dob: e.target.value})}
                            required
                          />
                        </div>
                        <Select 
                          value={registerData.gender} 
                          onValueChange={(v) => setRegisterData({...registerData, gender: v})}
                        >
                          <SelectTrigger className="h-[50px] rounded-[30px] bg-muted/50 dark:bg-muted/20 border border-input px-4 text-foreground focus:ring-2 focus:ring-primary focus:border-primary">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Password + Popover */}
                      <div className="relative">
                        <Input
                          type={showRegisterPassword ? "text" : "password"}
                          className={`${inputClasses} ${passwordConfirmed ? "border-green-500 pr-16" : ""}`}
                          placeholder="Password"
                          value={registerData.password}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          required
                        />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           {passwordConfirmed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                           <button type="button" onClick={() => setShowRegisterPassword(!showRegisterPassword)} className="text-muted-foreground/70 hover:text-primary transition-colors">
                             {showRegisterPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                           </button>
                        </div>
                        {showPasswordPopover && (
                           <div className="absolute z-50 w-full top-full mt-1">
                             <PasswordValidationPopover 
                                password={registerData.password}
                                onConfirm={handlePasswordConfirm}
                                onClose={() => setShowPasswordPopover(false)}
                             />
                           </div>
                        )}
                      </div>

                      {/* Terms */}
                      <div className="flex items-center space-x-2 px-2 py-1">
                        <Checkbox 
                          id="terms-modal" 
                          checked={termsAccepted} 
                          onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                        />
                        <label htmlFor="terms-modal" className="text-[11px] leading-tight text-muted-foreground">
                          I agree to the terms and conditions
                        </label>
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full h-[50px] rounded-[30px] text-lg font-semibold bg-gradient-to-r from-[#1F9DED] to-[#00609D] hover:opacity-90 text-white shadow-lg" 
                        disabled={!termsAccepted || loading}
                      >
                        {loading ? "Creating Account..." : "Join the Reef"}
                      </Button>

                      <div className="text-center text-sm text-muted-foreground pb-4">
                        Already have an account?{" "}
                        <button 
                          type="button" 
                          className="text-primary font-bold hover:text-primary/80 hover:underline ml-1 transition-colors" 
                          onClick={() => setIsFlipped(false)}
                        >
                          Login
                        </button>
                      </div>
                   </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
      `}</style>

      <ForgotPasswordModal 
        isOpen={showForgotPassword} 
        onOpenChange={setShowForgotPassword}
        onBackToLogin={() => setShowForgotPassword(false)}
      />
    </Dialog>
  );
};

export default AuthModal;
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { authApi } from "@/api/modules/auth";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal = ({
  isOpen,
  onOpenChange,
  onBackToLogin,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      // API call to request password reset
      // Note: This endpoint needs to be implemented on the backend
      await authApi.forgotPassword(email);
      
      setIsSubmitted(true);
      toast.success("Reset link sent to your email!");
    } catch (error: any) {
      // Even if it fails (e.g. email not found), for security we often say it sent
      // But for now let's show the error if available or a generic one
      const message = error.response?.data?.message || "Failed to send reset link";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-md rounded-[20px] p-6 border bg-card shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <button 
              onClick={onBackToLogin}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-center">
                Forgot Password
              </DialogTitle>
            </DialogHeader>
            <div className="w-9" /> {/* Spacer for centering title */}
          </div>

          <div className="px-2">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center text-muted-foreground text-sm">
                  Enter your email address and we'll send you a link to reset your password.
                </div>

                <div className="relative">
                  <Input
                    type="email"
                    className="h-[50px] rounded-[30px] bg-muted/50 dark:bg-muted/20 border border-input text-foreground px-6 pr-12 focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <Mail className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/70" />
                </div>

                <Button
                  type="submit"
                  className="w-full h-[50px] rounded-[30px] text-lg font-semibold bg-gradient-to-r from-[#1F9DED] to-[#00609D] hover:opacity-90 text-white shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-6 py-4">
                <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Check your email</h3>
                  <p className="text-muted-foreground text-sm">
                    We've sent a password reset link to <br />
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </div>
                <Button
                  onClick={onBackToLogin}
                  className="w-full h-[50px] rounded-[30px] text-lg font-semibold bg-outline hover:bg-muted transition-colors border"
                  variant="outline"
                >
                  Back to Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;

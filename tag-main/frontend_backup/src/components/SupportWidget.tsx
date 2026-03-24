import React from "react";
import SupportChatWindow from "./SupportChatWindow";
import { HeadphonesIcon } from "lucide-react";
import { useSupportChat } from "@/hooks/useSupportChat";

const SESSION_WELCOME_KEY = "supportWelcomeShown";

const SupportWidget: React.FC = () => {
  const {
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
  } = useSupportChat();

  return (
    <div className="fixed bottom-6 right-6 z-50 xl:hidden">
      {!open && (
        <button
          onClick={handleSupportIconClick}
          className="bg-primary text-white p-3 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center"
          aria-label="Support Chat"
        >
          <HeadphonesIcon className="h-6 w-6" />
        </button>
      )}

      {open && chatId && (
        <SupportChatWindow
          chatId={chatId}
          onClose={handleClose}
        />
      )}

      {open && !chatId && !loading && !showDescribeForm && typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_WELCOME_KEY) !== "1" && (
        <div className="w-72 p-4 bg-card text-card-foreground rounded-lg shadow-lg border">
          <div className="font-semibold text-base mb-1">Welcome{userName ? `, ${userName}` : ""}!</div>
          <p className="text-sm text-muted-foreground mb-4">
            We&apos;re here to help. Tell us what you need and we&apos;ll connect you with support.
          </p>
          <button
            onClick={() => {
              if (typeof sessionStorage !== "undefined") {
                sessionStorage.setItem(SESSION_WELCOME_KEY, "1");
              }
              setShowDescribeForm(true);
            }}
            className="w-full bg-primary text-white p-2.5 rounded font-medium hover:opacity-90 transition-opacity"
          >
            Get started
          </button>
        </div>
      )}

      {open && !chatId && (loading || showDescribeForm || (typeof sessionStorage !== "undefined" && sessionStorage.getItem(SESSION_WELCOME_KEY) === "1")) && (
        <div className="w-64 p-3 bg-card text-card-foreground rounded-lg shadow-lg border">
          {loading && !showDescribeForm ? (
            <div className="text-sm text-muted-foreground py-2">Loading...</div>
          ) : (
            <>
              <div className="font-semibold mb-2">Need help?</div>

              {error && (
                <div className="text-red-500 text-sm mb-2">{error}</div>
              )}

              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe your issue..."
                className="w-full p-2 border rounded mb-2"
              />

              <button
                onClick={handleStart}
                disabled={loading}
                className="w-full bg-primary text-white p-2 rounded"
              >
                {loading ? "Starting..." : "Start Chat"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SupportWidget;

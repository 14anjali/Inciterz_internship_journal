import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "ads_visible";

type AdsVisibilityContextValue = {
  adsVisible: boolean;
  setAdsVisible: (visible: boolean) => void;
};

const AdsVisibilityContext = createContext<AdsVisibilityContextValue | null>(null);

export function AdsVisibilityProvider({ children }: { children: ReactNode }) {
  const [adsVisible, setAdsVisibleState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === null ? true : stored === "true";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(adsVisible));
    } catch {
      // ignore
    }
  }, [adsVisible]);

  const setAdsVisible = useCallback((visible: boolean) => {
    setAdsVisibleState(visible);
  }, []);

  return (
    <AdsVisibilityContext.Provider value={{ adsVisible, setAdsVisible }}>
      {children}
    </AdsVisibilityContext.Provider>
  );
}

export function useAdsVisibility() {
  const ctx = useContext(AdsVisibilityContext);
  if (!ctx) {
    throw new Error("useAdsVisibility must be used within AdsVisibilityProvider");
  }
  return ctx;
}

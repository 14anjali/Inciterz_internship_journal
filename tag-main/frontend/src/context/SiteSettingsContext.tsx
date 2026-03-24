import { createContext, useContext, useState, useCallback, useEffect, useLayoutEffect, useMemo, type ReactNode } from "react";
import { settingsApi, type SiteSettings } from "@/api/modules/settings";

const DEFAULTS: SiteSettings = {
  logo_light: "/light_theme_logo.webp",
  logo_dark: "/dark_theme_logo.webp",
  heading_font: "Plus Jakarta Sans",
  text_font: "Inter",
};

type SiteSettingsContextValue = {
  settings: SiteSettings;
  setSettings: (s: SiteSettings) => void;
  refetch: () => Promise<void>;
};

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

const GOOGLE_FONTS_BASE = "https://fonts.googleapis.com/css2";

/** Build Google Fonts v2 URL – family=Name+With+Spaces:wght@400;700 format */
function buildFontsLink(fonts: string[]): string {
  const unique = [...new Set(fonts)].filter(Boolean);
  if (unique.length === 0) return "";
  const params = unique
    .map((f) => "family=" + f.replace(/\s+/g, "+") + ":wght@300;400;500;600;700")
    .join("&");
  return `${GOOGLE_FONTS_BASE}?${params}&display=swap`;
}

function applyFontsToDocument(settings: SiteSettings) {
  const root = document.documentElement;
  const headingVal = `"${settings.heading_font}", sans-serif`;
  const sansVal = `"${settings.text_font}", sans-serif`;
  root.style.setProperty("--font-heading", headingVal);
  root.style.setProperty("--font-sans", sansVal);
  const existing = document.getElementById("site-settings-fonts");
  if (existing) existing.remove();
  const href = buildFontsLink([settings.heading_font, settings.text_font]);
  if (href) {
    const link = document.createElement("link");
    link.id = "site-settings-fonts";
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  }
}

export function SiteSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettingsState] = useState<SiteSettings>(DEFAULTS);

  /* Apply font variables on first paint so they’re always set by JS (not only CSS :root) */
  useLayoutEffect(() => {
    applyFontsToDocument(settings);
  }, []);

  const refetch = useCallback(async () => {
    try {
      const res = await settingsApi.get();
      const data = res.data as SiteSettings;
      const next = {
        logo_light: data.logo_light ?? DEFAULTS.logo_light,
        logo_dark: data.logo_dark ?? DEFAULTS.logo_dark,
        heading_font: data.heading_font ?? DEFAULTS.heading_font,
        text_font: data.text_font ?? DEFAULTS.text_font,
      };
      setSettingsState(next);
      applyFontsToDocument(next);
    } catch {
      setSettingsState(DEFAULTS);
      applyFontsToDocument(DEFAULTS);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const setSettings = useCallback((s: SiteSettings) => {
    setSettingsState(s);
    applyFontsToDocument(s);
  }, []);

  const value = useMemo(
    () => ({ settings, setSettings, refetch }),
    [settings, setSettings, refetch]
  );

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within SiteSettingsProvider");
  }
  return ctx;
}

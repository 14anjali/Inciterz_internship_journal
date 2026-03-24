import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import { settingsApi, type SiteSettings } from "@/api/modules/settings";
import { toast } from "sonner";
import { Loader2, Type, ImageIcon, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import LogoImageUploader from "./LogoImageUploader";
import { logoImageSrc } from "@/api/modules/settings";

/** Popular free Google Fonts – crisp, readable, professional */
const GOOGLE_FONTS = [
  { name: "Plus Jakarta Sans", category: "heading" },
  { name: "Inter", category: "text" },
  { name: "Source Sans 3", category: "text" },
  { name: "Open Sans", category: "text" },
  { name: "Roboto", category: "text" },
  { name: "Lato", category: "text" },
  { name: "Poppins", category: "heading" },
  { name: "Outfit", category: "heading" },
  { name: "Sora", category: "heading" },
  { name: "DM Sans", category: "heading" },
  { name: "Nunito", category: "text" },
  { name: "Work Sans", category: "text" },
  { name: "Montserrat", category: "heading" },
  { name: "Raleway", category: "heading" },
  { name: "Merriweather", category: "text" },
  { name: "Playfair Display", category: "heading" },
  { name: "Libre Baskerville", category: "heading" },
  { name: "Manrope", category: "heading" },
  { name: "Figtree", category: "text" },
  { name: "Lexend", category: "text" },
  { name: "Space Grotesk", category: "heading" },
  { name: "Syne", category: "heading" },
  { name: "Urbanist", category: "text" },
  { name: "Geist", category: "text" },
].sort((a, b) => a.name.localeCompare(b.name));

const DEFAULT_HEADING = "Plus Jakarta Sans";
const DEFAULT_TEXT = "Inter";

const SettingsContent = () => {
  const { settings, setSettings, refetch } = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>({
    logo_light: "",
    logo_dark: "",
    heading_font: DEFAULT_HEADING,
    text_font: DEFAULT_TEXT,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setForm({
      logo_light: settings.logo_light || "",
      logo_dark: settings.logo_dark || "",
      heading_font: settings.heading_font || DEFAULT_HEADING,
      text_font: settings.text_font || DEFAULT_TEXT,
    });
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await settingsApi.update({
        logo_light: form.logo_light.trim() || undefined,
        logo_dark: form.logo_dark.trim() || undefined,
        heading_font: form.heading_font,
        text_font: form.text_font,
      });
      const data = res.data as SiteSettings;
      setSettings(data);
      await refetch();
      toast.success("Settings saved. Changes are live on the site.");
    } catch {
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground tracking-tight font-heading">
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Customize site branding and typography. Changes apply across the frontend immediately.
        </p>
      </div>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-heading">Current settings (from database)</CardTitle>
          </div>
          <CardDescription>
            All settings are stored in the site_settings table. The form below updates these values.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="w-[200px]">Setting</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-border">
                <TableCell className="font-medium">Light theme logo</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {(settings.logo_light || "/light_theme_logo.webp") && (
                      <img
                        src={logoImageSrc(settings.logo_light || "/light_theme_logo.webp")}
                        alt="Light logo"
                        className="h-8 w-auto object-contain rounded border border-border"
                      />
                    )}
                    <span className="font-mono text-sm text-muted-foreground">
                      {settings.logo_light || "/light_theme_logo.webp (default)"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="border-border">
                <TableCell className="font-medium">Dark theme logo</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {(settings.logo_dark || "/dark_theme_logo.webp") && (
                      <img
                        src={logoImageSrc(settings.logo_dark || "/dark_theme_logo.webp")}
                        alt="Dark logo"
                        className="h-8 w-auto object-contain rounded border border-border bg-muted"
                      />
                    )}
                    <span className="font-mono text-sm text-muted-foreground">
                      {settings.logo_dark || "/dark_theme_logo.webp (default)"}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow className="border-border">
                <TableCell className="font-medium">Heading font</TableCell>
                <TableCell style={{ fontFamily: settings.heading_font }}>
                  {settings.heading_font || "—"}
                </TableCell>
              </TableRow>
              <TableRow className="border-border">
                <TableCell className="font-medium">Body / text font</TableCell>
                <TableCell style={{ fontFamily: settings.text_font }}>
                  {settings.text_font || "—"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-heading">Branding</CardTitle>
          </div>
          <CardDescription>
            Upload logos for light and dark theme. Files are stored in frontend/public/uploads/logos and only the path is saved in the database. Default logos are shown until you upload new ones.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-8">
          <div className="grid gap-2">
            <Label>Light theme logo</Label>
            <LogoImageUploader
              type="light"
              value={form.logo_light}
              onUploaded={(path) => setForm((f) => ({ ...f, logo_light: path }))}
              onClear={() => setForm((f) => ({ ...f, logo_light: "" }))}
              disabled={saving}
            />
          </div>
          <div className="grid gap-2">
            <Label>Dark theme logo</Label>
            <LogoImageUploader
              type="dark"
              value={form.logo_dark}
              onUploaded={(path) => setForm((f) => ({ ...f, logo_dark: path }))}
              onClear={() => setForm((f) => ({ ...f, logo_dark: "" }))}
              disabled={saving}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b border-border">
          <div className="flex items-center gap-2">
            <Type className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg font-heading">Typography</CardTitle>
          </div>
          <CardDescription>
            Choose Google Fonts for headings and body text. These are free and optimized for the web.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="grid gap-2">
            <Label>Heading font</Label>
            <Select
              value={form.heading_font}
              onValueChange={(v) => setForm((f) => ({ ...f, heading_font: v }))}
            >
              <SelectTrigger className="w-full" style={{ fontFamily: form.heading_font }}>
                <SelectValue placeholder="Select heading font" />
              </SelectTrigger>
              <SelectContent>
                {GOOGLE_FONTS.map((font) => (
                  <SelectItem
                    key={font.name}
                    value={font.name}
                    style={{ fontFamily: font.name }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: form.heading_font }}>
              Preview: The quick brown fox jumps over the lazy dog
            </p>
          </div>
          <div className="grid gap-2">
            <Label>Body / content font</Label>
            <Select
              value={form.text_font}
              onValueChange={(v) => setForm((f) => ({ ...f, text_font: v }))}
            >
              <SelectTrigger className="w-full" style={{ fontFamily: form.text_font }}>
                <SelectValue placeholder="Select body font" />
              </SelectTrigger>
              <SelectContent>
                {GOOGLE_FONTS.map((font) => (
                  <SelectItem
                    key={font.name}
                    value={font.name}
                    style={{ fontFamily: font.name }}
                  >
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground" style={{ fontFamily: form.text_font }}>
              Preview: The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleSave}
          disabled={saving}
          className={cn("min-w-[120px] font-heading")}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving…
            </>
          ) : (
            "Save changes"
          )}
        </Button>
        <p className="text-sm text-muted-foreground">
          Defaults: Plus Jakarta Sans (headings), Inter (body)
        </p>
      </div>
    </div>
  );
};

export default SettingsContent;

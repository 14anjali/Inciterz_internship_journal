import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Megaphone, Plus, Trash2, Pencil, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { adsApi, type AdItem, type GetAdsResponse } from "@/api/modules/ads";
import CircularLoader from "../ui/CircularLoader";
import AdImageUploader from "./AdImageUploader";
import config from "@/api/config";

type ContentType = "script" | "image";

/** e.g. "sidebar_left" -> "Sidebar Left", "before_footer" -> "Before Footer" */
function formatLocationName(location: string): string {
  return location
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const PAGE_SIZE = 10;

const ManageAds = () => {
  const [data, setData] = useState<GetAdsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [customLocationInput, setCustomLocationInput] = useState("");
  const [editingLocation, setEditingLocation] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState<{
    location: string;
    name: string;
    content_type: ContentType;
    content: string;
    image_link_url: string;
    is_active: boolean;
  }>({
    location: "",
    name: "",
    content_type: "script",
    content: "",
    image_link_url: "",
    is_active: true,
  });

  const fetchAds = async () => {
    setLoading(true);
    try {
      const res = await adsApi.getAds();
      setData(res.data);
    } catch {
      toast.error("Failed to load ads");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const getAdForLocation = (location: string): AdItem | undefined =>
    data?.ads?.find((a) => a.location === location);

  const startEdit = (loc: string, ad?: AdItem) => {
    setEditingLocation(loc);
    setForm({
      location: loc,
      name: ad?.name ?? "",
      content_type: ad?.content_type ?? "script",
      content: ad?.content ?? "",
      image_link_url: ad?.image_link_url ?? "",
      is_active: ad?.is_active ?? true,
    });
  };

  const startAddCustom = () => {
    const slug = customLocationInput.trim().toLowerCase().replace(/\s+/g, "_");
    if (!slug) {
      toast.error("Enter a location name");
      return;
    }
    if (data?.ads?.some((a) => a.location === slug)) {
      startEdit(slug, getAdForLocation(slug));
    } else {
      setEditingLocation(slug);
      setForm({
        location: slug,
        name: customLocationInput.trim(),
        content_type: "script",
        content: "",
        image_link_url: "",
        is_active: true,
      });
    }
    setCustomLocationInput("");
  };

  const handleSave = async () => {
    if (!form.location.trim()) return;

    if (form.content_type === "script") {
      if (!form.content.trim()) {
        toast.error("Paste your ad script (e.g. AdSense code).");
        return;
      }
    } else {
      if (!form.content.trim()) {
        toast.error("Please upload an image for this ad.");
        return;
      }
    }

    setSaving(form.location);
    try {
      await adsApi.createOrUpdate({
        location: form.location,
        name: form.name || undefined,
        content_type: form.content_type,
        content: form.content.trim(),
        image_link_url: form.content_type === "image" ? (form.image_link_url?.trim() || undefined) : undefined,
        is_active: form.is_active,
      });
      toast.success("Ad saved");
      setEditingLocation(null);
      fetchAds();
    } catch {
      toast.error("Failed to save ad");
    } finally {
      setSaving(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adsApi.delete(id);
      toast.success("Ad removed");
      setEditingLocation(null);
      fetchAds();
    } catch {
      toast.error("Failed to delete ad");
    }
  };

  const locations = data?.predefinedLocations ?? [
    { id: "after_header", label: "After header" },
    { id: "sidebar_left", label: "Sidebar (left)" },
    { id: "sidebar_right", label: "Sidebar (right)" },
    { id: "community_chat_sidebar", label: "Community chat sidebar" },
    { id: "before_footer", label: "Before footer" },
  ];
  const customLocations = (data?.ads ?? [])
    .filter((a) => !locations.some((p) => p.id === a.location))
    .map((a) => ({ id: a.location, label: a.name || a.location }));

  const imageSrc = (path: string) =>
    path?.startsWith("http") ? path : path ? `${config.baseUrl}${path}` : "";

  const allAds = data?.ads ?? [];
  const totalPages = Math.max(1, Math.ceil(allAds.length / PAGE_SIZE));
  const paginatedAds = allAds.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Reset to page 1 when data shrinks and current page would be empty
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(1);
  }, [totalPages, currentPage]);

  if (loading) return <CircularLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
        <Megaphone className="h-8 w-8 text-primary" />
        Manage Ads
      </h1>
      <p className="text-muted-foreground text-sm">
        Add AdSense script or image ads to specific areas of the site. Upload images or paste script. Locations: after header, sidebar (left/right), before footer. Sidebar ads appear as floating boxes and do not shift page content. You can also add custom locations.
      </p>

      {/* Table of all ads */}
      <Card className="border-border bg-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-lg">All ads</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border">
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Preview</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedAds.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                      No ads yet. Add one using the form below.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedAds.map((ad) => (
                    <TableRow key={ad.id} className="border-border">
                      <TableCell className="font-medium">{formatLocationName(ad.location)}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {ad.content_type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={ad.is_active ? "default" : "secondary"}
                          className={ad.is_active ? "bg-green-600" : ""}
                        >
                          {ad.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[120px]">
                        {ad.content_type === "image" && ad.content ? (
                          <img
                            src={imageSrc(ad.content)}
                            alt=""
                            className="h-10 w-auto object-contain rounded border border-border"
                          />
                        ) : (
                          <span className="text-xs text-muted-foreground">Script</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => startEdit(ad.location, ad)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleDelete(ad.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          {allAds.length > PAGE_SIZE && (
            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-sm text-muted-foreground">
                Showing {((currentPage - 1) * PAGE_SIZE) + 1}–{Math.min(currentPage * PAGE_SIZE, allAds.length)} of {allAds.length}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <span className="text-sm font-medium px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List of locations and current ads */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Ad locations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {locations.map((loc) => {
              const ad = getAdForLocation(loc.id);
              return (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{formatLocationName(loc.id)}</p>
                    <p className="text-xs text-muted-foreground">
                      {ad
                        ? `${ad.content_type === "script" ? "Script" : "Image"} · ${ad.is_active ? "Active" : "Inactive"}`
                        : "No ad"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(loc.id, ad)}>
                      {ad ? "Edit" : "Add"}
                    </Button>
                    {ad && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(ad.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            {customLocations.map((loc) => {
              const ad = getAdForLocation(loc.id);
              return (
                <div
                  key={loc.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                >
                  <div>
                    <p className="font-medium">{formatLocationName(loc.id)}</p>
                    <p className="text-xs text-muted-foreground">
                      {ad ? `${ad.content_type} · ${ad.is_active ? "Active" : "Inactive"}` : "No ad"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => startEdit(loc.id, ad)}>
                      {ad ? "Edit" : "Add"}
                    </Button>
                    {ad && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDelete(ad.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex gap-2 pt-2">
              <Input
                placeholder="Custom location (e.g. home_hero)"
                value={customLocationInput}
                onChange={(e) => setCustomLocationInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startAddCustom()}
              />
              <Button variant="outline" size="icon" onClick={startAddCustom} title="Add custom location">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Edit form */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-lg">
              {editingLocation ? `Edit ad: ${formatLocationName(editingLocation)}` : "Select a location to add or edit"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {editingLocation ? (
              <>
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Tabs
                    value={form.content_type}
                    onValueChange={(v) => setForm((f) => ({ ...f, content_type: v as ContentType }))}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="script">AdSense / Script</TabsTrigger>
                      <TabsTrigger value="image">Image</TabsTrigger>
                    </TabsList>
                    <TabsContent value="script" className="mt-2">
                      <Label className="text-muted-foreground text-xs">Paste your ad script (e.g. AdSense)</Label>
                      <Textarea
                        className="min-h-[200px] font-mono text-sm"
                        placeholder="<script>...</script> or ins/div code"
                        value={form.content}
                        onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                      />
                    </TabsContent>
                    <TabsContent value="image" className="mt-2 space-y-2">
                      <Label className="text-muted-foreground text-xs">Upload image</Label>
                      <AdImageUploader
                        label="Ad Image"
                        imagePath={form.content}
                        onImageUpload={async (file) => {
                          const res = await adsApi.uploadImage(file);
                          setForm((f) => ({ ...f, content: res.data.path }));
                          return res.data.path;
                        }}
                        onImageRemove={() => setForm((f) => ({ ...f, content: "" }))}
                        disabled={saving !== null}
                      />
                      <Label className="text-muted-foreground text-xs">Link URL (optional)</Label>
                      <Input
                        placeholder="https://... (where the image links to)"
                        value={form.image_link_url}
                        onChange={(e) => setForm((f) => ({ ...f, image_link_url: e.target.value }))}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.is_active}
                    onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))}
                  />
                  <Label>Active (show on frontend)</Label>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleSave} disabled={saving !== null}>
                    {saving ? "Saving..." : "Save"}
                  </Button>
                  <Button variant="outline" onClick={() => setEditingLocation(null)}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-sm">
                Click &quot;Add&quot; or &quot;Edit&quot; on a location to set an ad. Use &quot;AdSense / Script&quot; for code snippets or &quot;Image&quot; for a banner image and optional link.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ManageAds;

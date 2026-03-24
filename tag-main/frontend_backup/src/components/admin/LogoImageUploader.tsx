import { useRef, useState, useCallback, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { settingsApi, logoImageSrc } from "@/api/modules/settings";

const ACCEPT = "image/jpeg,image/png,image/gif,image/webp";
const MAX_SIZE_MB = 2;
const MAX_BYTES = MAX_SIZE_MB * 1024 * 1024;

export { logoImageSrc };

interface LogoImageUploaderProps {
  value?: string;
  type: "light" | "dark";
  onUploaded: (path: string) => void;
  onClear?: () => void;
  disabled?: boolean;
  className?: string;
}

export default function LogoImageUploader({
  value,
  type,
  onUploaded,
  onClear,
  disabled,
  className,
}: LogoImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(value ? logoImageSrc(value) : null);

  useEffect(() => {
    setPreviewUrl(value ? logoImageSrc(value) : null);
  }, [value]);

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setError(null);
      if (!file.type.startsWith("image/")) {
        setError("Please choose an image file (JPEG, PNG, GIF, WebP).");
        return;
      }
      if (file.size > MAX_BYTES) {
        setError(`Image must be under ${MAX_SIZE_MB}MB.`);
        return;
      }
      setUploading(true);
      try {
        const res = await settingsApi.uploadLogo(file, type);
        const path = res.data.path;
        onUploaded(path);
        setPreviewUrl(logoImageSrc(path));
      } catch {
        setError("Upload failed. Try again.");
      } finally {
        setUploading(false);
      }
    },
    [onUploaded, type]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleClick = () => {
    if (disabled || uploading) return;
    inputRef.current?.click();
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl(null);
    setError(null);
    onUploaded("");
    onClear?.();
  };

  const displayUrl = value ? logoImageSrc(value) : previewUrl;
  const label = type === "light" ? "Light theme logo" : "Dark theme logo";

  return (
    <div className={cn("space-y-2", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={handleInputChange}
        disabled={disabled}
      />
      <div
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200 min-h-[180px] flex flex-col items-center justify-center gap-3 p-6 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          dragging && "border-primary bg-primary/5 scale-[1.01]",
          !dragging && "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30",
          (disabled || uploading) && "pointer-events-none opacity-70",
          "cursor-pointer"
        )}
      >
        {uploading ? (
          <>
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <span className="text-sm font-medium text-muted-foreground">Uploading…</span>
          </>
        ) : displayUrl ? (
          <>
            <div className="relative w-full max-w-[240px] rounded-lg overflow-hidden bg-muted border border-border">
              <img
                src={displayUrl}
                alt={label}
                className="w-full h-auto max-h-[120px] object-contain"
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute top-2 right-2 rounded-full bg-destructive/90 text-destructive-foreground p-1.5 shadow-md hover:bg-destructive transition-colors"
                  aria-label="Remove logo"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <span className="text-xs text-muted-foreground">Click or drop to replace</span>
          </>
        ) : (
          <>
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground">
                JPEG, PNG, GIF or WebP · max {MAX_SIZE_MB}MB
              </p>
            </div>
          </>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

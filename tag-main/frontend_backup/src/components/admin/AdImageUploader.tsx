import config from "@/api/config";
import { X, UploadCloud, Image as ImageIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { toast } from "sonner";

interface AdImageUploaderProps {
  label: string;
  imagePath: string | null;
  onImageUpload: (file: File) => Promise<string>;
  onImageRemove: () => void;
  disabled?: boolean;
}

export function imageSrc(path: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  // Normalize base URL by removing trailing slash and /api suffix
  const normalizedBase = String(config.baseUrl || "").replace(/\/+$/, "");
  const baseWithoutApi = normalizedBase.replace(/\/api$/, "");
  
  // Ensure path starts with /
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseWithoutApi}${normalizedPath}`;
}

export default function AdImageUploader({
  label,
  imagePath,
  onImageUpload,
  onImageRemove,
  disabled,
}: AdImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    try {
      setIsUploading(true);
      await onImageUpload(file);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setIsUploading(false);
      // Reset input so same file can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>

      {!imagePath ? (
        <div
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors bg-muted/5 group ${
            disabled || isUploading
              ? "border-muted-foreground/10 cursor-not-allowed opacity-60"
              : "border-muted-foreground/25 hover:border-primary/50 cursor-pointer"
          }`}
        >
          <div className="p-3 rounded-full bg-background border shadow-sm group-hover:scale-110 transition-transform duration-200">
            <UploadCloud className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
          </div>
          <p className="mt-3 text-sm font-medium text-muted-foreground group-hover:text-foreground">
            Click to upload image
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            SVG, PNG, JPG or GIF
          </p>
        </div>
      ) : (
        <div className="relative group rounded-lg overflow-hidden border bg-background">
          <div className="aspect-video w-full relative">
            <img
              src={imageSrc(imagePath)}
              alt="Ad preview"
              className="w-full h-full object-contain bg-black/5"
            />
          </div>
          
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled || isUploading}
            >
              Change
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onImageRemove}
              disabled={disabled || isUploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { adsApi } from "@/api/modules/ads";
import config from "@/api/config";

interface AdSlotProps {
  location: string;
  className?: string;
}

/**
 * Fetches and renders the ad for the given location (script or image).
 * Used in Layout for after_header, sidebar, before_footer and any custom locations.
 */
const AdSlot = ({ location, className = "" }: AdSlotProps) => {
  const [ad, setAd] = useState<{
    content_type: "script" | "image";
    content: string;
    image_link_url: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    adsApi
      .getByLocation(location)
      .then((res) => {
        if (!cancelled && res.data?.data) {
          setAd({
            content_type: res.data.data.content_type,
            content: res.data.data.content,
            image_link_url: res.data.data.image_link_url ?? null,
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [location]);

  useEffect(() => {
    if (!ad || ad.content_type !== "script" || !containerRef.current) return;
    const el = containerRef.current;
    el.innerHTML = ad.content;
    const scripts = el.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      Array.from(oldScript.attributes).forEach((attr) =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [ad]);

  if (loading || !ad) return null;

  if (ad.content_type === "image") {
    // Helper to fix image URLs
    const getImageUrl = (path: string) => {
      if (!path) return "";
      if (path.startsWith("http")) return path;
      
      const normalizedBase = String(config.baseUrl || "").replace(/\/+$/, "");
      const baseWithoutApi = normalizedBase.replace(/\/api$/, "");
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      
      return `${baseWithoutApi}${normalizedPath}`;
    };

    const imageUrl = getImageUrl(ad.content);
    
    const wrapper = (
      <img
        src={imageUrl}
        alt="Ad"
        className="max-w-full h-auto block object-contain"
        loading="lazy"
      />
    );
    
    return (
      <div className={`ad-slot ad-slot-${location} ${className}`.trim()}>
        {ad.image_link_url ? (
          <a
            href={ad.image_link_url}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="block w-full h-full"
          >
            {wrapper}
          </a>
        ) : (
          wrapper
        )}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`ad-slot ad-slot-${location} ${className}`.trim()}
    />
  );
};

export default AdSlot;

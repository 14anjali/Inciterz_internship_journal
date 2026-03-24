import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CircularLoader from "@/components/ui/CircularLoader";
import { useVideoUsers } from "@/hooks/useVideoUsers";
import { ChevronLeft, ChevronRight, Play, Search, MessageSquare, ThumbsUp, Clock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const videos = [
  {
    id: 1,
    title: "Setting Up Your First Aquarium",
    duration: "15:30",
    views: "25K",
    thumbnail: "🐠",
  },
  {
    id: 2,
    title: "Understanding the Nitrogen Cycle",
    duration: "12:45",
    views: "18K",
    thumbnail: "♻️",
  },
  {
    id: 3,
    title: "Aquascaping for Beginners",
    duration: "20:15",
    views: "32K",
    thumbnail: "🌿",
  },
  {
    id: 4,
    title: "Breeding Betta Fish",
    duration: "18:20",
    views: "15K",
    thumbnail: "🐟",
  },
  {
    id: 5,
    title: "Planted Tank Maintenance",
    duration: "14:50",
    views: "22K",
    thumbnail: "🌱",
  },
  {
    id: 6,
    title: "Common Fish Diseases",
    duration: "16:40",
    views: "28K",
    thumbnail: "🏥",
  },
  {
    id: 7,
    title: "Water Parameters Explained",
    duration: "13:25",
    views: "19K",
    thumbnail: "💧",
  },
  {
    id: 8,
    title: "Advanced CO2 Systems",
    duration: "22:10",
    views: "12K",
    thumbnail: "⚗️",
  },
];

const VideoGuides = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isError, isLoading } = useVideoUsers(page, debouncedSearch);
  const videoArray = data?.videos || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const navigate = useNavigate();

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Get thumbnail from YouTube video ID
  const getThumbnail = (videoId: string) => {
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/placeholder.svg";
  };

  // Calculate days ago from createdAt
  const getDaysAgo = (createdAt: string) => {
    if (!createdAt) return 0;
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const displayVideos = videoArray.map((video) => ({
    ...video,
    views: video.viewCount || 0,
    daysAgo: getDaysAgo(video.createdAt),
    comments: 0, // Can be added later if you have comments
    likes: 0, // Can be added later if you have likes
    thumbnail: getThumbnail(video.videoId),
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground text-card-foreground">
          Video Guides
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Learn from expert aquarists with our comprehensive video tutorials
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-12 rounded-lg border-border bg-secondary/50 focus:bg-background focus:border-primary"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {Array.from({ length: 7 }).map((_, index) => (
          <Button
            key={index}
            variant="outline"
            className="rounded-full px-6 py-2 bg-card hover:bg-card/80 hover:bg-accent border-border border-border text-foreground text-card-foreground"
          >
            Lorem ipsum
          </Button>
        ))}
      </div>

      {/* Video Grid - 4 columns */}
      {isLoading ? (
        <CircularLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {displayVideos.length > 0 ? (
            displayVideos.map((video, index) => (
            <Card
              key={video.id || index}
              className="bg-card hover:shadow-lg transition-all cursor-pointer rounded-lg overflow-hidden group text-foreground text-card-foreground"
              onClick={() => {
                if (video.id) {
                  navigate(`/view/video/${video.id}`);
                }
              }}
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video bg-muted overflow-hidden">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-8 w-8 text-primary ml-1" fill="hsl(var(--primary))" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
                  {video.title}
                </CardTitle>
                {(video as any).is_ownership_transferred && (
                  <div className="mb-2 flex items-start gap-1 rounded border border-amber-500/40 bg-amber-500/10 px-2 py-1 text-xs text-amber-700 dark:text-amber-400">
                    <span className="shrink-0">⚠</span>
                    <span>Originally by <span className="font-semibold">{(video as any).original_owner_name || "deleted user"}</span>. Transferred to admin.</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <span>{video.views} views</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{video.daysAgo} days ago</span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{String(video.comments || '01').padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{video.likes || '10'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              {searchQuery ? "No videos found matching your search." : "No videos available."}
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="text-muted-foreground hover:text-foreground"
        >
          &lt; Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {totalPages > 0 && (
            <>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === page ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setPage(pageNum)}
                    className={
                      pageNum === page
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-8 w-8 p-0"
                        : "text-muted-foreground hover:text-foreground rounded-full h-8 w-8 p-0"
                    }
                  >
                    {pageNum}
                  </Button>
                );
              })}
              {totalPages > 5 && page < totalPages - 2 && (
                <span className="text-muted-foreground">...</span>
              )}
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          className="text-muted-foreground hover:text-foreground"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default VideoGuides;

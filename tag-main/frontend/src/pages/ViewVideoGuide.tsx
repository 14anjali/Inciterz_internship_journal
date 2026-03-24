import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, Play, Clock, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { videoApi } from "@/api/modules/video";
import { toast } from "sonner";
import DOMPurify from "dompurify";

const EMPTY_MESSAGE = "No content available.";

const ViewVideoGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [videoData, setVideoData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVideo = async () => {
      if (!id) {
        setIsLoading(false);
        toast.error("Video guide ID not found");
        return;
      }

      try {
        setIsLoading(true);
        const res = await videoApi.getVideoById(id);
        const data = res?.data;
        
        if (data && data.title) {
          setVideoData(data);
        } else {
          toast.error("Failed to load video guide");
        }
      } catch (error: any) {
        console.error("Error fetching video guide:", error);
        toast.error(error?.response?.data?.message || "Failed to load video guide");
      } finally {
        setIsLoading(false);
      }
    };

    getVideo();
  }, [id]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get YouTube embed URL from videoId or youtubeLink
  const getEmbedUrl = () => {
    if (!videoData) return "";
    if (videoData.videoId) {
      return `https://www.youtube.com/embed/${videoData.videoId}`;
    }
    if (videoData.youtubeLink) {
      const videoId = videoData.youtubeLink.split("v=")[1]?.split("&")[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }
    return "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-10 w-44 mb-6" />
          <Card className="dark:bg-card shadow-lg text-foreground">
            <CardHeader className="pb-4 border-b">
              <Skeleton className="h-10 w-[min(42rem,90%)]" />
              <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-6">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-5 w-56" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-[92%]" />
              <Skeleton className="h-6 w-[85%]" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!videoData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-muted-foreground mb-4">{EMPTY_MESSAGE}</p>
          <Button onClick={() => navigate("/video-guides")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Video Guides
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/video-guides")}
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Video Guides
        </Button>

        {/* Main Content Card */}
        <Card className="dark:bg-card shadow-lg text-foreground">
          <CardHeader className="pb-4 border-b">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-zolina font-bold text-foreground mb-4 leading-tight">
              {videoData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              {videoData.owner && (
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="font-medium">{videoData.owner.name || videoData.owner.userid || "Unknown Author"}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(videoData.createdAt || videoData.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <span>{(videoData.viewCount || 0).toLocaleString()} views</span>
              </div>
              {videoData.duration && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{videoData.duration}</span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-8">
            {/* Video Player */}
            <div className="mb-8">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl()}
                  title={videoData.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Description (render rich HTML safely) */}
            {videoData.description && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <div
                  className="text-muted-foreground leading-relaxed prose prose-sm max-w-none prose-p:mb-3 prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(videoData.description),
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Button
            onClick={() => navigate("/video-guides")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Browse More Videos
          </Button>
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewVideoGuide;

import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Calendar, User, MessageSquare, ThumbsUp, BookOpen, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { textApi } from "@/api/modules/text";
import { toast } from "sonner";
import DOMPurify from "dompurify";

const EMPTY_MESSAGE = "No content available.";

const ViewTextGuide = () => {
  const { textId } = useParams<{ textId: string }>();
  const navigate = useNavigate();
  const { textIds } = useParams();
  const [guideData, setGuideData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getText = async () => {
      try {
        const guideId = textIds || textId;
        if (!guideId) {
          setIsLoading(false);
          toast.error("Text guide ID not found");
          return;
        }
        
        const res = await textApi.getTextGuideByid(guideId);
        //console.log("API Response:", res);
        
        const payload: unknown = res?.data;
        const extracted =
          payload && typeof payload === "object" && "data" in payload
            ? (payload as Record<string, unknown>).data
            : payload;

        const isGuide =
          extracted &&
          typeof extracted === "object" &&
          "title" in extracted &&
          "content" in extracted;

        if (isGuide) {
          setGuideData(extracted);
        } else {
          //console.error("Invalid data structure:", data);
          toast.error("Failed to load text guide");
        }
      } catch (error: any) {
        //console.error("Error fetching text guide:", error);
        toast.error(error?.response?.data?.message || "Failed to load text guide");
      } finally {
        setIsLoading(false);
      }
    };

    getText();
  }, [textIds, textId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Skeleton className="h-10 w-44 mb-6" />
          <Card className="bg-card shadow-lg text-foreground">
            <CardHeader className="pb-4 border-b">
              <Skeleton className="h-10 w-[min(42rem,90%)]" />
              <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-6">
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-4 w-40" />
              </div>
              <div className="mt-6 pt-4 border-t flex items-center gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-[92%]" />
              <Skeleton className="h-6 w-[88%]" />
              <Skeleton className="h-6 w-[85%]" />
              <Skeleton className="h-6 w-[90%]" />
              <Skeleton className="h-6 w-[80%]" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!guideData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-muted-foreground mb-4">{EMPTY_MESSAGE}</p>
          <Button onClick={() => navigate("/text-guides")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Text Guides
          </Button>
        </div>
      </div>
    );
  }

  const displayData = guideData;

  const sanitizedContent = DOMPurify.sanitize(displayData.content);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Button
          onClick={() => navigate("/text-guides")}
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Text Guides
        </Button>

        {/* Main Content Card */}
        <Card className="bg-card shadow-lg text-foreground">
          <CardHeader className="pb-4 border-b">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-zolina font-bold text-foreground mb-4 leading-tight">
              {displayData.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {displayData.authorUser?.userid || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(displayData.createdAt || displayData.created_at)}</span>
              </div>
              {displayData.updatedAt && displayData.updatedAt !== displayData.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Updated {formatDate(displayData.updatedAt)}
                  </span>
                </div>
              )}
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {displayData.comments ?? 0} Comments
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="font-medium">
                  {displayData.likes ?? 0} Likes
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Article Content */}
            <article
              className="guide-content prose prose-lg max-w-none prose-headings:text-foreground prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-strong:text-foreground prose-strong:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-muted-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:text-foreground prose-img:rounded-lg prose-img:shadow-md prose-img:my-6 prose-hr:border-border prose-hr:my-8"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Button
            onClick={() => navigate("/text-guides")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Browse More Guides
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

export default ViewTextGuide;

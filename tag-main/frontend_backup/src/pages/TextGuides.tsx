import { TextGuide } from "@/api/apiTypes";
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
import { useTextGuidePublic } from "@/hooks/useTextGuidePublic";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EMPTY_MESSAGE = "No content available.";
const EMPTY_MESSAGE_SEARCH = "No guides found matching your search.";

const TextGuides = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, isLoading, isError } = useTextGuidePublic(page, debouncedSearch);

  const textGuidesArray: TextGuide[] = data?.data || [];
  const totalPages: number = data?.pagination?.totalPages || 1;

  const navigate = useNavigate();

  const handleTextNavigate = (id: string) => {
    navigate(`/view/text/${id}`);
  };

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to first page on search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Extract description from content (first 150 chars)
  const getDescription = (content: string) => {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]*>/g, "").trim();
    return textContent.length > 150 ? textContent.substring(0, 150) + "..." : textContent;
  };

  const displayGuides = textGuidesArray.map((guide) => ({
    ...guide,
    description: getDescription(guide.content || ""),
    image: (guide as { featured_image?: string; image_url?: string }).featured_image
      || (guide as { featured_image?: string; image_url?: string }).image_url
      || "/placeholder.svg",
  }));

  if (isLoading) return <CircularLoader />;
  if (isError)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground mb-4">{EMPTY_MESSAGE}</p>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-card-foreground">
          Text Guides
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Expert-written guides on aquarium care and fishkeeping
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-4 pr-12 rounded-lg border-border bg-secondary/50 focus:bg-white focus:border-primary"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Grid of Guide Cards - 4 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {displayGuides.length > 0 ? (
          displayGuides.map((guide, index) => (
          <Card
            key={guide.id || index}
            className="bg-card transition-all duration-300 cursor-pointer rounded-lg overflow-hidden hover:shadow-lg text-card-foreground"
            onClick={() => {
              if (guide.id) {
                handleTextNavigate(guide.id);
              }
            }}
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={guide.image || "/placeholder.svg"}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-sm font-semibold text-foreground mb-2 line-clamp-2">
                {guide.title}
              </CardTitle>
              <CardDescription className="text-xs text-foreground/80 line-clamp-2">
                {guide.description}
              </CardDescription>
            </CardContent>
          </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            {searchQuery ? EMPTY_MESSAGE_SEARCH : EMPTY_MESSAGE}
          </div>
        )}
      </div>

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

export default TextGuides;

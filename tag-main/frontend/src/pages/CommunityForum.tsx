import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare, ThumbsUp, Search, Filter, ArrowUpDown, RefreshCw } from "lucide-react";
import { useCommunityForumPublic } from "@/hooks/useCommunityForumPublic";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const iconArray = ["🐠", "💧", "🏥", "🌿", "🌱", "🥚", "🌍"];

const CommunityForum = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { data, isLoading, isError } = useCommunityForumPublic(pageNumber);

  const navigate = useNavigate();

  const forumPosts = data?.data ?? [];
  const totalPages = data?.pagination?.total_pages ?? 1;

  const handleRefresh = () => {
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 text-center">
          <Skeleton className="h-12 w-64 mx-auto" />
          <Skeleton className="h-6 w-[min(42rem,90%)] mx-auto mt-4" />
          <Skeleton className="h-12 w-52 mx-auto mt-6 rounded-lg" />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Skeleton className="h-6 w-48" />
          <div className="flex items-center gap-2 sm:gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-24 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }
  if (isError) return <div className="text-red-600">Failed to load posts. Please try again later.</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground text-card-foreground">
          Community Forum
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ask questions, share advice, and showcase your aquariums! Join discussions with other hobbyists.
        </p>
        <Button 
          className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] hover:opacity-90 text-white rounded-lg px-8 py-3"
          onClick={() => navigate('/community-forum/create')}
        >
          Start a Discussion
        </Button>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-lg font-medium text-foreground text-card-foreground">
          All community forum
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-full h-10 px-4 flex items-center gap-2"
          >
            <Search className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-full h-10 px-4 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white rounded-full h-10 px-4 flex items-center gap-2"
          >
            <ArrowUpDown className="h-4 w-4" />
            <span className="hidden sm:inline">Sort</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 bg-primary hover:bg-primary/90 text-white"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Two Column Grid */}
      {forumPosts.length === 0 ? (
        <Card className="bg-card rounded-lg p-8 text-center">
          <CardTitle className="text-xl">No discussions yet</CardTitle>
          <CardDescription className="mt-2">
            Start the first discussion for the community.
          </CardDescription>
          <div className="mt-6">
            <Button
              className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] hover:opacity-90 text-white rounded-lg px-8 py-3"
              onClick={() => navigate('/community-forum/create')}
            >
              Start a Discussion
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {forumPosts.slice(0, 8).map((post, index) => (
            <Card
              key={post.id}
              className="bg-card transition-all duration-300 cursor-pointer rounded-lg group text-foreground text-card-foreground"
              style={{
                boxShadow: '0 0 5px 0 hsl(var(--primary) / 0.1)',
                transform: 'translateY(0) scale(1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 8px 16px 0 hsl(var(--primary) / 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 5px 0 hsl(var(--primary) / 0.1)';
              }}
              onClick={() => navigate(`/view/forum/${post.id}`)}
            >
              {post.is_ownership_transferred && (
                <div className="mx-4 mt-3 flex items-start gap-2 rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-700 dark:text-amber-400">
                  <span className="mt-0.5 shrink-0">⚠</span>
                  <span>
                    Originally posted by <span className="font-semibold">{post.original_owner_name || "a deleted user"}</span>. Ownership transferred to admin.
                  </span>
                </div>
              )}
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="text-2xl flex-shrink-0">{iconArray[index % 7]}</div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base font-semibold text-foreground mb-2 line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      Posted by {post.Creator_Username || 'unknown'}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-end gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" />
                    <span>{String(post.Total_Comments || '00').padStart(2, '0')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" />
                    <span>{post.likes?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
          className="text-muted-foreground hover:text-foreground"
        >
          &lt; Previous
        </Button>
        
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(4, totalPages) }, (_, i) => i + 1).map((pageNum) => (
            <Button
              key={pageNum}
              variant={pageNum === pageNumber ? "default" : "ghost"}
              size="sm"
              onClick={() => setPageNumber(pageNum)}
              className={
                pageNum === pageNumber
                  ? "bg-primary hover:bg-primary/90 text-white rounded-full h-8 w-8 p-0"
                  : "text-muted-foreground hover:text-foreground rounded-full h-8 w-8 p-0"
              }
            >
              {pageNum}
            </Button>
          ))}
          {totalPages > 4 && (
            <>
              <span className="text-muted-foreground">...</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPageNumber(totalPages)}
                className="text-muted-foreground hover:text-foreground rounded-full h-8 w-8 p-0"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
          disabled={pageNumber >= totalPages}
          className="text-muted-foreground hover:text-foreground"
        >
          Next &gt;
        </Button>
      </div>
    </div>
  );
};

export default CommunityForum;

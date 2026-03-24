import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Send,
  MessageSquare,
  Calendar,
  User,
} from "lucide-react";
import { useState } from "react";
import { useCommunityForumbyId } from "@/hooks/useCommunityForumPublic";
// import { community_forum_api } from "@/api/modules/community_forum";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthModal } from "@/hooks/useAuthModal";


const ViewForum = () => {
  const { id } = useParams<{ id: string }>();

  const isAuthenticated = !!localStorage.getItem("accessToken");
  const { openLogin } = useAuthModal();
  
  const redirectToLogin = () => {
    openLogin();
  };

  // For now, use dummy data
  const { data: forumResponse, isLoading: isLoadingPost, isError: isErrorPost } = useCommunityForumbyId(id || "");

  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();
  const forumPost = forumResponse?.data;
  const comments = forumResponse?.comments ?? [];

  // Uncomment when API is ready
  // const queryClient = useQueryClient();
  // const voteMutation = useMutation({
  //   mutationFn: (type: "up" | "down") => {
  //     if (type === "up") {
  //       return community_forum_api.likeCommunity({ forum_id: id! });
  //     } else {
  //       return community_forum_api.dislikeCommunity({ forum_id: id! });
  //     }
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["communityForumbyId", id],
  //     });
  //   },
  // })

  // const addCommentMutation = useMutation({
  //   mutationFn: (content: string) =>
  //     community_forum_api.addComment({ content }, id!),
  //   onSuccess: () => {
  //     setNewComment("");
  //     queryClient.invalidateQueries({
  //       queryKey: ["communityForumbyId", forumPost.id],
  //     });
  //   },
  // });



  const handlevote = (type: "up" | "down") => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    setUserVote(prev => prev === type ? null : type);
    // voteMutation.mutate(type); // Uncomment when API is ready
    toast.success(`You ${type === "up" ? "liked" : "disliked"} this discussion!`);
  }

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      redirectToLogin();
      return;
    }
    if (!newComment.trim()) return;

    // addCommentMutation.mutate(newComment); // Uncomment when API is ready
    toast.success("Comment added successfully!");
    setNewComment("");
  };
  const formatDate = (dateString: string) => {
    if (!dateString) return "Unknown date";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoadingPost) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <Button
            onClick={() => navigate("/community-forum")}
            variant="ghost"
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Community Forum
          </Button>

          <Card className="bg-card shadow-lg text-foreground">
            <CardHeader className="pb-4 border-b">
              <Skeleton className="h-10 w-[min(42rem,90%)]" />
              <div className="mt-4 flex flex-wrap items-center gap-4 md:gap-6">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-44" />
              </div>
              <div className="mt-6 pt-4 border-t flex items-center gap-6">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </CardHeader>
            <CardContent className="pt-8 space-y-6">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-[92%]" />
              <Skeleton className="h-6 w-[85%]" />
              <Skeleton className="h-6 w-[88%]" />
              <div className="pt-4 border-t flex items-center gap-4">
                <Skeleton className="h-9 w-24 rounded-md" />
                <Skeleton className="h-9 w-24 rounded-md" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card shadow-lg mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-24 self-end" />
              </div>
              <div className="pt-4 border-t space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full rounded-lg" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  if (isErrorPost || !forumPost) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-red-600">Failed to load forum post.</div>
        <div className="mt-4">
          <Button onClick={() => navigate("/community-forum")} variant="outline">
            Back to Community Forum
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
          onClick={() => navigate("/community-forum")}
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community Forum
        </Button>

        {/* Main Content Card */}
        <Card className="bg-card shadow-lg text-foreground">
          <CardHeader className="pb-4 border-b">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-zolina font-bold text-foreground mb-4 leading-tight">
              {forumPost.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{forumPost.Creator_Username}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(forumPost.createdAt)}</span>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="flex items-center gap-6 mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="font-medium">{comments.length} Comments</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="font-medium">{(forumPost.likes || []).length} Likes</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            {/* Post Content */}
            <div>
              <article
                className="guide-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: forumPost.content }}
              />
            </div>

            {/* Vote Section */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <Button
                type="button"
                variant={userVote === "up" ? "default" : "outline"}
                size="sm"
                onClick={() => handlevote("up")}
                className={`gap-2 ${
                  userVote === "up"
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{(forumPost.likes || []).length}</span>
              </Button>
              <Button
                type="button"
                variant={userVote === "down" ? "destructive" : "outline"}
                size="sm"
                onClick={() => handlevote("down")}
                className="gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{(forumPost.dislike || []).length}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comment Section */}
        <Card className="bg-card shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <MessageSquare className="h-5 w-5 text-primary" />
              Comments ({comments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Comment */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 min-h-[80px] border-border focus:border-primary"
              />
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="self-end bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>

            {/* Comments List */}
            <div className="space-y-4 pt-4 border-t">
              {comments.map((comment) => (
                <div key={comment.id} className="p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="font-medium text-sm text-foreground">
                      {comment.UserId}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      • {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Button
            onClick={() => navigate("/community-forum")}
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Back to Forum
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

export default ViewForum;

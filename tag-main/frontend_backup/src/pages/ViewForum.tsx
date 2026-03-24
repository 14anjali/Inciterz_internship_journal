import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
// import { useCommunityForumbyId } from "@/hooks/useCommunityForumPublic";
// import CircularLoader from "@/components/ui/CircularLoader";
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
  // const {data: forumResponse, isLoading: isLoadingPost, isError: isErrorPost} = useCommunityForumbyId(id!);

  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  // Dummy data for demonstration
  const dummyForumPost = {
    id: id || "1",
    title: "Aquascaping Masterclass (Pt. 3): Substrate & Nutrition | TAG",
    content: `
      <h2>Introduction to Aquascaping</h2>
      <p>Aquascaping is the art of creating beautiful underwater landscapes in aquariums. This comprehensive guide will walk you through the essential techniques and principles needed to create stunning aquascapes that rival nature itself.</p>
      
      <h2>Understanding Substrate</h2>
      <p>The foundation of any great aquascape begins with the right substrate. Substrate serves multiple purposes in an aquarium:</p>
      <ul>
        <li><strong>Nutrient Base:</strong> Provides essential nutrients for plant roots</li>
        <li><strong>Biological Filtration:</strong> Hosts beneficial bacteria</li>
        <li><strong>Aesthetic Appeal:</strong> Creates visual depth and texture</li>
        <li><strong>Plant Anchoring:</strong> Gives plants a stable base to grow</li>
      </ul>
      
      <h3>Types of Substrate</h3>
      <p>There are several types of substrates available, each with its own advantages:</p>
      
      <h4>1. Aqua Soil</h4>
      <p>Aqua soil is specifically designed for planted aquariums. It contains essential nutrients and helps maintain optimal pH levels for plant growth. Popular brands include ADA Aqua Soil and Fluval Stratum.</p>
      
      <h4>2. Gravel</h4>
      <p>Gravel is a versatile option that comes in various sizes and colors. While it doesn't provide nutrients on its own, it can be used with root tabs to support plant growth.</p>
      
      <h2>Plant Nutrition Essentials</h2>
      <p>Proper nutrition is crucial for healthy plant growth in aquascapes. Plants require three main categories of nutrients:</p>
      
      <h3>Macronutrients</h3>
      <ul>
        <li><strong>Nitrogen (N):</strong> Essential for leaf growth and overall plant development</li>
        <li><strong>Phosphorus (P):</strong> Important for root development and flowering</li>
        <li><strong>Potassium (K):</strong> Aids in photosynthesis and water regulation</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Mastering substrate and nutrition is fundamental to successful aquascaping. With the right foundation and proper feeding, your aquatic plants will thrive, creating a stunning underwater landscape that brings joy and tranquility to your space.</p>
    `,
    Creator_Username: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    likes: Array(156).fill("user"),
    dislike: Array(5).fill("user"),
  };

  const dummyComments = [
    { id: "1", UserId: "aqua_expert", content: "Great guide! This really helped me understand substrate selection.", createdAt: new Date(Date.now() - 86400000).toISOString() },
    { id: "2", UserId: "fish_keeper", content: "I've been using aqua soil for years and can confirm it works wonders for plant growth.", createdAt: new Date(Date.now() - 172800000).toISOString() },
    { id: "3", UserId: "plant_master", content: "Thanks for sharing! The nutrition section was particularly helpful.", createdAt: new Date(Date.now() - 259200000).toISOString() },
  ];

  const forumPost = dummyForumPost;
  const comments = dummyComments;

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
                <span className="font-medium">{forumPost.likes.length} Likes</span>
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
                <span>{forumPost.likes.length}</span>
              </Button>
              <Button
                type="button"
                variant={userVote === "down" ? "destructive" : "outline"}
                size="sm"
                onClick={() => handlevote("down")}
                className="gap-2"
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{forumPost.dislike.length}</span>
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

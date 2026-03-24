import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare, FileText, Send } from "lucide-react";
import JoditEditor from "jodit-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { community_forum_api } from "@/api/modules/community_forum";
import { toast } from "sonner";

const CreateForumDiscussion = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [discussionContent, setDiscussionContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start writing your discussion...",
      height: 500,
      style: {
        color: "black",
        fontFamily: "Arial, sans-serif",
        fontSize: "14px",
      },
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "paragraph",
        "|",
        "image",
        "link",
        "|",
        "align",
        "|",
        "undo",
        "redo",
        "|",
        "hr",
        "eraser",
        "fullsize",
      ],
    }),
    []
  );

  const createDiscussionMutation = useMutation({
    mutationFn: community_forum_api.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["communityForum"] });
      toast.success("Discussion submitted successfully! It will be reviewed before publishing.");
      setTitle("");
      setContent("");
      setDiscussionContent("");
      // Navigate back to community forum page after a short delay
      setTimeout(() => {
        navigate("/community-forum");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create discussion. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title for your discussion");
      return;
    }

    if (!discussionContent.trim() || discussionContent.trim().length < 20) {
      toast.error("Please provide discussion content (at least 20 characters)");
      return;
    }

    createDiscussionMutation.mutate({
      title: title.trim(),
      content: discussionContent,
    });
  };

  const handleCancel = () => {
    if (title || discussionContent) {
      if (window.confirm("Are you sure you want to leave? Your changes will be lost.")) {
        navigate("/community-forum");
      }
    } else {
      navigate("/community-forum");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back Button */}
        <Button
          onClick={handleCancel}
          variant="ghost"
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Community Forum
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-zolina font-bold text-foreground mb-2">
            Start a New Discussion
          </h1>
          <p className="text-muted-foreground">
            Share your thoughts, ask questions, or start a conversation with the community.
          </p>
        </div>

        {/* Form Card */}
        <Card className="dark:bg-card shadow-lg text-foreground">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">
                Discussion Information
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="discussion-title" className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Discussion Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="discussion-title"
                  placeholder="e.g., How to cycle a new aquarium?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 text-base border-border focus:border-primary focus:ring-[hsl(var(--primary))]"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Choose a clear, descriptive title that summarizes your discussion topic
                </p>
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <Label htmlFor="discussion-content" className="text-base font-semibold text-foreground flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  Discussion Content <span className="text-red-500">*</span>
                </Label>
                <div className="border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-[hsl(var(--primary))] focus-within:ring-opacity-20">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setDiscussionContent(newContent)}
                    className="text-foreground"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Write your discussion content. Include details, questions, or any information that will help others understand your topic. Minimum 20 characters.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 border-border text-muted-foreground hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createDiscussionMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] hover:opacity-90 text-white"
                >
                  {createDiscussionMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Post Discussion
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-card shadow-lg mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-card-foreground">
              Tips for Creating a Great Discussion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Be clear and specific about your topic or question</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Provide context and background information when relevant</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Use proper formatting to make your post easy to read</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Be respectful and follow community guidelines</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your discussion will be reviewed before being published</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateForumDiscussion;

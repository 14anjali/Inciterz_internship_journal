import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, FileText, Save } from "lucide-react";
import JoditEditor from "jodit-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { textApi } from "@/api/modules/text";
import { toast } from "sonner";

const CreateTextGuide = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const editor = useRef(null);
  const [title, setTitle] = useState("");
  // Single source of truth for editor content
  const [content, setContent] = useState("");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start writing your guide...",
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

  const createTextGuideMutation = useMutation({
    mutationFn: textApi.create,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["texts"] });
      toast.success("Text guide submitted successfully! It will be reviewed before publishing.");
      setTitle("");
      setContent("");
      // Navigate back to text guides page after a short delay
      setTimeout(() => {
        navigate("/text-guides");
      }, 1500);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create text guide. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      toast.error("Please enter a title for your guide");
      return;
    }

    if (!content.trim() || content.trim().length < 50) {
      toast.error("Please provide guide content (at least 50 characters)");
      return;
    }

    createTextGuideMutation.mutate({
      title: title.trim(),
      content,
    });
  };

  const handleCancel = () => {
    if (title || content) {
      if (window.confirm("Are you sure you want to leave? Your changes will be lost.")) {
        navigate("/text-guides");
      }
    } else {
      navigate("/text-guides");
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
          Back to Text Guides
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-zolina font-bold text-foreground mb-2">
            Create New Text Guide
          </h1>
          <p className="text-muted-foreground">
            Share your knowledge with the community. Write a comprehensive guide about fishkeeping.
          </p>
        </div>

        {/* Form Card */}
        <Card className="dark:bg-card shadow-lg text-foreground">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-xl font-semibold text-foreground">
                Guide Information
              </CardTitle>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="space-y-2">
                <Label htmlFor="guide-title" className="text-base font-semibold text-foreground flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  Guide Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guide-title"
                  placeholder="e.g., Beginner's Guide to Freshwater Tanks"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="h-12 text-base border-border focus:border-primary focus:ring-[hsl(var(--primary))]"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Choose a clear, descriptive title that summarizes your guide
                </p>
              </div>

              {/* Content Field */}
              <div className="space-y-2">
                <Label htmlFor="guide-content" className="text-base font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" />
                  Guide Content <span className="text-red-500">*</span>
                </Label>
                <div className="border border-border rounded-md overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-[hsl(var(--primary))] focus-within:ring-opacity-20">
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    tabIndex={1}
                    onBlur={(newContent) => setContent(newContent)}
                    onChange={(newContent) => setContent(newContent)}
                    className="text-foreground"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Write a comprehensive guide. Include headings, lists, and formatting to make it easy to read. Minimum 50 characters.
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
                  disabled={createTextGuideMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] hover:opacity-90 text-white"
                >
                  {createTextGuideMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Submit Guide
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
            <CardTitle className="text-lg font-semibold text-foreground">
              Tips for Writing a Great Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Use clear headings and subheadings to organize your content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Include step-by-step instructions where applicable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Add images or links to enhance understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Proofread your content before submitting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your guide will be reviewed before being published</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateTextGuide;

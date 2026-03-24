import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAllFaqs } from "@/hooks/useFaq";
import { QuestionItem } from "@/api/apiTypes";
import CircularLoader from "@/components/ui/CircularLoader";
import { Button } from "@/components/ui/button";

const stripHtmlToText = (html: string): string => {
  if (!html) return "";
  // Preserve line breaks from <br> tags, then strip all other tags
  const withNewlines = html.replace(/<br\s*\/?>/gi, "\n");
  const plain = withNewlines.replace(/<[^>]*>/g, "").trim();
  return plain || "";
};

const FAQ = () => {
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const { data, isLoading, isError } = useAllFaqs();
  const faqArray: QuestionItem[] = data?.questions || [];
  
    // Sort FAQs alphabetically by question
  const sortedFaqArray = [...faqArray].sort((a, b) => 
    a.question.localeCompare(b.question)
  );

  const selectedFaq = faqArray.find((q) => q.id.toString() === selectedQuestionId);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Frequently Asked Questions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Find answers to common questions about fishkeeping and our platform
          </p>
        </div>

        {/* Dropdown Section */}
        <div className="max-w-md mx-auto mb-8">
          {isLoading ? (
            <div className="flex justify-center">
              <CircularLoader />
            </div>
          ) : isError ? (
            <div className="text-center text-destructive">
              Failed to load FAQs. Please try again later.
            </div>
          ) : (
            <Select onValueChange={setSelectedQuestionId} value={selectedQuestionId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select the FAQ from the list" />
              </SelectTrigger>
              <SelectContent>
                {sortedFaqArray.length > 0 ? (
                  sortedFaqArray.map((faq) => (
                    <SelectItem key={faq.id} value={faq.id.toString()}>
                      {faq.question}
                    </SelectItem>
                  ))
                ) : (
                  <div className="p-2 text-sm text-muted-foreground text-center">
                    No questions available
                  </div>
                )}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Answer Section */}
        {selectedFaq ? (
          <Card className="p-6 mt-8 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-semibold mb-4 text-primary">
              {selectedFaq.question}
            </h3>
            <div className="text-muted-foreground whitespace-pre-line text-lg leading-relaxed">
              {stripHtmlToText(selectedFaq.answers)}
            </div>
          </Card>
        ) : (
          <div className="mt-8 p-8 text-center border-2 border-dashed border-muted rounded-lg text-muted-foreground">
            Select the FAQ from the list. If not listed please feel free drop a line to us, and we will get back to you.
          </div>		  
        )}

        {/* Footer / Contact Section */}
        <div className="mt-8 md:mt-12 text-center p-6 sm:p-8 glass-effect rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Can't find what you're looking for? Our community is here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community-forum" className="w-full sm:w-auto">
              <Button variant="ocean" className="w-full sm:w-auto">
                Ask the Community
              </Button>
            </Link>
            <Link to="/contact" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

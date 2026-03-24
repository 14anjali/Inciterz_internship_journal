import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import speciesIcon from "@/assets/logo_dict.webp";
import { Loader2 } from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { speciesApi } from "@/api/modules/species";
import type { SpeciesItem, SearchSpeciesParams } from "@/api/apiTypes";
import { useNavigate } from "react-router-dom";

const speciesCategories = [
  { name: "Aquatic Plants", position: "top-left", type: "aquaticplants" },
  { name: "Brackish Fish", position: "left", type: "brackish" },
  { name: "Marine Fish", position: "bottom-left", type: "marine" },
  { name: "Freshwater Fish", position: "bottom", type: "freshwater" },
  { name: "Macroalgae", position: "left-bottom", type: "macroalgae" },
];

const careCategories = [
  { name: "Very Easy Care", position: "top-right", type: "very_easy" },
  { name: "Easy Care", position: "right-top", type: "easy" },
  { name: "Moderate Care", position: "right", type: "moderate" },
  { name: "Difficult Care", position: "right-bottom", type: "difficult" },
  { name: "Expert Care", position: "bottom-right", type: "expert" },
];

const SpeciesDictionary = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    // Reset to page 1 when filter changes
    setPage(1);
  }, [selectedCategory]);

  // Build params for API
  const params: SearchSpeciesParams = {
    page,
    limit: 8, // Show 8 items per page to match screenshot (2 rows x 4 columns)
  };

  if (selectedCategory) {
    const speciesType = speciesCategories.find(
      (c) => c.type === selectedCategory
    );
    const careType = careCategories.find((c) => c.type === selectedCategory);

    if (speciesType) {
      params.waterType = selectedCategory;
    }
    if (careType) {
      params.careLevel = selectedCategory;
    }
  }
  if (searchTerm) params.query = searchTerm;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["species-dictionary", params],
    queryFn: () => speciesApi.searchSpecies(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000,
  });

  const speciesArray: SpeciesItem[] = data?.data.species || [];
  const totalPages: number = data?.data.totalPages || 1;

  const getCareColor = (care: string) => {
    switch (care?.toLowerCase()) {
      case "easy":
      case "very_easy":
        return "bg-primary text-primary-foreground";
      case "moderate":
        return "bg-primary text-primary-foreground";
      case "difficult":
      case "expert":
      case "hard":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  const handleCategoryClick = (categoryType: string) => {
    if (selectedCategory === categoryType) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryType);
    }
    setPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="mb-0 text-center">
        <h1 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground text-card-foreground">
          Species Dictionary
        </h1>
        <p className="text-lg sm:text-xl text-foreground/70 text-muted-foreground mb-0 max-w-2xl mx-auto">
          Explore our comprehensive database of aquatic species
        </p>
      </div>

      {/* Filter Section with Dark Background */}
      <div className="bg-secondary/50 rounded-lg py-4 md:py-4 mb-12">
        <div className="relative w-full max-w-6xl mx-auto px-4">
          
          <div className="relative flex items-center justify-center mt-6">
            {/* Left Column - Species Categories (5 tags) - Half Circle Pattern */}
            <div className="md:left-8 lg:left-16 flex flex-col gap-3 items-start">
              {speciesCategories.map((category, index) => {
                // Create half-circle pattern: top and bottom furthest left, middle closest to center
                // Pattern: [furthest, closer, closest, closer, furthest]
                const offsets = [10, -10, -15, -30, 10]; // Negative values move left (away from center)
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.type)}
                    className={`px-6 py-2.5 rounded-full border transition-all text-center whitespace-nowrap ${
                      selectedCategory === category.type
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card border-border border-border text-foreground text-card-foreground hover:border-primary"
                    }`}
                    style={{ marginLeft: `${offsets[index]}px` }}
                  >
                    <span className="text-sm sm:text-base font-medium">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Central Fish Illustration */}
            <div className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 flex items-center justify-center z-10">
              <img
                src={speciesIcon}
                alt="Species Dictionary"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Right Column - Care Level Categories (5 tags) - Half Circle Pattern */}
            <div className="md:right-8 lg:right-16 flex flex-col gap-3 items-end">
              {careCategories.map((category, index) => {
                // Create half-circle pattern: top and bottom furthest right, middle closest to center
                // Pattern: [furthest, closer, closest, closer, furthest]
                const offsets = [10, 10, -45, -30, 10]; // Negative values move right (away from center)
                return (
                  <button
                    key={category.name}
                    onClick={() => handleCategoryClick(category.type)}
                    className={`px-6 py-2.5 rounded-full border transition-all text-center whitespace-nowrap ${
                      selectedCategory === category.type
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-card border-border border-border text-foreground text-card-foreground hover:border-primary"
                    }`}
                    style={{ marginRight: `${offsets[index]}px` }}
                  >
                    <span className="text-sm sm:text-base font-medium">
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full h-12 pl-4 pr-12 rounded-lg border-border bg-background focus:bg-background focus:border-primary"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
        </div>
      </div>

      {/* Species Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No content available.
          </div>
        ) : speciesArray.length === 0 ? (
          <div className="col-span-full text-center text-muted-foreground py-12">
            {searchTerm || selectedCategory ? "No species found matching your criteria." : "No content available."}
          </div>
        ) : (
          speciesArray.map((fish) => (
            <Card
              key={fish.fish_id}
              className="dark:bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer text-foreground text-card-foreground"
              onClick={() => navigate(`/view/fish/${fish.fish_id}`)}
            >
              <CardHeader className="p-0 relative">
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  {fish.primary_image ? (
                    <img
                      src={fish.primary_image}
                      alt={fish.common_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                      <span className="text-4xl">🐟</span>
                    </div>
                  )}
                  <Badge
                    className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs"
                  >
                    {fish.water_type || "Freshwater"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-sm font-semibold text-foreground mb-3 line-clamp-2">
                  {fish.common_name || "Lorem ipsum dolor sit amet consectetur."}
                </CardTitle>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/70 text-muted-foreground">Care Level:</span>
                    <Badge className={getCareColor(fish.care_level || "")}>
                      {fish.care_level || "Easy"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70 text-muted-foreground">Size:</span>
                    <span className="font-medium text-foreground">
                      {fish.max_size_cm ? `${fish.max_size_cm} cm` : "7.00 cm"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70 text-muted-foreground">Origin:</span>
                    <span className="font-medium text-foreground line-clamp-1">
                      {fish.origin || "Southeast Asia (Thailand, Cambodia, Vietnam)"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-2 mt-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(4, totalPages) }, (_, i) => {
            const pageNum = i + 1;
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
          {totalPages > 4 && (
            <>
              <span className="text-muted-foreground">....</span>
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
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default SpeciesDictionary;
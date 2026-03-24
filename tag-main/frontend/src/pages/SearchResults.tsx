import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Search, FileText, Video, Fish, MessageSquare, ExternalLink, Loader2 } from "lucide-react";
import { textApi } from "@/api/modules/text";
import { videoApi } from "@/api/modules/video";
import { speciesApi } from "@/api/modules/species";
import { community_forum_api } from "@/api/modules/community_forum";

// Define result types
interface SearchResultItem {
  id: string;
  title: string;
  description?: string;
  type: "text-guide" | "video-guide" | "species" | "forum";
  url: string;
  date?: string;
  image?: string;
}

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";
  const pageParam = parseInt(searchParams.get("page") || "1");
  const [inputValue, setInputValue] = useState(query);
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(pageParam);
  
  // Store pagination metadata for each category
  const [meta, setMeta] = useState({
    text: 0,
    video: 0,
    species: 0,
    forum: 0
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);

  // Derived state for total pages based on active tab
  const currentTotalPages = (() => {
    switch (activeTab) {
      case "guides": return Math.max(meta.text, meta.video);
      case "species": return meta.species;
      case "community": return meta.forum;
      default: return Math.max(meta.text, meta.video, meta.species, meta.forum);
    }
  })();

  useEffect(() => {
    setInputValue(query);
    setCurrentPage(pageParam);
    if (query) {
      performSearch(query, pageParam);
    }
  }, [query, pageParam]);

  const performSearch = async (searchQuery: string, page: number) => {
    setIsLoading(true);
    setResults([]);

    try {
      // Execute searches in parallel
      const [textRes, videoRes, speciesRes, forumRes] = await Promise.allSettled([
        textApi.getAllGuidesForUser(page, searchQuery),
        videoApi.getVideoGuides(page, searchQuery),
        speciesApi.searchSpecies({ query: searchQuery, page: page }),
        community_forum_api.getAllApprovedCommunityForums(page, searchQuery)
      ]);

      const newResults: SearchResultItem[] = [];
      let textPages = 1;
      let videoPages = 1;
      let speciesPages = 1;
      let forumPages = 1;

      // Process Text Guides
      if (textRes.status === "fulfilled" && textRes.value?.data) {
        const items = Array.isArray(textRes.value.data) ? textRes.value.data : (textRes.value.data as any).data || [];
        const pagination = (textRes.value as any).pagination;
        if (pagination && pagination.totalPages > 0) {
          textPages = pagination.totalPages;
        }

        items.forEach((item: any) => {
          newResults.push({
            id: item._id || item.id,
            title: item.title,
            description: item.summary || item.content?.substring(0, 150) + "...",
            type: "text-guide",
            url: `/view/text/${item._id || item.id}`,
            date: item.createdAt || item.created_at,
            image: item.image
          });
        });
      }

      // Process Video Guides
      if (videoRes.status === "fulfilled" && videoRes.value) {
         const items = (videoRes.value as any).videos || [];
         const pagination = (videoRes.value as any).pagination;
         if (pagination && pagination.totalPages > 0) {
           videoPages = pagination.totalPages;
         }
         
         items.forEach((item: any) => {
          newResults.push({
            id: item._id || item.id,
            title: item.title,
            description: item.description,
            type: "video-guide",
            url: `/view/video/${item._id || item.id}`,
            date: item.createdAt || item.created_at,
            image: item.thumbnail_url
          });
        });
      }

      // Process Species
      if (speciesRes.status === "fulfilled" && speciesRes.value?.data) {
        const data = speciesRes.value.data as any;
        const items = data.species || []; 
        if (data.totalPages > 0) {
          speciesPages = data.totalPages;
        }

        items.forEach((item: any) => {
          newResults.push({
            id: item._id || item.id,
            title: item.common_name,
            description: `Scientific Name: ${item.scientific_name}. Care Level: ${item.care_level}`,
            type: "species",
            url: `/view/fish/${item._id || item.id}`,
            image: item.images?.[0] || item.primary_image
          });
        });
      }

      // Process Community Forum
      if (forumRes.status === "fulfilled" && forumRes.value?.data) {
        const items = Array.isArray(forumRes.value.data) ? forumRes.value.data : (forumRes.value.data as any).data || [];
        const pagination = (forumRes.value as any).pagination;
        if (pagination && pagination.total_pages > 0) {
          forumPages = pagination.total_pages;
        }

        items.forEach((item: any) => {
          newResults.push({
            id: item._id || item.id,
            title: item.title,
            description: item.content?.substring(0, 150) + "...",
            type: "forum",
            url: `/view/forum/${item._id || item.id}`,
            date: item.createdAt || item.created_at
          });
        });
      }

      setResults(newResults);
      setMeta({
        text: textPages,
        video: videoPages,
        species: speciesPages,
        forum: forumPages
      });
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}&page=1`);
    }
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    window.scrollTo(0, 0);
  };


  // Filter results based on active tab
  const filteredResults = activeTab === "all" 
    ? results 
    : results.filter(r => {
        if (activeTab === "guides") return r.type === "text-guide" || r.type === "video-guide";
        if (activeTab === "species") return r.type === "species";
        if (activeTab === "community") return r.type === "forum";
        return true;
      });

  const getIcon = (type: string) => {
    switch (type) {
      case "text-guide": return <FileText className="h-4 w-4 text-blue-500" />;
      case "video-guide": return <Video className="h-4 w-4 text-red-500" />;
      case "species": return <Fish className="h-4 w-4 text-emerald-500" />;
      case "forum": return <MessageSquare className="h-4 w-4 text-orange-500" />;
      default: return <Search className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "text-guide": return "Text Guide";
      case "video-guide": return "Video Guide";
      case "species": return "Species Dictionary";
      case "forum": return "Community Discussion";
      default: return "Result";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Search Header */}
        <div className="mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="pl-10 h-12 text-lg shadow-sm w-full"
                placeholder="Search everything..."
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 w-full sm:w-auto">Search</Button>
          </form>
        </div>

        {/* Results Section */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted/50 p-1 h-auto flex-wrap justify-start">
            <TabsTrigger value="all" className="px-6 py-2">All Results</TabsTrigger>
            <TabsTrigger value="guides" className="px-6 py-2">Guides</TabsTrigger>
            <TabsTrigger value="species" className="px-6 py-2">Species</TabsTrigger>
            <TabsTrigger value="community" className="px-6 py-2">Community</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground">Searching across the ocean...</p>
              </div>
            ) : (
              <>
                {filteredResults.length > 0 ? (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm mb-4">
                      Found {filteredResults.length} results for <span className="font-semibold text-foreground">"{query}"</span>
                    </p>
                    
                    <div className="grid gap-4">
                      {filteredResults.map((item, index) => (
                        <Card key={`${item.type}-${item.id}-${index}`} className="overflow-hidden hover:shadow-md transition-shadow border-none shadow-sm bg-card/50">
                          <div className="flex flex-col sm:flex-row gap-4 p-4">
                            {/* Thumbnail for items that have one */}
                            {item.image && (
                              <div className="shrink-0 w-full sm:w-32 h-32 sm:h-24 bg-muted rounded-md overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                {getIcon(item.type)}
                                <span>{getTypeLabel(item.type)}</span>
                                {item.date && (
                                  <>
                                    <span>•</span>
                                    <span>{new Date(item.date).toLocaleDateString()}</span>
                                  </>
                                )}
                              </div>
                              
                              <Link to={item.url} className="group">
                                <h3 className="text-xl font-medium text-blue-400 group-hover:underline truncate mb-1">
                                  {item.title}
                                </h3>
                              </Link>
                              
                              <div className="text-sm text-green-500 mb-2 truncate font-mono text-xs opacity-80">
                                {window.location.origin}{item.url}
                              </div>
                              
                              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                {item.description || "No description available."}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No results found</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We couldn't find anything matching "{query}" on this page. 
                      {currentTotalPages > 1 && currentPage > 1 && " Try checking previous pages."}
                    </p>
                  </div>
                )}
                
                {/* Pagination Controls */}
                {currentTotalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8 py-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      Previous
                    </Button>
                    <span className="text-sm text-muted-foreground font-medium">
                      Page {currentPage} of {currentTotalPages}
                    </span>
                    <Button 
                      variant="outline" 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= currentTotalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SearchResults;

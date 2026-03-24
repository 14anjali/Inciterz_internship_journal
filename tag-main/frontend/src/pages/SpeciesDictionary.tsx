import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Ruler, 
  Droplets, 
  XCircle,
  BookOpen,
  RotateCcw,
  Waves,
  Leaf,
  Fish,
  Zap
} from "lucide-react";

import { useQuery } from "@tanstack/react-query";
import { speciesApi } from "@/api/modules/species";
import type { SpeciesItem, SearchSpeciesParams } from "@/api/apiTypes";
import { useNavigate } from "react-router-dom";

// 1. Category (Primary Filter)
const speciesTypes = [
  { name: "Fish", type: "fish", icon: <Fish className="h-3 w-3" /> },
  { name: "Plants", type: "aquaticplants", icon: <Leaf className="h-3 w-3" /> },
  { name: "Algae", type: "macroalgae", icon: <Waves className="h-3 w-3" /> },
];

// 2. Environment
const environmentCategories = [
  { name: "Freshwater", type: "freshwater" },
  { name: "Marine", type: "marine" },
  { name: "Brackish", type: "brackish" },
];

// 3. Maintenance
const careCategories = [
  { name: "Very Easy", type: "very_easy" },
  { name: "Easy", type: "easy" },
  { name: "Moderate", type: "moderate" },
  { name: "Difficult", type: "difficult" },
  { name: "Expert", type: "expert" },
];

const SpeciesDictionary = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [waterType, setWaterType] = useState<string | null>(null);
  const [careLevel, setCareLevel] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // Reset page on any filter change
  useEffect(() => {
    setPage(1);
  }, [category, waterType, careLevel, searchTerm]);

  const params: SearchSpeciesParams = { 
    page, 
    limit: 12,
    ...(category && { category }),
    ...(waterType && { waterType }),
    ...(careLevel && { careLevel }),
    ...(searchTerm && { query: searchTerm })
  };

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["species-dictionary", params],
    queryFn: () => speciesApi.searchSpecies(params),
    staleTime: 5 * 60 * 1000,
  });

  const speciesArray: SpeciesItem[] = data?.data.species || [];
  const totalPages: number = data?.data.totalPages || 1;

  const handleReset = () => {
    setCategory(null);
    setWaterType(null);
    setCareLevel(null);
    setSearchTerm("");
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full overflow-hidden bg-background">
      
      {/* --- SIDEBAR (20%) --- */}
      <aside className="w-[20%] min-w-[220px] flex-none border-r border-border bg-secondary/5 flex flex-col p-4">
        <div className="flex flex-col h-full space-y-5">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h1 className="text-sm font-black text-foreground uppercase tracking-tight">Dictionary</h1>
          </div>

          <div className="relative">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 text-[11px] bg-background border-border/60"
            />
            <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          </div>

          {/* 1. CATEGORY (Now Top Priority) */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-muted-foreground/70 flex items-center gap-1.5">
              <Leaf className="h-3 w-3" /> Category
            </label>
            <div className="flex flex-wrap gap-1">
              {speciesTypes.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCategory(category === c.type ? null : c.type)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded border text-[9px] font-bold transition-all ${
                    category === c.type ? "bg-primary border-primary text-white shadow-sm" : "bg-card text-muted-foreground border-border/50 hover:border-primary/40"
                  }`}
                >
                  {c.icon}
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. ENVIRONMENT */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-black uppercase text-muted-foreground/70 flex items-center gap-1.5">
              <Waves className="h-3 w-3" /> Environment
            </label>
            <div className="flex flex-wrap gap-1">
              {environmentCategories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setWaterType(waterType === c.type ? null : c.type)}
                  className={`px-2 py-1 rounded border text-[9px] font-bold transition-all ${
                    waterType === c.type ? "bg-primary border-primary text-white shadow-sm" : "bg-card text-muted-foreground border-border/50 hover:border-primary/40"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 3. MAINTENANCE */}
          <div className="space-y-1.5 flex-1">
            <label className="text-[9px] font-black uppercase text-muted-foreground/70 flex items-center gap-1.5">
              <Zap className="h-3 w-3" /> Maintenance
            </label>
            <div className="flex flex-col gap-0.5">
              {careCategories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCareLevel(careLevel === c.type ? null : c.type)}
                  className={`flex items-center justify-between px-2 py-1.5 rounded text-[10px] font-bold border transition-all ${
                    careLevel === c.type ? "bg-primary/10 border-primary/30 text-primary" : "border-transparent text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {c.name}
                  {careLevel === c.type && <div className="h-1.5 w-1.5 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleReset}
            className="w-full h-8 gap-2 text-[9px] font-black uppercase border-dashed border-muted-foreground/30 hover:border-destructive hover:text-destructive"
          >
            <RotateCcw className="h-3 w-3" /> Clear All
          </Button>
        </div>
      </aside>

      {/* --- MAIN CONTENT (12 Cards Grid) --- */}
      <main className="w-[80%] flex flex-col overflow-hidden bg-secondary/5">
        <div className="flex-1 p-3 flex flex-col min-h-0">
          <div className="grid grid-cols-4 grid-rows-3 gap-3 h-full max-h-full">
            {(isLoading || isFetching) ? (
              Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-full rounded-xl opacity-40" />
              ))
            ) : (
              speciesArray.map((fish) => (
                <Card
                  key={fish.fish_id}
                  className="group relative border border-border/50 bg-card hover:border-primary transition-all duration-300 cursor-pointer overflow-hidden rounded-xl flex flex-col h-full shadow-sm"
                  onClick={() => navigate(`/view/fish/${fish.fish_id}`)}
                >
                  <div className="aspect-video relative overflow-hidden flex-none">
                    <img
                      src={fish.primary_image || "/placeholder.svg"}
                      alt={fish.common_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-1.5 left-1.5 bg-primary/95 text-white border-none text-[8px] px-1.5 py-0.5 font-black uppercase shadow-md">
                      {fish.water_type}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-2 flex flex-col flex-1 min-h-0 justify-between">
                    <CardTitle className="text-[10px] font-black leading-tight text-foreground/90 group-hover:text-primary transition-colors line-clamp-1">
                      {fish.common_name}
                    </CardTitle>
                    
                    <div className="flex items-center justify-between border-t border-border/40 pt-1.5 mt-1">
                      <div className="flex items-center gap-1 min-w-0">
                        <Droplets className="w-2.5 h-2.5 text-primary shrink-0" />
                        <span className="text-[8px] font-bold text-muted-foreground uppercase truncate">
                          {fish.care_level.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 bg-secondary/50 px-1 rounded">
                        <Ruler className="w-2.5 h-2.5 text-primary shrink-0" />
                        <span className="text-[8px] font-black text-foreground">{fish.max_size_cm}cm</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* --- FOOTER --- */}
        <footer className="w-full border-t border-border bg-background px-6 py-2 flex-none">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1 || isFetching} className="text-[9px] font-black uppercase h-7 px-3">
              <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Prev
            </Button>
            <div className="flex flex-col items-center">
              <p className="text-[9px] font-black text-foreground uppercase tracking-widest">
                Page <span className="text-primary">{page}</span> of {totalPages}
              </p>
              <div className="h-0.5 w-12 bg-secondary rounded-full mt-0.5 overflow-hidden">
                <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(page / totalPages) * 100}%` }} />
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(p + 1, totalPages))} disabled={page >= totalPages || isFetching} className="text-[9px] font-black uppercase h-7 px-3">
              Next <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default SpeciesDictionary;

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HeartHandshake, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import config from "@/api/config";

interface CompatibilityMatrixProps {
  children: React.ReactNode;
}

type FishCategory = "Community" | "Semi-Aggressive" | "Aggressive" | "Invertebrate";

interface FishData {
  id: string;
  name: string;
  category: FishCategory;
  tempRange: [number, number]; // Fahrenheit
  phRange: [number, number];
  hardnessRange: [number, number]; // dGH
  maxSize: number; // cm
  strata: "top" | "middle" | "bottom";
  isFinNipper: boolean;      // Global Behavioral Trait
  hasDelicateFins: boolean; // Global Morphological Trait
  notes?: string;
}

interface RawSpecies {
  fish_id: string;
  common_name: string;
  temperament?: string;
  min_temp?: number;
  max_temp?: number;
  min_ph?: number;
  max_ph?: number;
  min_gh?: number;
  max_gh?: number;
  max_size_cm?: number;
  swimming_level?: string;
  is_fin_nipper?: boolean;
  has_delicate_fins?: boolean;
  compatibility_notes?: string;
}

export const CompatibilityMatrix = ({ children }: CompatibilityMatrixProps) => {
  const [fish1, setFish1] = useState<string>("");
  const [fish2, setFish2] = useState<string>("");
  const [result, setResult] = useState<{ status: "Compatible" | "Caution" | "Incompatible"; reason: string } | null>(null);
  const [fishDatabase, setFishDatabase] = useState<FishData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSpecies = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.baseUrl}/api/species/compatibility-options`);
        if (!response.ok) throw new Error("Failed to connect to Aquaguide API");
        const data = await response.json();
        
        const mappedData: FishData[] = (data as RawSpecies[]).map((s) => ({
          id: s.fish_id,
          name: s.common_name,
          category: (s.temperament as FishCategory) || "Community",
          tempRange: [Math.round((s.min_temp || 22) * 9/5 + 32), Math.round((s.max_temp || 28) * 9/5 + 32)],
          phRange: [s.min_ph || 6.5, s.max_ph || 7.5],
          hardnessRange: [s.min_gh || 4, s.max_gh || 15],
          maxSize: s.max_size_cm || 5,
          strata: (s.swimming_level as any) || "middle",
          isFinNipper: !!s.is_fin_nipper,
          hasDelicateFins: !!s.has_delicate_fins,
          notes: s.compatibility_notes
        }));

        setFishDatabase(mappedData);
      } catch (error) {
        console.error("Database fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecies();
  }, []);

  const checkCompatibility = () => {
    if (!fish1 || !fish2) return;
    const f1 = fishDatabase.find(f => f.id === fish1)!;
    const f2 = fishDatabase.find(f => f.id === fish2)!;

    const reasons: string[] = [];
    let status: "Compatible" | "Caution" | "Incompatible" = "Compatible";

    // 1. BIOLOGICAL PARAMETERS (OATA STANDARDS)
    const tempOverlap = Math.max(f1.tempRange[0], f2.tempRange[0]) <= Math.min(f1.tempRange[1], f2.tempRange[1]);
    const phOverlap = Math.max(f1.phRange[0], f2.phRange[0]) <= Math.min(f1.phRange[1], f2.phRange[1]);
    const ghOverlap = Math.max(f1.hardnessRange[0], f2.hardnessRange[0]) <= Math.min(f1.hardnessRange[1], f2.hardnessRange[1]);

    if (!tempOverlap || !phOverlap) {
        status = "Incompatible";
        reasons.push("Environmental mismatch: Temperature or pH ranges are biologically incompatible.");
    } else if (!ghOverlap) {
        status = "Caution";
        reasons.push("Water hardness differences may cause long-term osmotic stress.");
    }

    // 2. THE "MOUTH RULE" (WPA PREDATORY LOGIC)
    if (f1.maxSize > f2.maxSize * 2.8 || f2.maxSize > f1.maxSize * 2.8) {
        status = "Incompatible";
        reasons.push("Size Conflict: One species is large enough to be a natural predator to the other.");
    }

    // 3. BEHAVIORAL TRAIT LOGIC (Replaces dummy name-checks)
    if ((f1.isFinNipper && f2.hasDelicateFins) || (f2.isFinNipper && f1.hasDelicateFins)) {
        status = "Incompatible";
        reasons.push("Behavioral Risk: Nipping traits detected against a species with delicate fins.");
    }

    // 4. TERRITORIAL STRATA CONFLICT
    if (f1.strata === f2.strata && (f1.category === "Aggressive" || f2.category === "Aggressive")) {
        status = "Caution";
        reasons.push(`Territorial overlap: Both species primarily occupy the ${f1.strata} of the aquarium.`);
    }

    setResult({ status, reason: reasons.join(" ") || "No significant biological or behavioral conflicts found." });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] sm:w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[var(--text-primary)]">
            <HeartHandshake className="h-5 w-5 text-primary" />
            Global Compatibility Matrix
          </DialogTitle>
          <DialogDescription className="text-[var(--text-secondary)]">
            Scientific verification based on OATA and WPA aquatic standards.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[var(--text-primary)]">Species Selection A</Label>
                <Select value={fish1} onValueChange={setFish1} disabled={loading}>
                  <SelectTrigger><SelectValue placeholder="Select Species..." /></SelectTrigger>
                  <SelectContent>
                    {fishDatabase.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[var(--text-primary)]">Species Selection B</Label>
                <Select value={fish2} onValueChange={setFish2} disabled={loading}>
                  <SelectTrigger><SelectValue placeholder="Select Species..." /></SelectTrigger>
                  <SelectContent>
                    {fishDatabase.map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={checkCompatibility} disabled={!fish1 || !fish2} className="w-full" variant="ocean">
              Run Matrix Analysis
            </Button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center p-12 text-[var(--text-secondary)]">
                <Loader2 className="h-6 w-6 animate-spin mr-2" /> 
                Syncing Global Data...
              </div>
            ) : result && (
              <Card className="bg-[var(--bg-secondary)] border-none shadow-lg">
                <CardContent className="pt-8 flex flex-col items-center text-center">
                  {result.status === "Compatible" ? <CheckCircle className="h-12 w-12 text-green-500" /> : 
                   result.status === "Caution" ? <AlertTriangle className="h-12 w-12 text-yellow-500" /> : 
                   <XCircle className="h-12 w-12 text-red-500" />}
                  <h3 className="text-2xl font-bold mt-4 uppercase tracking-wider">{result.status}</h3>
                  <p className="text-sm leading-relaxed text-[var(--text-primary)] mt-4 px-6 border-t pt-4">
                    {result.reason}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
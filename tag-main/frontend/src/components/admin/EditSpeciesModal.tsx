import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SpeciesFormData, SpeciesItem, CommonDisease, FryStage } from "@/api/apiTypes";
import { speciesApi } from "@/api/modules/species";
import { Link as LinkIcon, X, Upload, Loader2, Plus, Trash2, BookOpen, Leaf, Fish } from "lucide-react";
import CircularLoader from "../ui/CircularLoader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";

interface EditSpeciesModalProps {
    isOpen: boolean;
    onClose: () => void;
    species: SpeciesItem | null;
}

const EditSpeciesModal = ({ isOpen, onClose, species }: EditSpeciesModalProps) => {
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const [formData, setFormData] = useState({
        // Identity & Shared
        commonName: "",
        scientificName: "",
        category: "fish", // Determined from DB
        family: "",
        origin: "",
        description: "",
        imageUrl: "",
        status: "draft",
        galleryImages: [] as string[],

        // Parameters
        waterType: "freshwater",
        minTemp: "",
        maxTemp: "",
        minPh: "",
        maxPh: "",
        minHardness: "",
        maxHardness: "",
        khMin: "",
        khMax: "",
        salinityMin: "",
        salinityMax: "",
        nitrateMax: "",

        // Fish Specific
        dietType: "",
        careLevel: "",
        temperament: "",
        maxSize: "",
        minTankSize: "",
        dietInfo: "",
        breedingDifficulty: "",
        breedingNotes: "",
        isFinNipper: "false",
        hasDelicateFins: "false",
        swimmingLevel: "Middle",
        compatibilityNotes: "",
        lifespanYears: "",
        socialNeeds: "",
        filtrationRequirement: "",
        varieties: "",
        bioload: "",
        recommendedSubstrate: "",
        plantSafety: "",
        breedingTriggers: "",
        spawningProcess: "",
        tankMates: "",
        commonMyths: "",
        commonDiseases: [] as CommonDisease[],
        fryDevelopment: [] as FryStage[],

        // Plant Specific
        genus: "",
        specificEpithet: "",
        infraspecificEpithet: "",
        taxonomicRank: "species",
        identificationQualifier: "",
        kingdom: "Plantae",
        phylum: "",
        plantClass: "",
        taxonomicOrder: "",
        organismGroup: "Macrophytes",
        placement: "midground",
        growthRate: "medium",
        lighting: "medium",
        co2Required: "false",
        co2OptimalPpm: "",
        substrateType: "",
        propagationMethod: "",
        maxHeightCm: "",
        isTrueAquatic: "true",
        nativeStatus: "native",
        deficiencyIndicators: "",
    });

    useEffect(() => {
        if (species) {
            setFormData({
                commonName: species.common_name || "",
                scientificName: species.scientific_name || "",
                category: species.category || "fish", 
                family: species.family || "",
                origin: species.origin || "",
                description: species.description || "",
                imageUrl: species.primary_image || "",
                status: species.status || "draft",
                galleryImages: species.gallery_images || [],
                waterType: species.water_type || "",
                minTemp: species.min_temp?.toString() || "",
                maxTemp: species.max_temp?.toString() || "",
                minPh: species.min_ph?.toString() || "",
                maxPh: species.max_ph?.toString() || "",
                minHardness: species.min_hardness?.toString() || "",
                maxHardness: species.max_hardness?.toString() || "",
                khMin: (species as any).kh_min?.toString() || "",
                khMax: (species as any).kh_max?.toString() || "",
                salinityMin: (species as any).salinity_ppt_min?.toString() || "",
                salinityMax: (species as any).salinity_ppt_max?.toString() || "",
                nitrateMax: (species as any).nitrate_max_mg_l?.toString() || "",
                dietType: species.diet_type || "",
                careLevel: species.care_level || "",
                temperament: species.temperament || "",
                maxSize: species.max_size_cm?.toString() || "",
                minTankSize: species.min_tank_size_liters?.toString() || "",
                dietInfo: species.diet_info || "",
                breedingDifficulty: species.breeding_difficulty || "",
                breedingNotes: species.breeding_notes || "",
                isFinNipper: species.is_fin_nipper ? "true" : "false",
                hasDelicateFins: species.has_delicate_fins ? "true" : "false",
                swimmingLevel: (species.swimming_level as any) || "Middle",
                compatibilityNotes: species.compatibility_notes || "",
                lifespanYears: species.lifespan_years?.toString() || "",
                socialNeeds: species.social_needs || "",
                filtrationRequirement: species.filtration_requirement || "",
                varieties: species.varieties || "",
                bioload: species.bioload || "",
                recommendedSubstrate: species.recommended_substrate || "",
                plantSafety: species.plant_safety || "",
                breedingTriggers: species.breeding_triggers || "",
                spawningProcess: species.spawning_process || "",
                tankMates: species.tank_mates || "",
                commonMyths: species.common_myths || "",
                commonDiseases: species.common_diseases || [],
                fryDevelopment: species.fry_development || [],
                genus: (species as any).genus || "",
                specificEpithet: (species as any).specific_epithet || "",
                infraspecificEpithet: (species as any).infraspecific_epithet || "",
                taxonomicRank: (species as any).taxonomic_rank || "species",
                identificationQualifier: (species as any).identification_qualifier || "",
                kingdom: (species as any).kingdom || "Plantae",
                phylum: (species as any).phylum || "",
                plantClass: (species as any).class || "",
                taxonomicOrder: (species as any).order || "",
                organismGroup: (species as any).organism_group || "Macrophytes",
                placement: (species as any).placement || "midground",
                growthRate: (species as any).growth_rate || "medium",
                lighting: (species as any).lighting || "medium",
                co2Required: (species as any).co2_required ? "true" : "false",
                co2OptimalPpm: (species as any).co2_optimal_ppm?.toString() || "",
                substrateType: (species as any).substrate_type || "",
                propagationMethod: (species as any).propagationMethod || (species as any).propogation_method || "",
                maxHeightCm: (species as any).max_height_cm?.toString() || "",
                isTrueAquatic: (species as any).is_true_aquatic !== false ? "true" : "false",
                nativeStatus: (species as any).native_status || "native",
                deficiencyIndicators: (species as any).deficiency_indicators ? JSON.stringify((species as any).deficiency_indicators) : "",
            });
        }
    }, [species]);

    const handleInputChange = (field: string, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

    const parseScientificName = (value: string) => {
        const cleaned = value.trim().replace(/\s+/g, " ");
        if (!cleaned) {
            return { genus: "", specificEpithet: "", infraspecificEpithet: "", identificationQualifier: "", taxonomicRank: "species" };
        }
        const parts = cleaned.split(" ");
        const genus = parts[0] || "";
        let idx = 1;

        let identificationQualifier = "";
        const maybeQualifier = (parts[idx] || "").toLowerCase();
        if (maybeQualifier === "cf." || maybeQualifier === "cf" || maybeQualifier === "aff." || maybeQualifier === "aff") {
            identificationQualifier = maybeQualifier.startsWith("cf") ? "cf." : "aff.";
            idx += 1;
        }

        const specificEpithet = parts[idx] || "";
        idx += 1;

        const rankToken = (parts[idx] || "").toLowerCase();
        const rankMap: Record<string, string> = {
            "var.": "varietas",
            "var": "varietas",
            "subsp.": "subspecies",
            "subsp": "subspecies",
            "ssp.": "subspecies",
            "ssp": "subspecies",
            "f.": "forma",
            "f": "forma",
            "forma": "forma",
        };

        if (rankMap[rankToken]) {
            const taxonomicRank = rankMap[rankToken];
            const infraspecificEpithet = parts[idx + 1] || "";
            return { genus, specificEpithet, infraspecificEpithet, identificationQualifier, taxonomicRank };
        }

        return { genus, specificEpithet, infraspecificEpithet: "", identificationQualifier, taxonomicRank: "species" };
    };

    const handleScientificNameChange = (value: string) => {
        setFormData((prev) => {
            if (prev.category === "fish") {
                return { ...prev, scientificName: value };
            }
            const parsed = parseScientificName(value);
            return {
                ...prev,
                scientificName: value,
                genus: parsed.genus,
                specificEpithet: parsed.specificEpithet,
                identificationQualifier: parsed.identificationQualifier,
                taxonomicRank: parsed.taxonomicRank,
                infraspecificEpithet: parsed.infraspecificEpithet,
            };
        });
    };

    const addDisease = () => setFormData(p => ({ ...p, commonDiseases: [...p.commonDiseases, { condition: "", symptoms: "", potential_cause: "" }] }));
    const removeDisease = (i: number) => setFormData(p => ({ ...p, commonDiseases: p.commonDiseases.filter((_, idx) => idx !== i) }));
    const updateDisease = (i: number, f: keyof CommonDisease, v: string) => {
        setFormData(p => ({ ...p, commonDiseases: p.commonDiseases.map((item, idx) => idx === i ? { ...item, [f]: v } : item) }));
    };
    const addFryStage = () => setFormData(p => ({ ...p, fryDevelopment: [...p.fryDevelopment, { stage: "", timeframe: "", care_requirement: "" }] }));
    const removeFryStage = (i: number) => setFormData(p => ({ ...p, fryDevelopment: p.fryDevelopment.filter((_, idx) => idx !== i) }));
    const updateFryStage = (i: number, f: keyof FryStage, v: string) => {
        setFormData(p => ({ ...p, fryDevelopment: p.fryDevelopment.map((item, idx) => idx === i ? { ...item, [f]: v } : item) }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            setIsUploading(true);
            const response = await speciesApi.uploadImage(file);
            handleInputChange("imageUrl", response.data.imageUrl);
            toast.success("Image uploaded");
        } catch { toast.error("Upload failed"); } 
        finally { setIsUploading(false); }
    };

    const handleSubmit = async () => {
        if (!species) return;
        try {
            setIsLoading(true);
            if (!formData.commonName || !formData.scientificName) {
                toast.error("Name fields are required");
                return;
            }
            if (!formData.description) {
                toast.error("Description is required");
                return;
            }
            if (!formData.waterType) {
                toast.error("Water type is required");
                return;
            }

            const toNumber = (v: string) => {
                const n = Number(v);
                return Number.isFinite(n) ? n : undefined;
            };
            const toInt = (v: string) => {
                const n = parseInt(v, 10);
                return Number.isFinite(n) ? n : undefined;
            };

            if (formData.category === "fish") {
                const fishData: SpeciesFormData = {
                    category: "fish",
                    common_name: formData.commonName,
                    scientific_name: formData.scientificName,
                    family: formData.family,
                    origin: formData.origin,
                    water_type: formData.waterType,
                    min_temp: toNumber(formData.minTemp),
                    max_temp: toNumber(formData.maxTemp),
                    min_ph: toNumber(formData.minPh),
                    max_ph: toNumber(formData.maxPh),
                    min_hardness: toInt(formData.minHardness),
                    max_hardness: toInt(formData.maxHardness),
                    diet_type: formData.dietType || undefined,
                    care_level: formData.careLevel || undefined,
                    temperament: formData.temperament || undefined,
                    max_size_cm: toNumber(formData.maxSize),
                    min_tank_size_liters: toInt(formData.minTankSize),
                    description: formData.description,
                    primary_image: formData.imageUrl,
                    diet_info: formData.dietInfo,
                    breeding_difficulty: formData.breedingDifficulty || undefined,
                    breeding_notes: formData.breedingNotes,
                    is_fin_nipper: formData.isFinNipper === "true",
                    has_delicate_fins: formData.hasDelicateFins === "true",
                    swimming_level: (formData.swimmingLevel || undefined) as any,
                    compatibility_notes: formData.compatibilityNotes,
                    lifespan_years: formData.lifespanYears,
                    social_needs: formData.socialNeeds,
                    filtration_requirement: formData.filtrationRequirement,
                    varieties: formData.varieties,
                    bioload: formData.bioload,
                    recommended_substrate: formData.recommendedSubstrate,
                    plant_safety: formData.plantSafety,
                    breeding_triggers: formData.breedingTriggers,
                    spawning_process: formData.spawningProcess,
                    tank_mates: formData.tankMates,
                    common_myths: formData.commonMyths,
                    common_diseases: formData.commonDiseases,
                    fry_development: formData.fryDevelopment,
                    status: formData.status as any,
                };
                await speciesApi.updateSpecies(species.id || (species as any).fish_id, fishData as any);
            } else {
                const plantData = {
                    category: formData.category,
                    common_name: formData.commonName,
                    scientific_name: formData.scientificName,
                    genus: formData.genus || undefined,
                    specific_epithet: formData.specificEpithet || undefined,
                    infraspecific_epithet: formData.infraspecificEpithet || undefined,
                    taxonomic_rank: formData.taxonomicRank || undefined,
                    identification_qualifier: formData.identificationQualifier || undefined,
                    water_type: formData.waterType,
                    family: formData.family,
                    origin: formData.origin,
                    kingdom: formData.kingdom || undefined,
                    phylum: formData.phylum || undefined,
                    class: formData.plantClass || undefined,
                    order: formData.taxonomicOrder || undefined,
                    organism_group: formData.organismGroup || undefined,
                    description: formData.description,
                    placement: formData.placement,
                    care_level: formData.careLevel || "easy",
                    growth_rate: formData.growthRate,
                    min_temp: toNumber(formData.minTemp),
                    max_temp: toNumber(formData.maxTemp),
                    min_ph: toNumber(formData.minPh),
                    max_ph: toNumber(formData.maxPh),
                    min_hardness: toInt(formData.minHardness),
                    max_hardness: toInt(formData.maxHardness),
                    kh_min: toInt(formData.khMin),
                    kh_max: toInt(formData.khMax),
                    salinity_ppt_min: toNumber(formData.salinityMin),
                    salinity_ppt_max: toNumber(formData.salinityMax),
                    nitrate_max_mg_l: toInt(formData.nitrateMax),
                    lighting: formData.lighting,
                    co2_required: formData.co2Required === "true",
                    co2_optimal_ppm: toInt(formData.co2OptimalPpm),
                    substrate_type: formData.substrateType || undefined,
                    propogation_method: formData.propagationMethod,
                    max_height_cm: toInt(formData.maxHeightCm),
                    is_true_aquatic: formData.isTrueAquatic === "true",
                    native_status: formData.nativeStatus || undefined,
                    deficiency_indicators: (() => {
                        const raw = formData.deficiencyIndicators?.trim();
                        if (!raw) return undefined;
                        try {
                            return JSON.parse(raw);
                        } catch {
                            return undefined;
                        }
                    })(),
                    primary_image: formData.imageUrl,
                    status: formData.status
                };
                await speciesApi.updateSpecies(species.id || (species as any).fish_id, plantData as any);
            }
            await queryClient.invalidateQueries({ queryKey: ["species-admin"] });
            toast.success("Updated successfully!");
            onClose();
        } catch (err) {
            const message =
                (err as any)?.response?.data?.error ||
                (err as any)?.response?.data?.message ||
                (err as any)?.message ||
                "Update failed";
            setError(message);
            toast.error(message);
        } 
        finally { setIsLoading(false); }
    };

    if (isLoading) {
        return <CircularLoader />;
    }
    if (error) {
        return (
            <div className="text-red-600 p-4">
                Error: {error}
                <Button variant="outline" onClick={() => setError(null)} className="ml-2">
                    Dismiss
                </Button>
            </div>
        );
    }

    if (!species) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] sm:w-full max-w-4xl h-[90vh] p-0 bg-card border-border flex flex-col">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        {formData.category === "fish" ? <Fish className="text-blue-500" /> : <Leaf className="text-emerald-500" />}
                        Edit {formData.category === "fish" ? "Fish" : "Plant"} - {formData.commonName}
                    </DialogTitle>
                    <DialogDescription className="text-xs font-mono uppercase text-muted-foreground">
                        ID: {species.id || (species as any).fish_id} | Type: {formData.category}
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b border-border">
                        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto py-2 gap-2 bg-transparent">
                            <TabsTrigger value="basic">Identity</TabsTrigger>
                            <TabsTrigger value="water">Parameters</TabsTrigger>
                            {formData.category === "fish" ? (
                                <>
                                    <TabsTrigger value="care">Care & Behavior</TabsTrigger>
                                    <TabsTrigger value="health">Health</TabsTrigger>
                                    <TabsTrigger value="breeding">Breeding</TabsTrigger>
                                </>
                            ) : (
                                <TabsTrigger value="growth">Growth & Lighting</TabsTrigger>
                            )}
                            <TabsTrigger value="media">Media & Status</TabsTrigger>
                        </TabsList>
                    </div>

                    <ScrollArea className="flex-1">
                        <div className="p-6">
                            {/* IDENTITY */}
                            <TabsContent value="basic" className="mt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {formData.category === "fish" ? (
                                        <>
                                            <div className="space-y-2"><Label>Common Name *</Label><Input value={formData.commonName} onChange={(e) => handleInputChange("commonName", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Scientific Name *</Label><Input value={formData.scientificName} onChange={(e) => handleScientificNameChange(e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Family</Label><Input value={formData.family} onChange={(e) => handleInputChange("family", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Origin</Label><Input value={formData.origin} onChange={(e) => handleInputChange("origin", e.target.value)} /></div>
                                            <div className="space-y-2 sm:col-span-2"><Label>Description</Label><Textarea value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} className="min-h-[100px]" /></div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <Label>Varieties</Label>
                                                <Input value={formData.varieties} onChange={(e) => handleInputChange("varieties", e.target.value)} />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="sm:col-span-2">
                                                <Label className="text-xs font-bold uppercase">Section 1: Basic Identity</Label>
                                            </div>
                                            <div className="space-y-2"><Label>Common Name *</Label><Input value={formData.commonName} onChange={(e) => handleInputChange("commonName", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Scientific Name *</Label><Input value={formData.scientificName} onChange={(e) => handleScientificNameChange(e.target.value)} /></div>
                                            <div className="space-y-2 sm:col-span-2">
                                                <Label>Plant Category / Type</Label>
                                                <Input value={formData.organismGroup} onChange={(e) => handleInputChange("organismGroup", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">How it grows in water. Examples: Macrophytes, Benthic Algae, Phytoplankton.</p>
                                            </div>
                                            <div className="space-y-2 sm:col-span-2"><Label>Description</Label><Textarea value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} className="min-h-[100px]" /></div>

                                            <div className="sm:col-span-2">
                                                <Label className="text-xs font-bold uppercase">Section 2: Scientific Identity</Label>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Genus (First Part)</Label>
                                                <Input value={formData.genus} onChange={(e) => handleInputChange("genus", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">First word of the scientific name. Example: Anubias.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>ID Qualifier (cf./aff.)</Label>
                                                <Input value={formData.identificationQualifier} onChange={(e) => handleInputChange("identificationQualifier", e.target.value)} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Species Name (Second Part)</Label>
                                                <Input value={formData.specificEpithet} onChange={(e) => handleInputChange("specificEpithet", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">Second word of the scientific name. Example: barteri in Anubias barteri.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Taxonomic Rank</Label>
                                                <Select value={formData.taxonomicRank} onValueChange={(v) => handleInputChange("taxonomicRank", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="species">Species</SelectItem>
                                                        <SelectItem value="subspecies">Subspecies</SelectItem>
                                                        <SelectItem value="varietas">Varietas</SelectItem>
                                                        <SelectItem value="forma">Forma</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-xs text-muted-foreground">Determines if a third name is needed.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Sub-Species or Variety</Label>
                                                <Input value={formData.infraspecificEpithet} onChange={(e) => handleInputChange("infraspecificEpithet", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">Used only for three-part names like Anubias barteri var. nana.</p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <Label className="text-xs font-bold uppercase">Section 3: Biological Classification</Label>
                                            </div>
                                            <div className="space-y-2"><Label>Family</Label><Input value={formData.family} onChange={(e) => handleInputChange("family", e.target.value)} /></div>
                                            <div className="space-y-2">
                                                <Label>Biological Order</Label>
                                                <Input value={formData.taxonomicOrder} onChange={(e) => handleInputChange("taxonomicOrder", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">Groups related families together. More specific than class, broader than family.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Biological Class</Label>
                                                <Input value={formData.plantClass} onChange={(e) => handleInputChange("plantClass", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">Classification below phylum. Examples: Magnoliopsida, Liliopsida.</p>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Major Biological Group (Phylum)</Label>
                                                <Input value={formData.phylum} onChange={(e) => handleInputChange("phylum", e.target.value)} />
                                                <p className="text-xs text-muted-foreground">Very broad classification level. Common for aquatic plants: Tracheophyta.</p>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <Label className="text-xs font-bold uppercase">Section 4: Geographic & Wild Status</Label>
                                            </div>
                                            <div className="space-y-2"><Label>Origin</Label><Input value={formData.origin} onChange={(e) => handleInputChange("origin", e.target.value)} /></div>
                                            <div className="space-y-2">
                                                <Label>Wild / Local Status</Label>
                                                <Select value={formData.nativeStatus} onValueChange={(v) => handleInputChange("nativeStatus", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="native">Native</SelectItem>
                                                        <SelectItem value="nonnative">Non-native</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <p className="text-xs text-muted-foreground">Native: naturally found. Non-native: introduced from another region.</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </TabsContent>

                            {/* PARAMETERS */}
                            <TabsContent value="water" className="mt-0 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div className="sm:col-span-2 lg:col-span-3 space-y-2">
                                        <Label>Water Type *</Label>
                                        <Select value={formData.waterType} onValueChange={(v) => handleInputChange("waterType", v)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="freshwater">Freshwater</SelectItem>
                                                <SelectItem value="marine">Marine</SelectItem>
                                                <SelectItem value="brackish">Brackish</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2"><Label>Min Temp (°C)</Label><Input type="number" value={formData.minTemp} onChange={(e) => handleInputChange("minTemp", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max Temp (°C)</Label><Input type="number" value={formData.maxTemp} onChange={(e) => handleInputChange("maxTemp", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Min pH</Label><Input type="number" step="0.1" value={formData.minPh} onChange={(e) => handleInputChange("minPh", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max pH</Label><Input type="number" step="0.1" value={formData.maxPh} onChange={(e) => handleInputChange("maxPh", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Min Hardness (dGH)</Label><Input type="number" value={formData.minHardness} onChange={(e) => handleInputChange("minHardness", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max Hardness (dGH)</Label><Input type="number" value={formData.maxHardness} onChange={(e) => handleInputChange("maxHardness", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Min KH (dKH)</Label><Input type="number" value={formData.khMin} onChange={(e) => handleInputChange("khMin", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max KH (dKH)</Label><Input type="number" value={formData.khMax} onChange={(e) => handleInputChange("khMax", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Min Salinity (ppt)</Label><Input type="number" step="0.1" value={formData.salinityMin} onChange={(e) => handleInputChange("salinityMin", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max Salinity (ppt)</Label><Input type="number" step="0.1" value={formData.salinityMax} onChange={(e) => handleInputChange("salinityMax", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Max Nitrate (mg/L)</Label><Input type="number" value={formData.nitrateMax} onChange={(e) => handleInputChange("nitrateMax", e.target.value)} /></div>
                                </div>
                            </TabsContent>

                            {/* FISH SPECIFIC TABS */}
                            {formData.category === "fish" && (
                                <>
                                    <TabsContent value="care" className="mt-0 space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Diet Type</Label>
                                                <Select value={formData.dietType} onValueChange={(v) => handleInputChange("dietType", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="herbivore">Herbivore</SelectItem>
                                                        <SelectItem value="carnivore">Carnivore</SelectItem>
                                                        <SelectItem value="omnivore">Omnivore</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Care Level</Label>
                                                <Select value={formData.careLevel} onValueChange={(v) => handleInputChange("careLevel", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="very_easy">Very Easy</SelectItem>
                                                        <SelectItem value="easy">Easy</SelectItem>
                                                        <SelectItem value="moderate">Moderate</SelectItem>
                                                        <SelectItem value="difficult">Difficult</SelectItem>
                                                        <SelectItem value="expert">Expert</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Temperament</Label>
                                                <Select value={formData.temperament} onValueChange={(v) => handleInputChange("temperament", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="peaceful">Peaceful</SelectItem>
                                                        <SelectItem value="semi_aggressive">Semi-Aggressive</SelectItem>
                                                        <SelectItem value="aggressive">Aggressive</SelectItem>
                                                        <SelectItem value="territorial">Territorial</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2"><Label>Max Size (cm)</Label><Input type="number" value={formData.maxSize} onChange={(e) => handleInputChange("maxSize", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Min Tank Size (L)</Label><Input type="number" value={formData.minTankSize} onChange={(e) => handleInputChange("minTankSize", e.target.value)} /></div>
                                            <div className="space-y-2"><Label>Lifespan (Yrs)</Label><Input value={formData.lifespanYears} onChange={(e) => handleInputChange("lifespanYears", e.target.value)} /></div>
                                            <div className="space-y-2">
                                                <Label>Bioload</Label>
                                                <Select value={formData.bioload} onValueChange={(v) => handleInputChange("bioload", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Low">Low</SelectItem>
                                                        <SelectItem value="Medium">Medium</SelectItem>
                                                        <SelectItem value="High">High</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2"><Label>Filtration Requirement</Label><Input value={formData.filtrationRequirement} onChange={(e) => handleInputChange("filtrationRequirement", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Recommended Substrate</Label><Input value={formData.recommendedSubstrate} onChange={(e) => handleInputChange("recommendedSubstrate", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Social Needs</Label><Textarea value={formData.socialNeeds} onChange={(e) => handleInputChange("socialNeeds", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Diet Info</Label><Textarea value={formData.dietInfo} onChange={(e) => handleInputChange("dietInfo", e.target.value)} /></div>
                                        <Separator />
                                        <h3 className="font-semibold">Behavioral Traits</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <Label>Swimming Level</Label>
                                                <Select value={formData.swimmingLevel} onValueChange={(v) => handleInputChange("swimmingLevel", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent><SelectItem value="Top">Top</SelectItem><SelectItem value="Middle">Middle</SelectItem><SelectItem value="Bottom">Bottom</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Fin Nipper?</Label>
                                                <Select value={formData.isFinNipper} onValueChange={(v) => handleInputChange("isFinNipper", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent><SelectItem value="false">No</SelectItem><SelectItem value="true">Yes</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Delicate Fins?</Label>
                                                <Select value={formData.hasDelicateFins} onValueChange={(v) => handleInputChange("hasDelicateFins", v)}>
                                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                                    <SelectContent><SelectItem value="false">No</SelectItem><SelectItem value="true">Yes</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div className="space-y-2"><Label>Tank Mates</Label><Textarea value={formData.tankMates} onChange={(e) => handleInputChange("tankMates", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Common Myths</Label><Textarea value={formData.commonMyths} onChange={(e) => handleInputChange("commonMyths", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Compatibility Notes</Label><Textarea value={formData.compatibilityNotes} onChange={(e) => handleInputChange("compatibilityNotes", e.target.value)} /></div>
                                    </TabsContent>

                                    <TabsContent value="health" className="mt-0 space-y-4">
                                        <div className="flex justify-between items-center"><h3 className="font-semibold">Health Watch</h3><Button onClick={addDisease} size="sm" variant="outline"><Plus className="h-4 w-4 mr-1" /> Add Disease</Button></div>
                                        {formData.commonDiseases.map((d, i) => (
                                            <div key={i} className="p-4 border rounded-lg relative bg-muted/20 space-y-3">
                                                <Button onClick={() => removeDisease(i)} size="icon" variant="ghost" className="absolute top-2 right-2 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                                    <div className="space-y-1"><Label>Disease</Label><Input value={d.condition} onChange={(e) => updateDisease(i, "condition", e.target.value)} /></div>
                                                    <div className="space-y-1"><Label>Cause</Label><Input value={d.potential_cause} onChange={(e) => updateDisease(i, "potential_cause", e.target.value)} /></div>
                                                    <div className="space-y-1 md:col-span-2"><Label>Symptoms</Label><Textarea value={d.symptoms} onChange={(e) => updateDisease(i, "symptoms", e.target.value)} /></div>
                                                </div>
                                            </div>
                                        ))}
                                    </TabsContent>

                                    <TabsContent value="breeding" className="mt-0 space-y-4">
                                        <div className="space-y-2"><Label>Breeding Difficulty</Label>
                                            <Select value={formData.breedingDifficulty} onValueChange={(v) => handleInputChange("breedingDifficulty", v)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="very_easy">Very Easy</SelectItem>
                                                    <SelectItem value="easy">Easy</SelectItem>
                                                    <SelectItem value="moderate">Moderate</SelectItem>
                                                    <SelectItem value="difficult">Difficult</SelectItem>
                                                    <SelectItem value="very_difficult">Very Difficult</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2"><Label>Breeding Triggers</Label><Textarea value={formData.breedingTriggers} onChange={(e) => handleInputChange("breedingTriggers", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Spawning Process</Label><Textarea value={formData.spawningProcess} onChange={(e) => handleInputChange("spawningProcess", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Breeding Notes</Label><Textarea value={formData.breedingNotes} onChange={(e) => handleInputChange("breedingNotes", e.target.value)} /></div>
                                        <Separator />
                                        <div className="flex justify-between items-center"><h3 className="font-semibold">Fry Development</h3><Button onClick={addFryStage} size="sm" variant="outline"><Plus className="w-4 h-4" /></Button></div>
                                        {formData.fryDevelopment.map((s, i) => (
                                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2 border p-4 rounded-lg relative bg-muted/10">
                                                <div className="space-y-1"><Label className="text-xs">Stage</Label><Input value={s.stage} onChange={(e) => updateFryStage(i, "stage", e.target.value)} /></div>
                                                <div className="space-y-1"><Label className="text-xs">Time</Label><Input value={s.timeframe} onChange={(e) => updateFryStage(i, "timeframe", e.target.value)} /></div>
                                                <div className="space-y-1"><Label className="text-xs">Care</Label><Input value={s.care_requirement} onChange={(e) => updateFryStage(i, "care_requirement", e.target.value)} /></div>
                                                <Button onClick={() => removeFryStage(i)} size="icon" variant="ghost" className="absolute -right-2 -top-2 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                                            </div>
                                        ))}
                                    </TabsContent>
                                </>
                            )}

                            {/* PLANT GROWTH TAB */}
                            {formData.category !== "fish" && (
                                <TabsContent value="growth" className="mt-0 space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2"><Label>Placement</Label>
                                            <Select value={formData.placement} onValueChange={(v) => handleInputChange("placement", v)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent><SelectItem value="foreground">Foreground</SelectItem><SelectItem value="midground">Midground</SelectItem><SelectItem value="background">Background</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2"><Label>Growth Rate</Label>
                                            <Select value={formData.growthRate} onValueChange={(v) => handleInputChange("growthRate", v)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent><SelectItem value="slow">Slow</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="fast">Fast</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2"><Label>Lighting</Label>
                                            <Select value={formData.lighting} onValueChange={(v) => handleInputChange("lighting", v)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent><SelectItem value="low">Low</SelectItem><SelectItem value="medium">Medium</SelectItem><SelectItem value="high">High</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2"><Label>CO2 Required?</Label>
                                            <Select value={formData.co2Required} onValueChange={(v) => handleInputChange("co2Required", v)}>
                                                <SelectTrigger><SelectValue /></SelectTrigger>
                                                <SelectContent><SelectItem value="false">No</SelectItem><SelectItem value="true">Yes</SelectItem></SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2"><Label>CO2 Optimal (ppm)</Label><Input type="number" value={formData.co2OptimalPpm} onChange={(e) => handleInputChange("co2OptimalPpm", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Max Height (cm)</Label><Input type="number" value={formData.maxHeightCm} onChange={(e) => handleInputChange("maxHeightCm", e.target.value)} /></div>
                                        <div className="space-y-2"><Label>Substrate Type</Label><Input value={formData.substrateType} onChange={(e) => handleInputChange("substrateType", e.target.value)} /></div>
                                    </div>
                                    <div className="space-y-2"><Label>Propagation Method</Label><Textarea value={formData.propagationMethod} onChange={(e) => handleInputChange("propagationMethod", e.target.value)} /></div>
                                    <div className="space-y-2"><Label>Deficiency Indicators (JSON)</Label><Textarea value={formData.deficiencyIndicators} onChange={(e) => handleInputChange("deficiencyIndicators", e.target.value)} className="min-h-[80px]" /></div>
                                </TabsContent>
                            )}

                            {/* MEDIA TAB */}
                            <TabsContent value="media" className="mt-0 space-y-6">
                                <div className="space-y-4">
                                    <Label>Primary Image URL</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <Input className="pl-10" value={formData.imageUrl} onChange={(e) => handleInputChange("imageUrl", e.target.value)} />
                                        </div>
                                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                                        <Button variant="outline" type="button" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                                            {isUploading ? <Loader2 className="animate-spin h-4 w-4" /> : <Upload className="h-4 w-4 mr-2" />} Browse
                                        </Button>
                                    </div>
                                    {formData.imageUrl && (
                                        <div className="relative inline-block mt-2 border rounded-lg p-2 bg-muted/30">
                                            <img src={formData.imageUrl} alt="Preview" className="max-h-40 rounded" />
                                            <button onClick={() => handleInputChange("imageUrl", "")} className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-white rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="max-w-xs space-y-2">
                                        <Label>Status</Label>
                                        <Select value={formData.status} onValueChange={(v) => handleInputChange("status", v)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent><SelectItem value="published">Published</SelectItem><SelectItem value="draft">Draft</SelectItem><SelectItem value="archived">Archived</SelectItem></SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </ScrollArea>

                    <div className="flex gap-3 p-6 border-t border-border mt-auto">
                        <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
                        <Button onClick={handleSubmit} className="flex-1 bg-primary" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : null} Save Changes
                        </Button>
                    </div>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default EditSpeciesModal;

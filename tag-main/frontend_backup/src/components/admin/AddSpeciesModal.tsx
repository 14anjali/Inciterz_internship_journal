import {useState, useRef} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription} from "@/components/ui/dialog";
import {toast} from "sonner";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {ScrollArea} from "@/components/ui/scroll-area";
import {Separator} from "@/components/ui/separator";
import {SpeciesFormData, CommonDisease, FryStage} from "@/api/apiTypes";
import {speciesApi} from "@/api/modules/species";
import {Link as LinkIcon, X, Upload, Loader2, Plus, Trash2} from "lucide-react";
import CircularLoader from "../ui/CircularLoader";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface AddSpeciesModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AddSpeciesModal = ({isOpen, onClose}: AddSpeciesModalProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

	const [formData, setFormData] = useState({
		commonName: "",
		scientificName: "",
		family: "",
		origin: "",
		waterType: "",
		minTemp: "",
		maxTemp: "",
		minPh: "",
		maxPh: "",
		minHardness: "",
		maxHardness: "",
		dietType: "",
		careLevel: "",
		temperament: "",
		maxSize: "",
		minTankSize: "",
		dietInfo: "",
		description: "",
		imageUrl: "",
		breedingDifficulty: "",
		breedingNotes: "",
		isFinNipper: "false",
		hasDelicateFins: "false",
		swimmingLevel: "middle",
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
		status: "draft",
	});

	const handleInputChange = (field: string, value: any) => {
		setFormData((prev) => ({...prev, [field]: value}));
	};

    const addDisease = () => {
        setFormData(prev => ({
            ...prev,
            commonDiseases: [...prev.commonDiseases, { condition: "", symptoms: "", potential_cause: "" }]
        }));
    };

    const removeDisease = (index: number) => {
        setFormData(prev => ({
            ...prev,
            commonDiseases: prev.commonDiseases.filter((_, i) => i !== index)
        }));
    };

    const updateDisease = (index: number, field: keyof CommonDisease, value: string) => {
        setFormData(prev => ({
            ...prev,
            commonDiseases: prev.commonDiseases.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const addFryStage = () => {
        setFormData(prev => ({
            ...prev,
            fryDevelopment: [...prev.fryDevelopment, { stage: "", timeframe: "", care_requirement: "" }]
        }));
    };

    const removeFryStage = (index: number) => {
        setFormData(prev => ({
            ...prev,
            fryDevelopment: prev.fryDevelopment.filter((_, i) => i !== index)
        }));
    };

    const updateFryStage = (index: number, field: keyof FryStage, value: string) => {
        setFormData(prev => ({
            ...prev,
            fryDevelopment: prev.fryDevelopment.map((item, i) => 
                i === index ? { ...item, [field]: value } : item
            )
        }));
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const response = await speciesApi.uploadImage(file);
            handleInputChange("imageUrl", response.data.imageUrl);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Failed to upload image");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

	const handleSubmit = async () => {
		try {
			setIsLoading(true);
			setError(null);
			// Validate required fields
			if (!formData.commonName || !formData.scientificName || !formData.waterType) {
				setError("Please fill in all required fields (Common Name, Scientific Name, and Water Type)");
				setIsLoading(false);
				return;
			}
			// Transform camelCase to snake_case for backend
			const speciesData: SpeciesFormData = {
				common_name: formData.commonName,
				scientific_name: formData.scientificName,
				family: formData.family || undefined,
				origin: formData.origin || undefined,
				water_type: formData.waterType,
				min_temp: formData.minTemp ? parseFloat(formData.minTemp) : undefined,
				max_temp: formData.maxTemp ? parseFloat(formData.maxTemp) : undefined,
				min_ph: formData.minPh ? parseFloat(formData.minPh) : undefined,
				max_ph: formData.maxPh ? parseFloat(formData.maxPh) : undefined,
				min_hardness: formData.minHardness ? parseFloat(formData.minHardness) : undefined,
				max_hardness: formData.maxHardness ? parseFloat(formData.maxHardness) : undefined,
				diet_type: formData.dietType || undefined,
				care_level: formData.careLevel ? formData.careLevel.replace(/-/g, "_") : undefined,
				temperament: formData.temperament ? formData.temperament.replace(/-/g, "_") : undefined,
				max_size_cm: formData.maxSize ? parseFloat(formData.maxSize) : undefined,
				min_tank_size_liters: formData.minTankSize ? parseFloat(formData.minTankSize) : undefined,
				diet_info: formData.dietInfo || undefined,
				description: formData.description,
				primary_image: formData.imageUrl || undefined,
				breeding_difficulty: formData.breedingDifficulty ? formData.breedingDifficulty.replace(/-/g, "_") : undefined,
				breeding_notes: formData.breedingNotes || undefined,
				is_fin_nipper: formData.isFinNipper === "true",
				has_delicate_fins: formData.hasDelicateFins === "true",
				swimming_level: formData.swimmingLevel as "top" | "middle" | "bottom",
				
				lifespan_years: formData.lifespanYears || undefined,
				social_needs: formData.socialNeeds || undefined,
				filtration_requirement: formData.filtrationRequirement || undefined,
				varieties: formData.varieties || undefined,
				bioload: formData.bioload || undefined,
				recommended_substrate: formData.recommendedSubstrate || undefined,
				plant_safety: formData.plantSafety || undefined,
				breeding_triggers: formData.breedingTriggers || undefined,
				spawning_process: formData.spawningProcess || undefined,
				tank_mates: formData.tankMates || undefined,
                common_myths: formData.commonMyths || undefined,
                common_diseases: formData.commonDiseases.length > 0 ? formData.commonDiseases : undefined,
                fry_development: formData.fryDevelopment.length > 0 ? formData.fryDevelopment : undefined,
				
				status: formData.status,
			};

			const response = await speciesApi.addSpecies(speciesData);

			// Reset form
			setFormData({
				commonName: "",
				scientificName: "",
				family: "",
				origin: "",
				waterType: "",
				minTemp: "",
				maxTemp: "",
				minPh: "",
				maxPh: "",
				minHardness: "",
				maxHardness: "",
				dietType: "",
				careLevel: "",
				temperament: "",
				maxSize: "",
				minTankSize: "",
				dietInfo: "",
				description: "",
				imageUrl: "",
				breedingDifficulty: "",
				breedingNotes: "",
				isFinNipper: "false",
				hasDelicateFins: "false",
				swimmingLevel: "middle",
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
                commonDiseases: [],
                fryDevelopment: [],
				status: "draft",
			});

			toast.success(`Species "${response.data.common_name}" added successfully!`);
			onClose();
		} catch (err: any) {
			console.error("Error adding species:", err);
			const errorMessage = err.response?.data?.error || err.message || "Failed to add species";
			setError(errorMessage);
			toast.error(err instanceof Error ? err.message : "Failed to add species");
		} finally {
			setIsLoading(false);
		}
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

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="w-[95vw] sm:w-full max-w-4xl h-[90vh] p-0 bg-card border-border flex flex-col">
				<DialogHeader className="p-6 pb-2">
					<DialogTitle className="text-2xl font-bold text-foreground">Add New Species</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Fill in the details below to add a new species to the dictionary.
                    </DialogDescription>
				</DialogHeader>

				<Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
					<div className="px-6 border-b border-border">
						<TabsList className="w-full justify-start overflow-x-auto flex-nowrap h-auto py-2 gap-2 bg-transparent">
							<TabsTrigger value="basic">Basic Info</TabsTrigger>
							<TabsTrigger value="water">Water Parameters</TabsTrigger>
							<TabsTrigger value="care">Care & Behavior</TabsTrigger>
                            <TabsTrigger value="health">Health</TabsTrigger>
							<TabsTrigger value="breeding">Breeding</TabsTrigger>
							<TabsTrigger value="media">Media</TabsTrigger>
						</TabsList>
					</div>

					<ScrollArea className="flex-1">
						<div className="p-6">
							<TabsContent value="basic" className="mt-0 space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label htmlFor="commonName">Common Name *</Label>
										<Input
											id="commonName"
											placeholder="e.g., Clownfish"
											value={formData.commonName}
											onChange={(e) => handleInputChange("commonName", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="scientificName">Scientific Name *</Label>
										<Input
											id="scientificName"
											placeholder="e.g., Amphiprion ocellaris"
											value={formData.scientificName}
											onChange={(e) => handleInputChange("scientificName", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="family">Family</Label>
										<Input
											id="family"
											placeholder="e.g., Pomacentridae"
											value={formData.family}
											onChange={(e) => handleInputChange("family", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="origin">Origin</Label>
										<Input
											id="origin"
											placeholder="e.g., Indo-Pacific"
											value={formData.origin}
											onChange={(e) => handleInputChange("origin", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2 sm:col-span-2">
										<Label htmlFor="description">Description</Label>
										<Textarea
											id="description"
											placeholder="General description of the species..."
											value={formData.description}
											onChange={(e) => handleInputChange("description", e.target.value)}
											className="bg-background border-border min-h-[100px]"
										/>
									</div>
									
									<div className="space-y-2 sm:col-span-2">
										<Label htmlFor="varieties">Varieties (e.g. Orandas, Ranchus)</Label>
										<Input
											id="varieties"
											placeholder="Common varieties..."
											value={formData.varieties}
											onChange={(e) => handleInputChange("varieties", e.target.value)}
											className="bg-background border-border"
										/>
									</div>

									<div className="space-y-2">
										<Label>Status</Label>
										<Select value={formData.status} onValueChange={(v) => handleInputChange("status", v)}>
											<SelectTrigger className="bg-background border-border w-full">
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent className="bg-card border-border">
												<SelectItem value="published">Published</SelectItem>
												<SelectItem value="draft">Draft</SelectItem>
												<SelectItem value="archived">Archived</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="water" className="mt-0 space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									<div className="space-y-2 sm:col-span-2 lg:col-span-3">
										<Label>Water Type *</Label>
										<Select value={formData.waterType} onValueChange={(v) => handleInputChange("waterType", v)}>
											<SelectTrigger className="bg-background border-border">
												<SelectValue placeholder="Select water type" />
											</SelectTrigger>
											<SelectContent className="bg-card border-border">
												<SelectItem value="freshwater">Freshwater</SelectItem>
												<SelectItem value="marine">Marine</SelectItem>
												<SelectItem value="brackish">Brackish</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="minTemp">Min Temperature (°C)</Label>
										<Input
											id="minTemp"
											type="number"
											placeholder="e.g., 24"
											value={formData.minTemp}
											onChange={(e) => handleInputChange("minTemp", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="maxTemp">Max Temperature (°C)</Label>
										<Input
											id="maxTemp"
											type="number"
											placeholder="e.g., 28"
											value={formData.maxTemp}
											onChange={(e) => handleInputChange("maxTemp", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="minPh">Min pH</Label>
										<Input
											id="minPh"
											type="number"
											step="0.1"
											placeholder="e.g., 7.0"
											value={formData.minPh}
											onChange={(e) => handleInputChange("minPh", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="maxPh">Max pH</Label>
										<Input
											id="maxPh"
											type="number"
											step="0.1"
											placeholder="e.g., 8.4"
											value={formData.maxPh}
											onChange={(e) => handleInputChange("maxPh", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="minHardness">Min Hardness (dGH)</Label>
										<Input
											id="minHardness"
											type="number"
											placeholder="e.g., 8"
											value={formData.minHardness}
											onChange={(e) => handleInputChange("minHardness", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="maxHardness">Max Hardness (dGH)</Label>
										<Input
											id="maxHardness"
											type="number"
											placeholder="e.g., 12"
											value={formData.maxHardness}
											onChange={(e) => handleInputChange("maxHardness", e.target.value)}
											className="bg-background border-border"
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="care" className="mt-0 space-y-6">
								<div className="space-y-6">
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label>Diet Type</Label>
											<Select value={formData.dietType} onValueChange={(v) => handleInputChange("dietType", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue placeholder="Select diet type" />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="herbivore">Herbivore</SelectItem>
													<SelectItem value="carnivore">Carnivore</SelectItem>
													<SelectItem value="omnivore">Omnivore</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label>Care Level</Label>
											<Select value={formData.careLevel} onValueChange={(v) => handleInputChange("careLevel", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue placeholder="Select care level" />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="very-easy">Very Easy</SelectItem>
													<SelectItem value="easy">Easy</SelectItem>
													<SelectItem value="moderate">Moderate</SelectItem>
													<SelectItem value="difficult">Difficult</SelectItem>
													<SelectItem value="very-difficult">Very Difficult</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label>Temperament</Label>
											<Select value={formData.temperament} onValueChange={(v) => handleInputChange("temperament", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue placeholder="Select temperament" />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="peaceful">Peaceful</SelectItem>
													<SelectItem value="semi-aggressive">Semi-Aggressive</SelectItem>
													<SelectItem value="aggressive">Aggressive</SelectItem>
													<SelectItem value="territorial">Territorial</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label htmlFor="maxSize">Max Size (cm)</Label>
											<Input
												id="maxSize"
												type="number"
												placeholder="e.g., 11"
												value={formData.maxSize}
												onChange={(e) => handleInputChange("maxSize", e.target.value)}
												className="bg-background border-border"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="minTankSize">Min Tank Size (Liters)</Label>
											<Input
												id="minTankSize"
												type="number"
												placeholder="e.g., 100"
												value={formData.minTankSize}
												onChange={(e) => handleInputChange("minTankSize", e.target.value)}
												className="bg-background border-border"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="lifespanYears">Lifespan (Years)</Label>
											<Input
												id="lifespanYears"
												placeholder="e.g., 10-15"
												value={formData.lifespanYears}
												onChange={(e) => handleInputChange("lifespanYears", e.target.value)}
												className="bg-background border-border"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="bioload">Bioload</Label>
											<Select value={formData.bioload} onValueChange={(v) => handleInputChange("bioload", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue placeholder="Select bioload" />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="Low">Low</SelectItem>
													<SelectItem value="Medium">Medium</SelectItem>
													<SelectItem value="High">High</SelectItem>
													<SelectItem value="Very High">Very High</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
										<div className="space-y-2">
											<Label htmlFor="filtrationRequirement">Filtration Requirement</Label>
											<Input
												id="filtrationRequirement"
												placeholder="e.g., High (10x turnover)"
												value={formData.filtrationRequirement}
												onChange={(e) => handleInputChange("filtrationRequirement", e.target.value)}
												className="bg-background border-border"
											/>
										</div>
										<div className="space-y-2">
											<Label htmlFor="recommendedSubstrate">Recommended Substrate</Label>
											<Input
												id="recommendedSubstrate"
												placeholder="e.g., Sand or Fine Gravel"
												value={formData.recommendedSubstrate}
												onChange={(e) => handleInputChange("recommendedSubstrate", e.target.value)}
												className="bg-background border-border"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<Label htmlFor="socialNeeds">Social Needs</Label>
										<Textarea
											id="socialNeeds"
											placeholder="e.g., Shoaling species, keep in groups of 6+..."
											value={formData.socialNeeds}
											onChange={(e) => handleInputChange("socialNeeds", e.target.value)}
											className="bg-background border-border min-h-[60px]"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="plantSafety">Plant Safety</Label>
										<Input
											id="plantSafety"
											placeholder="e.g., Plant safe / Will eat soft plants"
											value={formData.plantSafety}
											onChange={(e) => handleInputChange("plantSafety", e.target.value)}
											className="bg-background border-border"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="dietInfo">Diet Information</Label>
										<Textarea
											id="dietInfo"
											placeholder="Describe the dietary requirements..."
											value={formData.dietInfo}
											onChange={(e) => handleInputChange("dietInfo", e.target.value)}
											className="bg-background border-border min-h-[80px]"
										/>
									</div>
									
									<Separator className="bg-border" />
									
									<h3 className="text-lg font-semibold text-foreground">Behavioral Traits</h3>
									<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
										<div className="space-y-2">
											<Label>Swimming Level</Label>
											<Select value={formData.swimmingLevel} onValueChange={(v) => handleInputChange("swimmingLevel", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue placeholder="Select level" />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="top">Top (Surface)</SelectItem>
													<SelectItem value="middle">Middle (Mid-water)</SelectItem>
													<SelectItem value="bottom">Bottom (Substrate)</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label>Is Fin Nipper?</Label>
											<Select value={formData.isFinNipper} onValueChange={(v) => handleInputChange("isFinNipper", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="false">No</SelectItem>
													<SelectItem value="true">Yes</SelectItem>
												</SelectContent>
											</Select>
										</div>
										<div className="space-y-2">
											<Label>Has Delicate Fins?</Label>
											<Select value={formData.hasDelicateFins} onValueChange={(v) => handleInputChange("hasDelicateFins", v)}>
												<SelectTrigger className="bg-background border-border">
													<SelectValue />
												</SelectTrigger>
												<SelectContent className="bg-card border-border">
													<SelectItem value="false">No</SelectItem>
													<SelectItem value="true">Yes</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
									<div className="space-y-2">
										<Label htmlFor="tankMates">Tank Mates</Label>
										<Textarea
											id="tankMates"
											placeholder="Suitable tank mates..."
											value={formData.tankMates}
											onChange={(e) => handleInputChange("tankMates", e.target.value)}
											className="bg-background border-border min-h-[60px]"
										/>
									</div>

                                    <div className="space-y-2">
										<Label htmlFor="commonMyths">Common Myths</Label>
										<Textarea
											id="commonMyths"
											placeholder="Common myths and misconceptions..."
											value={formData.commonMyths}
											onChange={(e) => handleInputChange("commonMyths", e.target.value)}
											className="bg-background border-border min-h-[60px]"
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="health" className="mt-0 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-foreground">Common Diseases (Health Watch)</h3>
                                        <Button onClick={addDisease} size="sm" variant="outline" className="flex items-center gap-2">
                                            <Plus className="w-4 h-4" /> Add Disease
                                        </Button>
                                    </div>
                                    
                                    {formData.commonDiseases.length === 0 ? (
                                        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                                            No diseases added yet. Click "Add Disease" to start.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.commonDiseases.map((disease, index) => (
                                                <div key={index} className="p-4 border border-border rounded-lg space-y-3 relative bg-card/50">
                                                    <Button 
                                                        onClick={() => removeDisease(index)} 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                                        <div className="space-y-2">
                                                            <Label>Condition / Disease Name</Label>
                                                            <Input 
                                                                value={disease.condition} 
                                                                onChange={(e) => updateDisease(index, "condition", e.target.value)}
                                                                placeholder="e.g. Ich (White Spot)"
                                                                className="bg-background border-border"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Potential Cause</Label>
                                                            <Input 
                                                                value={disease.potential_cause} 
                                                                onChange={(e) => updateDisease(index, "potential_cause", e.target.value)}
                                                                placeholder="e.g. Parasitic infection (stress-related)"
                                                                className="bg-background border-border"
                                                            />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <Label>Symptoms</Label>
                                                            <Textarea 
                                                                value={disease.symptoms} 
                                                                onChange={(e) => updateDisease(index, "symptoms", e.target.value)}
                                                                placeholder="e.g. Small white grains on body/fins"
                                                                className="bg-background border-border min-h-[60px]"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TabsContent>

							<TabsContent value="breeding" className="mt-0 space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="space-y-2">
										<Label>Breeding Difficulty</Label>
										<Select value={formData.breedingDifficulty} onValueChange={(v) => handleInputChange("breedingDifficulty", v)}>
											<SelectTrigger className="bg-background border-border">
												<SelectValue placeholder="Select difficulty" />
											</SelectTrigger>
											<SelectContent className="bg-card border-border">
												<SelectItem value="very-easy">Very Easy</SelectItem>
												<SelectItem value="easy">Easy</SelectItem>
												<SelectItem value="moderate">Moderate</SelectItem>
												<SelectItem value="difficult">Difficult</SelectItem>
												<SelectItem value="very-difficult">Very Difficult</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="breedingTriggers">Breeding Triggers</Label>
									<Textarea
										id="breedingTriggers"
										placeholder="Triggers like temperature drops, heavy feeding..."
										value={formData.breedingTriggers}
										onChange={(e) => handleInputChange("breedingTriggers", e.target.value)}
										className="bg-background border-border min-h-[80px]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="spawningProcess">Spawning Process</Label>
									<Textarea
										id="spawningProcess"
										placeholder="Description of the spawning act..."
										value={formData.spawningProcess}
										onChange={(e) => handleInputChange("spawningProcess", e.target.value)}
										className="bg-background border-border min-h-[80px]"
									/>
								</div>
								<div className="space-y-2">
									<Label htmlFor="breedingNotes">Breeding Notes</Label>
									<Textarea
										id="breedingNotes"
										placeholder="Notes about breeding this species..."
										value={formData.breedingNotes}
										onChange={(e) => handleInputChange("breedingNotes", e.target.value)}
										className="bg-background border-border min-h-[80px]"
									/>
								</div>

                                <Separator className="bg-border" />

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-semibold text-foreground">Fry Development Timeline</h3>
                                        <Button onClick={addFryStage} size="sm" variant="outline" className="flex items-center gap-2">
                                            <Plus className="w-4 h-4" /> Add Stage
                                        </Button>
                                    </div>

                                    {formData.fryDevelopment.length === 0 ? (
                                        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                                            No development stages added yet.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {formData.fryDevelopment.map((stage, index) => (
                                                <div key={index} className="p-4 border border-border rounded-lg space-y-3 relative bg-card/50">
                                                    <Button 
                                                        onClick={() => removeFryStage(index)} 
                                                        size="icon" 
                                                        variant="ghost" 
                                                        className="absolute top-2 right-2 text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                                                        <div className="space-y-2">
                                                            <Label>Stage Name</Label>
                                                            <Input 
                                                                value={stage.stage} 
                                                                onChange={(e) => updateFryStage(index, "stage", e.target.value)}
                                                                placeholder="e.g. Hatching"
                                                                className="bg-background border-border"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Timeframe</Label>
                                                            <Input 
                                                                value={stage.timeframe} 
                                                                onChange={(e) => updateFryStage(index, "timeframe", e.target.value)}
                                                                placeholder="e.g. 48-72 Hours"
                                                                className="bg-background border-border"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Care Requirement</Label>
                                                            <Input 
                                                                value={stage.care_requirement} 
                                                                onChange={(e) => updateFryStage(index, "care_requirement", e.target.value)}
                                                                placeholder="e.g. Do not feed yet (yolk sacs)"
                                                                className="bg-background border-border"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
							</TabsContent>

							<TabsContent value="media" className="mt-0 space-y-6">
								<div className="space-y-6">
									<div className="space-y-2">
										<Label>Primary Image URL</Label>
										<div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="imageUrl"
                                                    type="url"
                                                    placeholder="https://example.com/image.webp"
                                                    value={formData.imageUrl}
                                                    onChange={(e) => handleInputChange("imageUrl", e.target.value)}
                                                    className="bg-background border-border pl-10"
                                                />
                                            </div>
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                accept="image/*"
                                                onChange={handleFileSelect}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => fileInputRef.current?.click()}
                                                disabled={isUploading}
                                            >
                                                {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                                                Browse
                                            </Button>
                                        </div>
										{formData.imageUrl && (
											<div className="relative inline-block mt-2 border border-border rounded-lg p-2">
												<img
													src={formData.imageUrl}
													alt="Preview"
													className="max-h-40 rounded object-cover"
													onError={(e) => {
														e.currentTarget.src =
															"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='160'%3E%3Crect fill='%23ddd' width='200' height='160'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EInvalid URL%3C/text%3E%3C/svg%3E";
													}}
												/>
												<button
													onClick={() => handleInputChange("imageUrl", "")}
													type="button"
													className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90">
													<X className="w-4 h-4" />
												</button>
											</div>
										)}
									</div>
								</div>
							</TabsContent>
						</div>
					</ScrollArea>

					{/* Footer Actions */}
					<div className="flex flex-col sm:flex-row gap-3 p-6 pt-4 border-t border-border mt-auto">
						<Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none">
							Cancel
						</Button>
						<Button onClick={handleSubmit} className="flex-1 sm:flex-none bg-primary hover:bg-primary/90">
							Add Species
						</Button>
					</div>
				</Tabs>
			</DialogContent>
		</Dialog>
	);
};

export default AddSpeciesModal;

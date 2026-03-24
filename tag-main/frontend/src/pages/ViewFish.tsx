import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Droplets, Heart, Activity, AlertTriangle, Lightbulb } from "lucide-react";
import { speciesApi } from "@/api/modules/species";
import RangeBar from "@/components/RangeBar";

const ViewFish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  //console.log("Fetching fish with ID:", id);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["fish", id],
    queryFn: async () => {
      return await speciesApi.getSpeciesById(id!);
    },
    enabled: !!id,
    select: (res) => res.data,
  });

  const fish = data?.species;
  const [showPhInfo, setShowPhInfo] = useState(false);
  const [phTooltipPos, setPhTooltipPos] = useState({ x: 0, y: 0 });
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const hideTimer = React.useRef<NodeJS.Timeout | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const barRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!fish) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Animal",
      name: fish.common_name,
      alternateName: fish.scientific_name,
      description: fish.description,
      image: fish.primary_image,
      additionalProperty: [
        { "@type": "PropertyValue", name: "pH Range", value: `${fish.min_ph}-${fish.max_ph}` },
        { "@type": "PropertyValue", name: "Temperature Range", value: `${fish.min_temp}-${fish.max_temp} °C` },
        { "@type": "PropertyValue", name: "Care Level", value: fish.care_level },
      ],
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [fish]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !fish) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-destructive mb-4">Error loading fish data.</p>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const avgPh = (Number(fish.min_ph) + Number(fish.max_ph)) / 2;
  let phNature = "Neutral";
  if (avgPh < 6.6) phNature = "Acidic";
  else if (avgPh > 7.4) phNature = "Alkaline";

  const phInfo = {
    range: `${fish.min_ph} - ${fish.max_ph}`,
    description: "Light Green - Ideal for most community fish",
    note: "Match this color when testing your aquarium water",
    link: "/phguide",
    nature: phNature,
  };

  const InfoItem = ({
    icon: Icon,
    label,
    value,
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
  }) => (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
      <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="container mx-auto px-4 py-6 max-w-screen-xl">
        
        {/* Wiki-style Title */}
        <div className="sticky top-16 z-20 bg-background pt-4 border-b border-border mb-6 pb-1 wiki-title-sticky-container">
          <div className="flex items-center justify-between">
            <h1 className="text-[1.8rem] font-serif font-normal leading-[1.3] text-foreground border-b-0 mb-0">
              {fish.common_name}
            </h1>
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="h-8 px-2 text-sm text-primary hover:underline hover:bg-transparent"
            >
              ← Back
            </Button>
          </div>
          <p className="text-[0.85rem] text-muted-foreground">
            From Aqua Guide, the free encyclopedia
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 relative">
          
          {/* RIGHT COLUMN: Infobox (Taxobox style) - Sticky on Desktop */}
          <div className="lg:w-[300px] lg:flex-shrink-0 lg:order-2 lg:sticky lg:top-40 h-fit right-column-sticky-container">
            <div className="border border-border bg-muted/30 p-1 text-[0.85rem] leading-[1.4] mb-4">
              <div className="bg-muted text-center p-2 font-bold text-[1.1em] border-b border-border mb-2 text-foreground">
                {fish.common_name}
              </div>
              
              {fish.primary_image ? (
                <div className="mb-2 bg-card flex justify-center p-1">
                  <img
                    src={fish.primary_image}
                    alt={fish.common_name}
                    className="max-w-full h-auto border border-border"
                  />
                </div>
              ) : (
                <div className="h-32 bg-muted flex items-center justify-center text-muted-foreground mb-2">
                  No Image
                </div>
              )}

              <table className="w-full border-collapse text-foreground">
                <tbody>
                  <tr>
                    <th colSpan={2} className="bg-muted text-center py-1 font-bold border-t border-border">
                      Scientific classification
                    </th>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Scientific Name:</td>
                    <td className="py-1 align-top italic">{fish.scientific_name}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Family:</td>
                    <td className="py-1 align-top">{fish.family || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Origin:</td>
                    <td className="py-1 align-top">{fish.origin || "N/A"}</td>
                  </tr>
                  
                  <tr>
                    <th colSpan={2} className="bg-muted text-center py-1 font-bold border-t border-border mt-2">
                      Care Characteristics
                    </th>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Care Level:</td>
                    <td className="py-1 align-top capitalize">{fish.care_level?.replace(/_/g, " ")}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Diet:</td>
                    <td className="py-1 align-top capitalize">{fish.diet_type}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Max Size:</td>
                    <td className="py-1 align-top">{fish.max_size_cm ? `${fish.max_size_cm} cm` : "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Water Type:</td>
                    <td className="py-1 align-top capitalize">{fish.water_type}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Temperament:</td>
                    <td className="py-1 align-top capitalize">{fish.temperament?.replace(/_/g, " ")}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Varieties:</td>
                    <td className="py-1 align-top">{fish.varieties || "N/A"}</td>
                  </tr>
                  <tr>
                    <td className="pr-2 py-1 align-top">Lifespan:</td>
                    <td className="py-1 align-top">{fish.lifespan_years ? `${fish.lifespan_years} years` : "N/A"}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Quick Tips Sidebar (New UI Component) */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm mb-4">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Bioload:</span>
                  <span className="font-semibold">{fish.bioload || "Moderate"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Min Tank:</span>
                  <span className="font-semibold">{fish.min_tank_size_liters || "N/A"} L</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Substrate:</span>
                  <span className="font-semibold text-right max-w-[50%]">{fish.recommended_substrate || "Any"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Plant Safe:</span>
                  <span className="font-semibold text-right max-w-[50%]">{fish.plant_safety || "Yes"}</span>
                </li>
                <li className="flex justify-between">
                  <span className="font-medium text-muted-foreground">Filtration:</span>
                  <span className="font-semibold text-right max-w-[50%]">{fish.filtration_requirement || "Standard"}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* LEFT COLUMN: Main Content */}
          <div className="flex-1 lg:order-1 text-[0.95rem] leading-[1.6] text-foreground">
            
            {/* Introduction */}
            <p className="mb-4">
              <b>{fish.common_name}</b> (<i>{fish.scientific_name}</i>) is a species of fish in the family {fish.family || "Unknown"}. 
              It is native to {fish.origin || "various regions"}. {fish.description}
            </p>
            
            {/* Compatibility Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${fish.swimming_level ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-muted text-muted-foreground border-border"}`}>
                    {fish.swimming_level ? `${fish.swimming_level} Swimmer` : "Unknown Level"}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${!fish.is_fin_nipper ? "bg-green-100 text-green-800 border-green-200" : "bg-red-100 text-red-800 border-red-200"}`}>
                    {fish.is_fin_nipper ? "Fin Nipper" : "Non-Nipper"}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold border ${fish.temperament === "peaceful" ? "bg-green-100 text-green-800 border-green-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}>
                    {fish.temperament === "peaceful" ? "Community Safe" : "Caution Required"}
                </span>
            </div>

            {/* Contents Box */}
            <div className="bg-muted/30 border border-border inline-block p-3 mb-6 min-w-[200px]">
              <div className="font-bold text-center mb-2 text-sm text-foreground">Contents</div>
              <ol className="list-decimal pl-5 text-primary text-sm">
                <li><a href="#care" className="hover:underline">Care and Feeding</a></li>
                <li><a href="#water" className="hover:underline">Water Parameters</a></li>
                <li><a href="#health" className="hover:underline">Health Watch</a></li>
                <li><a href="#breeding" className="hover:underline">Breeding</a></li>
                <li><a href="#behavior" className="hover:underline">Behavior</a></li>
                {fish.tank_mates && <li><a href="#tankmates" className="hover:underline">Tank Mates</a></li>}
                <li><a href="#myths" className="hover:underline">Common Myths</a></li>
              </ol>
            </div>

            {/* Care Section */}
            <h2 id="care" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
              Care and Feeding
            </h2>
            <p className="mb-4">
              {fish.diet_info ? `${fish.diet_info} ` : "No specific diet information is available for this species. "}
              The diet type is generally considered <b>{fish.diet_type}</b>.
            </p>

            {/* Water Parameters Section */}
            <h2 id="water" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
              Water Parameters
            </h2>
            <div className="mb-4">
              <p className="mb-4">
                This species requires specific water conditions to thrive. 
                The recommended pH range is <b>{fish.min_ph} - {fish.max_ph}</b>, 
                and the temperature should be maintained between <b>{fish.min_temp}°C</b> and <b>{fish.max_temp}°C</b>.
                Water hardness should be between <b>{fish.min_hardness}</b> and <b>{fish.max_hardness} dGH</b>.
              </p>
              
              {/* Visual Bars adapted to look more 'scientific' */}
              <div className="mb-4 p-4 border border-border bg-muted/10 max-w-2xl">
                <h3 className="font-bold mb-4 text-sm text-foreground">Parameter Ranges</h3>
                
                {/* Reusing the RangeBar logic but simplifying container */}
                <div className="space-y-6">
                  {/* pH */}
                  <div className="relative">
                    <RangeBar
                      label="pH"
                      rangeMin={Number(fish.min_ph) || 7}
                      rangeMax={Number(fish.max_ph) || 7}
                      fixedScale={[0, 14]}
                      gradient="linear-gradient(90deg, #ff0000 0%, #ff8c00 25%, #2ecc71 50%, #3498db 75%, #8e44ad 100%)"
                    />
                    <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                       <span>
                          Recommended: <b>{phInfo.range}</b> ({phInfo.nature}).
                          <a
                            href={phInfo.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-primary hover:underline font-medium"
                          >
                            Understand pH &rarr;
                          </a>
                       </span>
                    </div>
                  </div>

                  <RangeBar
                    label="Temperature"
                    rangeMin={Number(fish.min_temp) || 20}
                    rangeMax={Number(fish.max_temp) || 30}
                    unit="°C"
                    fixedScale={[10, 40]}
                    // 10°C: Cold (Blue) | 22-28°C: Tropical Neutral (Green/Yellow) 
                    // 35°C+: Extreme Heat (Red)
                    gradient="linear-gradient(90deg, #3498db 0%, #2ecc71 40%, #f1c40f 60%, #e67e22 80%, #e74c3c 100%)"
                  />
                  <div className="relative">
                    <RangeBar
                      label="Hardness"
                      rangeMin={Number(fish.min_hardness) || 0}
                      rangeMax={Number(fish.max_hardness) || 10}
                      unit=" dGH"
                      fixedScale={[0, 30]}
                      gradient="linear-gradient(90deg, #b3e0ff 0%, #00ff00 50%, #a0522d 100%)"
                    />
                    <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
                       <span>
                          Recommended: <b>{fish.min_hardness} - {fish.max_hardness} dGH</b>.
                          <a
                            href="/water-guide"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1 text-primary hover:underline font-medium"
                          >
                            Understand Hardness &rarr;
                          </a>
                       </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Watch Section (New) */}
            <h2 id="health" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
              Health Watch
            </h2>
            <div className="mb-4 overflow-x-auto">
                {fish.common_diseases && fish.common_diseases.length > 0 ? (
                    <table className="w-full text-sm border-collapse border border-border min-w-[500px]">
                        <thead>
                            <tr className="bg-muted">
                                <th className="border border-border p-2 text-left font-semibold">Condition</th>
                                <th className="border border-border p-2 text-left font-semibold">Symptoms</th>
                                <th className="border border-border p-2 text-left font-semibold">Potential Cause</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fish.common_diseases.map((disease, index) => (
                                <tr key={index}>
                                    <td className="border border-border p-2 font-medium">{disease.condition}</td>
                                    <td className="border border-border p-2">{disease.symptoms}</td>
                                    <td className="border border-border p-2">{disease.potential_cause}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-muted-foreground italic">No specific disease information available for this species.</p>
                )}
            </div>

            {/* Breeding Section */}
            <h2 id="breeding" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
              Breeding
            </h2>
            <p className="mb-4">
              {fish.breeding_notes ? fish.breeding_notes : "No specific breeding information is available."}
              <br/>
              Breeding difficulty: <b>{fish.breeding_difficulty?.replace(/_/g, " ")}</b>.
            </p>
            
            {/* Deep Dive: Breeding Logic (New) */}
            <div className="bg-muted/10 border-l-4 border-primary p-4 my-4">
                <h3 className="font-bold text-lg mb-2">The "Trigger" Mechanism</h3>
                <p className="mb-2 text-sm">{fish.breeding_triggers || "No specific breeding trigger information available."}</p>
                
                <h3 className="font-bold text-lg mt-4 mb-2">The Spawning Process</h3>
                <p className="mb-2 text-sm">{fish.spawning_process || "No specific spawning process information available."}</p>
                
                <h3 className="font-bold text-lg mt-4 mb-2">Fry Development Timeline</h3>
                <div className="overflow-x-auto">
                    {fish.fry_development && fish.fry_development.length > 0 ? (
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-1 pr-4">Stage</th>
                                    <th className="py-1 pr-4">Timeframe</th>
                                    <th className="py-1">Care Requirement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fish.fry_development.map((stage, index) => (
                                    <tr key={index} className="border-b border-border/50 last:border-0">
                                        <td className="py-1 font-medium">{stage.stage}</td>
                                        <td className="py-1">{stage.timeframe}</td>
                                        <td className="py-1">{stage.care_requirement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-sm text-muted-foreground italic">No fry development timeline available.</p>
                    )}
                </div>
            </div>

            {/* Behavior Section */}
            <h2 id="behavior" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
              Behavior and Compatibility
            </h2>
            <p className="mb-4">
              The species is generally described as <b>{fish.temperament?.replace(/_/g, " ")}</b>. 
              {fish.social_needs && <span className="ml-1">{fish.social_needs}</span>}
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li><b>Swimming Level:</b> {fish.swimming_level || "Variable"}</li>
              <li><b>Fin Nipper:</b> {fish.is_fin_nipper ? "Yes" : "No"}</li>
              <li><b>Delicate Fins:</b> {fish.has_delicate_fins ? "Yes" : "No"}</li>
            </ul>

            {/* Tank Mates Section */}
            {fish.tank_mates && (
                <>
                    <h2 id="tankmates" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
                        Suitable Tank Mates
                    </h2>
                    <p className="mb-4">{fish.tank_mates}</p>
                </>
            )}

            {/* Common Myths Section */}
            {fish.common_myths && (
                <>
                    <h2 id="myths" className="text-[1.5rem] font-serif border-b border-border mb-4 pb-1 mt-6 text-foreground">
                        Common Myths
                    </h2>
                    <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg mb-6">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                            <div className="text-sm">
                                <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">Myth Buster</p>
                                <p className="text-foreground/90">{fish.common_myths}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}

          </div>
        </div>
      </div>
      {/* JSON-LD Structured Data is injected via useEffect */}
    </div>
  );
};

export default ViewFish;

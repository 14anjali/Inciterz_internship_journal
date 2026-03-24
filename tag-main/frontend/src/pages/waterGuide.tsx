import React, { useEffect } from "react";
import { Info, ShieldCheck, Beaker, Layers, Zap, Sprout, Lightbulb, ThermometerSnowflake } from "lucide-react";

const HardnessGuide = () => {
  // Scientifically accurate dGH (Degrees of General Hardness) ranges
  const hardnessRanges = [
    {
      label: "Soft Water",
      range: "0 - 6 dGH",
      description: "Low mineral content. Mimics soft rain-fed rivers and blackwater environments.",
      examples: "Discus, Neon Tetras, Rams, Bettas",
      colorClass: "from-emerald-500 to-teal-400",
      icon: <ThermometerSnowflake className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Moderate / Transition",
      range: "7 - 12 dGH",
      description: "A balanced mineral profile suitable for the widest variety of tropical community fish.",
      examples: "Angelfish, Corydoras, Barbs, many Plants",
      colorClass: "from-yellow-400 to-orange-400",
      icon: <ShieldCheck className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Hard Water",
      range: "13 - 30+ dGH",
      description: "High in Calcium and Magnesium. Essential for bone growth and osmoregulation in specific species.",
      examples: "Guppies, Mollies, African Cichlids, Goldfish",
      colorClass: "from-orange-600 to-red-700",
      icon: <Layers className="w-8 h-8 text-white drop-shadow-md" />,
    },
  ];

  const tips = [
    {
      title: "GH vs KH",
      text: "GH measures Calcium/Magnesium (for fish health). KH measures Carbonates (for pH stability). Both are vital.",
    },
    {
      title: "Evaporation Increases Hardness",
      text: "As water evaporates, minerals stay behind. Regular water changes are the only way to export these minerals.",
    },
    {
      title: "Natural Hardening",
      text: "Add crushed coral, Texas Hole Rock, or limestone to your filter to slowly increase mineral content.",
    },
    {
      title: "Softening Water",
      text: "The most effective way to lower GH is using an RO (Reverse Osmosis) unit or mixing in distilled water.",
    },
  ];

  // SEO: FAQ Schema Injection for Hardness
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is GH in an aquarium?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GH stands for General Hardness, which measures the concentration of dissolved Calcium and Magnesium ions in the water. It is measured in degrees (dGH) or ppm."
          }
        },
        {
          "@type": "Question",
          "name": "Do fish need hard or soft water?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on the species. South American fish like Discus prefer soft water (low GH), while Central American livebearers and African Cichlids require hard water (high GH) for survival."
          }
        },
        {
          "@type": "Question",
          "name": "How do I lower my aquarium GH?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To lower GH, you must dilute the minerals in your tank by performing a water change with Reverse Osmosis (RO) or distilled water. Driftwood and peat moss do not significantly lower GH."
          }
        }
      ]
    });
    document.head.appendChild(script);
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Hero Section */}
      <div className="relative bg-muted/30 py-16 mb-12 border-b border-border text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-[#2ecc71] via-[#f1c40f] via-[#e67e22] to-[#795548] bg-clip-text text-transparent">
			Understanding Water Hardness (GH)
		  </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Beyond pH lies General Hardness—the essential minerals that power your fish's biological functions.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl pb-20">
        {/* What is GH? */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-lg text-primary"><Beaker className="w-6 h-6"/></span>
                What is General Hardness?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
			     <b>General Hardness (GH)</b> refers to the amount of dissolved Calcium (Ca<sup>2+</sup>) and Magnesium (Mg<sup>2+</sup>) ions in your water.
			  </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                Think of minerals as "electrolytes" for your fish. Without the correct GH levels, fish cannot properly regulate their internal salt balance (osmoregulation), leading to severe stress or "soft-shell" issues in invertebrates.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 via-yellow-500 to-orange-600 opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
                  <span>Soft (0 dGH)</span>
                  <span>Moderate (10)</span>
                  <span>Very Hard (25+)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-gradient-to-r from-teal-400 via-yellow-300 via-orange-400 to-orange-800 mb-6"></div>
                <div className="space-y-4">
                  {hardnessRanges.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${item.colorClass} shadow-lg shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{item.label} <span className="text-sm font-normal text-muted-foreground">({item.range})</span></div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                        <div className="text-xs font-medium text-primary mt-1">Typical Inhabitants: {item.examples}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why it Matters */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Hardness is Vital</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Cellular Function</h3>
              <p className="text-muted-foreground">
                Calcium is necessary for muscle contraction, bone development, and the transmission of nerve impulses in fish.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Invertebrate Care</h3>
              <p className="text-muted-foreground">
                Shrimp and snails require Calcium to build their shells. Low GH results in "The White Ring of Death" or shell erosion.
              </p>
              
            </div>
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Plant Growth</h3>
              <p className="text-muted-foreground">
                Magnesium is the core atom of chlorophyll. Without adequate GH, aquatic plants turn yellow and stop growing.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Lightbulb className="w-64 h-64"/>
          </div>
          <h2 className="text-3xl font-bold mb-8 relative z-10">Mineral Mastery Tips</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{tip.title}</h3>
                  <p className="text-muted-foreground">{tip.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
            <Info className="w-6 h-6 text-blue-500 shrink-0 mt-1"/>
            <div>
              <h4 className="font-bold text-blue-500">Note for Soft-Water Keepers</h4>
              <p className="text-blue-500/80">
                While driftwood and leaves lower pH, they do <b>not</b> effectively lower GH. To reduce hardness, you must physically remove the minerals using an RO system or by diluting with rainwater/distilled water.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HardnessGuide;
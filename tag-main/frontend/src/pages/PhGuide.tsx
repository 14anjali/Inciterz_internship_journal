import React, { useEffect } from "react";
import { Info, AlertTriangle, Droplet, CheckCircle, Activity, Sprout, Lightbulb, Waves } from "lucide-react";

const PhGuide = () => {
  // Scientifically adjusted ranges for hobbyist standards
  const phRanges = [
    {
      label: "Acidic",
      range: "0 - 6.5",
      description: "High concentration of Hydrogen ions (H+). Common in soft water habitats like the Amazon basin.",
      examples: "Tetras, Discus, Angelfish, Bettas",
      colorClass: "from-red-500 to-orange-400",
      icon: <Droplet className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Neutral Zone",
      range: "6.6 - 7.4",
      description: "Balanced water chemistry. The 'sweet spot' for most community tanks and biological filtration.",
      examples: "Guppies, Corydoras, Platies, Rasboras",
      colorClass: "from-green-500 to-emerald-400",
      icon: <CheckCircle className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Alkaline",
      range: "7.5 - 14",
      description: "Mineral-rich water with excess Hydroxide ions (OH-). Very stable against pH crashes.",
      examples: "African Cichlids, Mollies, Swordtails, Goldfish",
      colorClass: "from-blue-500 to-indigo-400",
      icon: <Waves className="w-8 h-8 text-white drop-shadow-md" />,
    },
  ];

  const tips = [
    {
      title: "Test Regularly",
      text: "pH can fluctuate between day and night due to CO2 levels. Test weekly at the same time for consistency.",
    },
    {
      title: "Stability Over Perfection",
      text: "Fish adapt better to a stable pH slightly off-target than to a constantly swinging 'perfect' 7.0.",
    },
    {
      title: "Natural Adjustments",
      text: "To lower: Driftwood, Peat moss, or Catappa leaves. To raise: Crushed coral, Limestone, or Aragonite.",
    },
    {
      title: "The Logarithmic Factor",
      text: "A jump from pH 6 to 7 is a 10x change. A jump from 6 to 8 is a 100x change. Always adjust slowly.",
    },
  ];

  // SEO: FAQ Schema Injection
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the best pH for an aquarium?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most community fish thrive in a neutral zone between 6.6 and 7.4. Stability is far more important than hitting an exact 7.0."
          }
        },
        {
          "@type": "Question",
          "name": "How does pH affect ammonia toxicity?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In alkaline water (high pH), ammonia (NH3) is highly toxic. In acidic water (low pH), it converts to ammonium (NH4+), which is significantly less harmful."
          }
        },
        {
          "@type": "Question",
          "name": "What causes pH to drop in an aquarium?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "pH usually drops due to high organic waste (nitrification process), lack of mineral buffering (low KH), or the addition of CO2."
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-[#ff0000] via-[#ff8c00] via-[#2ecc71] via-[#3498db] to-[#8e44ad] bg-clip-text text-transparent">
				Mastering Aquarium pH
            </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The hidden chemistry that keeps your aquatic ecosystem thriving. Learn how to maintain balance safely.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl pb-20">
        {/* What is pH? */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-lg text-primary"><Info className="w-6 h-6"/></span>
                What is pH?
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                pH stands for <b>"Potential of Hydrogen"</b>. It measures the concentration of hydrogen ions in your water on a scale of 0 to 14.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                Because it is a logarithmic scale, a change of 1.0 represents a <b>10-fold difference</b> in acidity. Small movements on the scale are major events for your fish.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between text-xs font-bold text-muted-foreground mb-2">
                  <span>Acidic (0)</span>
                  <span>Neutral (7)</span>
                  <span>Alkaline (14)</span>
                </div>
                <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-400 to-indigo-600 mb-6"></div>
                <div className="space-y-4">
                  {phRanges.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${item.colorClass} shadow-lg shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-lg">{item.label} <span className="text-sm font-normal text-muted-foreground">({item.range})</span></div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                        <div className="text-xs font-medium text-primary mt-1">Best for: {item.examples}</div>
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
          <h2 className="text-3xl font-bold mb-8 text-center">The Critical Impact of pH</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-4">
                <Activity className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Osmoregulation</h3>
              <p className="text-muted-foreground">
                Incorrect pH interferes with a fish's ability to regulate salt levels in their blood, leading to stress and kidney failure.
              </p>
            </div>
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Ammonia Shift</h3>
              <p className="text-muted-foreground">
                At high pH, ammonia exists as toxic <b>NH3</b>. At low pH, it converts to non-toxic <b>NH4+</b> (ammonium). High pH makes ammonia much deadlier.
              </p>
              
            </div>
            <div className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-6 h-6"/>
              </div>
              <h3 className="font-bold text-xl mb-2">Cycle Stability</h3>
              <p className="text-muted-foreground">
                Nitrifying bacteria become sluggish below pH 6.5 and can go dormant below 6.0, causing a dangerous "cycle crash."
              </p>
            </div>
          </div>
        </section>

        {/* Pro Tips */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Lightbulb className="w-64 h-64"/>
          </div>
          <h2 className="text-3xl font-bold mb-8 relative z-10">Expert Guidelines</h2>
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

          <div className="mt-10 bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1"/>
            <div>
              <h4 className="font-bold text-destructive">The Golden Rule: Stability First</h4>
              <p className="text-destructive/80">
                Never "chase" a pH number using chemical buffers if your water is stable. Rapid pH swings are significantly more lethal to fish than a slightly off-target but consistent pH level.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PhGuide;
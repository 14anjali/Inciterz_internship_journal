import React, { useEffect } from "react";
import { Info, AlertTriangle, Bug, Waves, RefreshCcw, Sprout, Lightbulb, Biohazard } from "lucide-react";

const NitrogenCycleGuide = () => {
  // Critical markers for the Nitrogen Cycle stages
  const cycleStages = [
    {
      label: "Ammonia (NH3)",
      status: "Toxic",
      description: "Produced by fish waste and uneaten food. Even low levels cause gill burn and sudden death.",
      colorClass: "from-red-600 to-red-400",
      icon: <Biohazard className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Nitrite (NO2)",
      status: "Highly Toxic",
      description: "The middle stage. Prevents fish blood from carrying oxygen (Brown Blood Disease).",
      colorClass: "from-orange-500 to-amber-400",
      icon: <AlertTriangle className="w-8 h-8 text-white drop-shadow-md" />,
    },
    {
      label: "Nitrate (NO3)",
      status: "Safe in Moderation",
      description: "The end product. Only harmful in high concentrations. Removed via water changes and plants.",
      colorClass: "from-emerald-500 to-teal-400",
      icon: <Sprout className="w-8 h-8 text-white drop-shadow-md" />,
    },
  ];

  const proTips = [
    {
      title: "Don't Replace Filter Media",
      text: "Rinsing your sponges in tap water kills beneficial bacteria. Always use dechlorinated tank water for cleaning.",
    },
    {
      title: "Fishless Cycling",
      text: "The safest way to start. Use a pure ammonia source to build your bacterial colony before adding fish.",
    },
    {
      title: "The Role of Live Plants",
      text: "Plants act as a 'second filter' by directly absorbing Nitrates and even small amounts of Ammonia.",
    },
    {
      title: "Surface Agitation",
      text: "Beneficial bacteria are aerobic. They need high oxygen levels from surface ripples to process waste efficiently.",
    },
  ];

  // SEO: FAQ Schema Injection for the Nitrogen Cycle
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the nitrogen cycle in an aquarium?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The nitrogen cycle is the biological process where beneficial bacteria break down toxic ammonia into nitrite, and then into less harmful nitrate."
          }
        },
        {
          "@type": "Question",
          "name": "How long does it take to cycle a new fish tank?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Typically, a new aquarium takes 4 to 8 weeks to fully cycle. Using 'seeded' media from an established tank can speed this up to 1-2 weeks."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my aquarium ammonia high?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "High ammonia is usually caused by overfeeding, overstocking, or a 'crash' in beneficial bacteria due to cleaning filter media with chlorinated tap water."
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
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-emerald-600 to-blue-500 bg-clip-text text-transparent">
            The Nitrogen Cycle Guide
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            The single most important process in fishkeeping. Turn a toxic environment into a living ecosystem.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl pb-20">
        {/* The Science */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <span className="bg-primary/10 p-2 rounded-lg text-primary"><RefreshCcw className="w-6 h-6"/></span>
                How It Works
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                In an aquarium, "Beneficial Bacteria" act as your invisible waste management team. They live primarily on your filter media and gravel.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground">
                First, <b>Nitrosomonas</b> bacteria convert Ammonia into Nitrite. Then, <b>Nitrobacter</b> bacteria convert that Nitrite into Nitrate. This process is continuous and vital for survival.
              </p>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-emerald-500 opacity-20 blur-2xl rounded-full"></div>
              <div className="relative bg-card border border-border rounded-2xl p-6 shadow-xl">
                <h3 className="text-center font-bold text-sm text-muted-foreground mb-6 uppercase tracking-widest">The Conversion Flow</h3>
                <div className="space-y-4">
                  {cycleStages.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${item.colorClass} shadow-lg shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="font-bold text-lg flex items-center gap-2">
                          {item.label} 
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${idx === 2 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Tank Syndrome */}
        <section className="mb-16">
          <div className="bg-destructive/5 border border-destructive/20 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center shrink-0">
               <AlertTriangle className="w-10 h-10 text-destructive"/>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-destructive mb-2">New Tank Syndrome</h2>
              <p className="text-muted-foreground leading-relaxed">
                This occurs when fish are added to an uncycled tank. Without bacteria, Ammonia levels skyrocket within 48 hours. Most beginner fish deaths are caused by this preventable chemistry failure.
              </p>
            </div>
          </div>
        </section>

        {/* Expert Tips */}
        <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Bug className="w-64 h-64"/>
          </div>
          <h2 className="text-3xl font-bold mb-8 relative z-10">Cycling Success Tips</h2>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 relative z-10">
            {proTips.map((tip, idx) => (
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
        </section>
      </div>
    </div>
  );
};

export default NitrogenCycleGuide;
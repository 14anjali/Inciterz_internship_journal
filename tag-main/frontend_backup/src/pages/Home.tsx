import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-aquarium_slide1.webp";
import slider2 from "@/assets/slider-2.webp";
import slider3 from "@/assets/slider-3.webp";
import slider4 from "@/assets/slider-4.webp";
import { TankVolumeCalculator } from "@/components/tools/TankVolumeCalculator";
import { WaterParameters } from "@/components/tools/WaterParameter";
import { FeedingSchedule } from "@/components/tools/FeedingSchedule";
import { SubstrateCalculator } from "@/components/tools/SubstrateCalculator";
import { HeaterWattageGuide } from "@/components/tools/HeaterWattageGuide";
import { CompatibilityMatrix } from "@/components/tools/CompatibilityMatrix";
import { WaterChangeCalculator } from "@/components/tools/WaterChangeCalculator";
import { CO2BubbleCounter } from "@/components/tools/CO2BubbleCounter";
import { BioloadCalculator } from "@/components/tools/BioloadCalculator";
import { DosingCalculator } from "@/components/tools/DosingCalculator";
import { GoldenRatioOverlay } from "@/components/tools/GoldenRatioOverlay";
import { FishNameConverter } from "@/components/tools/FishNameConverter";
import { HardscapeCalculator } from "@/components/tools/HardscapeCalculator";
import { DiagnosticWizard } from "@/components/tools/DiagnosticWizard";
import { MedicationDosager } from "@/components/tools/MedicationDosager";
import { ElectricityCostEstimator } from "@/components/tools/ElectricityCostEstimator";
import { LightIntensityEstimator } from "@/components/tools/LightIntensityEstimator";
import { StatsOverlay } from "@/components/StatsOverlay";
import {
  ChevronLeft,
  ChevronRight,
  Video,
  BookOpen,
  Users,
  MessageSquare,
  Calculator,
  Droplets,
  Calendar,
  Fish,
  Layers,
  Thermometer,
  HeartHandshake,
  RefreshCw,
  Wind,
  Scale,
  FlaskConical,
    Frame,
  Search,
  Mountain,
  Stethoscope,
  Pill,
  Zap,
  Sun,
  Play,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { setAuthModalOpen, setAuthModalView } from "@/store/userSlice";

const sliderContent = [
  {
    image: heroImage,
    title: "Start Your Perfect Tank.",// " Your journey to a perfect aquarium starts here", "Deep Dive :: Fish Keeping",
    description:
      "Expert guides to help you build, balance, and maintain your underwater sanctuary.", //"Your comprehensive guide to thriving aquariums. Master every aspect, from setup to breeding.",
  },
  {
    image: slider2,
    title: "Expert Video Tutorials",
    description:
      "Learn from experienced aquarists with step-by-step video guides for all skill levels.",
  },
  {
    image: slider3,
    title: "Vibrant Community",
    description:
      "Connect with thousands of fish keepers, share experiences, and get instant advice.",
  },
  {
    image: slider4,
    title: "Species Encyclopedia",
    description:
      "Explore our comprehensive database of aquatic species with detailed care requirements.",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Slider */}
      <div className="relative group">
        <section className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] overflow-hidden">
        {sliderContent.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/0 to-black/80">
              <div className="container mx-auto px-4 h-full flex items-center justify-center">
                <div className="text-center space-y-6 max-w-4xl px-4">
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[75px] font-zolina font-bold text-white leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-[24px] font-poppins font-normal text-white max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-[600px] mx-auto">
                    <Link to="/text-guides" className="w-full">
                      <Button
                        className="w-full py-[22px] bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] text-white hover:opacity-90 transition-opacity rounded-full flex items-center justify-center gap-3 text-base font-medium"
                      >
                        <div className="bg-white rounded-full p-1 flex items-center justify-center shrink-0">
                          <Play className="h-3.5 w-3.5 fill-[hsl(var(--primary))] text-primary" />
                        </div>
                        Explore Fish Guides
                      </Button>
                    </Link>
                    <Button
                      className="w-full py-[22px] bg-card text-card-foreground hover:bg-muted transition-colors rounded-full border border-border text-base font-medium"
                      onClick={() => {
                        dispatch(setAuthModalView("register"));
                        dispatch(setAuthModalOpen(true));
                      }}
                    >
                      Join Our Community
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass-effect hover:bg-black/20 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full glass-effect hover:bg-black/20 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {sliderContent.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all shadow-sm ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        </section>
        {/* Real-time Stats Overlay */}
        <div className="relative md:absolute md:bottom-0 left-0 md:right-auto z-20 w-full md:w-auto md:mb-0">
          <StatsOverlay />
        </div>
      </div>

      {/* Features Section - Why Choose Us */}
      <section className="py-10 md:py-12 dark:bg-background bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-zolina font-bold lg:leading-[75px] text-center mb-8 md:mb-12 text-foreground">
            Why Choose Aqua Guide?
          </h2>
          <div className="rounded-3xl p-6 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Video,
                  title: "Video Guides",
                  description: "Step-by-step video tutorials from experts",
                },
                {
                  icon: BookOpen,
                  title: "Text Guides",
                  description: "Detailed written guides for all topics",
                },
                {
                  icon: Users,
                  title: "Community",
                  description: "Connect with fellow aquarists worldwide",
                },
                {
                  icon: MessageSquare,
                  title: "Live Chat",
                  description: "Real-time discussions and support",
                },
              ].map((feature, index) => (
                <Card 
                  key={index} 
                  className="bg-card hover:shadow-lg transition-shadow p-0 rounded-lg text-card-foreground"
                  style={{ 
                    boxShadow: '0 0 5px 0 hsl(var(--primary) / 0.1)',
                    WebkitBoxShadow: '0 0 5px 0 hsl(var(--primary) / 0.1)',
                    MozBoxShadow: '0 0 5px 0 hsl(var(--primary) / 0.1)'
                  }}
                >
                  <CardHeader className="py-4 px-2">
                    <div className="flex justify-center gap-4">
                        <feature.icon className="h-7 w-7 text-primary" />
                        <div className="grid gap-0">
                          <CardTitle className="text-[15px] font-semibold text-foreground">{feature.title}</CardTitle>
                          <CardDescription className="text-[11px] text-muted-foreground">{feature.description}</CardDescription>
                        </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            
            {/* Three Boxes Section - Latest Guides, Popular Videos, Community Buzz */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* Latest Guides */}
              <Card className="bg-card p-0 text-card-foreground">
                <CardHeader className="py-4 px-4 pb-2">
                  <CardTitle className="text-[15px] font-semibold text-foreground">Latest Guides</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {[
                    { title: "Beginner's Guide to Planted Tanks", date: "2 days ago" },
                    { title: "Beginner's Guide to Planted Tanks", date: "2 days ago" },
                    { title: "Beginner's Guide to Planted Tanks", date: "2 days ago" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm text-foreground">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Popular Videos */}
              <Card className="bg-card p-0 text-card-foreground">
                <CardHeader className="py-4 px-4 pb-2">
                  <CardTitle className="text-[15px] font-semibold text-foreground">Popular Videos</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {[
                    { title: "Setting Up Your First Aquarium", views: "15K views" },
                    { title: "Advanced Aquascaping Techniques", views: "15K views" },
                    { title: "Breeding Betta Fish", views: "15K views" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm text-foreground">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.views}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Community Buzz */}
              <Card className="bg-card p-0 text-card-foreground">
                <CardHeader className="py-4 px-4 pb-2">
                  <CardTitle className="text-[15px] font-semibold text-foreground">Community Buzz</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {[
                    { title: "Help! My fish are acting strange", replies: "24 replies" },
                    { title: "Show off your newest additions", replies: "24 replies" },
                    { title: "Best filter for 20 gallon tank?", replies: "24 replies" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-sm text-foreground">{item.title}</span>
                      <span className="text-xs text-muted-foreground">{item.replies}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Aquarist Tools */}
      <section className="py-8 md:py-10 dark:bg-background bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-[64px] font-zolina font-bold leading-[75px] text-center mb-8 md:mb-12 text-foreground">
            Aquarist Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            <TankVolumeCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold text-foreground">
                        Tank Volume Calculator
                      </CardTitle>
                      <CardDescription className="text-[11px] text-muted-foreground">
                        Calculate your tank capacity
                      </CardDescription>
                    </div>
                    <Calculator className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </TankVolumeCalculator>

            <SubstrateCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Substrate Calculator</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate required substrate amount
                      </CardDescription>
                    </div>
                    <Layers className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </SubstrateCalculator>

            <HeaterWattageGuide>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Heater Wattage Guide</CardTitle>
                      <CardDescription className="text-[11px]">
                        Find the right heater for your tank
                      </CardDescription>
                    </div>
                    <Thermometer className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </HeaterWattageGuide>

            <CompatibilityMatrix>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Compatibility Matrix</CardTitle>
                      <CardDescription className="text-[11px]">
                        Check fish compatibility
                      </CardDescription>
                    </div>
                    <HeartHandshake className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </CompatibilityMatrix>

            <FeedingSchedule>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Feeding Schedule</CardTitle>
                      <CardDescription className="text-[11px]">Plan your feeding routine</CardDescription>
                    </div>
                    <Calendar className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </FeedingSchedule>

            <WaterChangeCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Water Change Calculator</CardTitle>
                      <CardDescription className="text-[11px]">
                        Nitrate-based water change guide
                      </CardDescription>
                    </div>
                    <RefreshCw className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </WaterChangeCalculator>

            <CO2BubbleCounter>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">CO2 Bubble Counter</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate CO2 injection rate
                      </CardDescription>
                    </div>
                    <Wind className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </CO2BubbleCounter>

            <BioloadCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Bioload Calculator</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate stocking level by biomass
                      </CardDescription>
                    </div>
                    <Scale className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </BioloadCalculator>

            <DosingCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Dosing Calculator</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate fertilizer dosing
                      </CardDescription>
                    </div>
                    <FlaskConical className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </DosingCalculator>
			{/* New Tools Batch 2 */}
            <GoldenRatioOverlay>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Golden Ratio Overlay</CardTitle>
                      <CardDescription className="text-[11px]">
                        Aquascaping composition tool
                      </CardDescription>
                    </div>
                    <Frame className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </GoldenRatioOverlay>

            <FishNameConverter>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Fish Name Converter</CardTitle>
                      <CardDescription className="text-[11px]">
                        Common to Scientific names
                      </CardDescription>
                    </div>
                    <Search className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </FishNameConverter>

            <HardscapeCalculator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Hardscape Displacer</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate rock & wood volume
                      </CardDescription>
                    </div>
                    <Mountain className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </HardscapeCalculator>

            <DiagnosticWizard>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Diagnostic Wizard</CardTitle>
                      <CardDescription className="text-[11px]">
                        Identify plants & algae issues
                      </CardDescription>
                    </div>
                    <Stethoscope className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </DiagnosticWizard>

            <MedicationDosager>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Medication Dosager</CardTitle>
                      <CardDescription className="text-[11px]">
                        Safe dosing calculator
                      </CardDescription>
                    </div>
                    <Pill className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </MedicationDosager>

            <ElectricityCostEstimator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Energy Cost Estimator</CardTitle>
                      <CardDescription className="text-[11px]">
                        Calculate running costs
                      </CardDescription>
                    </div>
                    <Zap className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </ElectricityCostEstimator>

            <LightIntensityEstimator>
              <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                <CardHeader className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="grid gap-0 flex-1">
                      <CardTitle className="text-[15px] font-semibold">Light Intensity (PAR)</CardTitle>
                      <CardDescription className="text-[11px]">
                        Estimate lighting strength
                      </CardDescription>
                    </div>
                    <Sun className="h-7 w-7 text-primary flex-shrink-0" />
                  </div>
                </CardHeader>
              </Card>
            </LightIntensityEstimator>
          </div>
          {/* Center the last tool - Water Parameters */}
          <div className="flex justify-center mt-6">
            <div className="w-full max-w-[300px]">
              <WaterParameters>
                <Card className="hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer h-full bg-card p-0 text-card-foreground">
                  <CardHeader className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="grid gap-0 flex-1">
                        <CardTitle className="text-[15px] font-semibold">Water Parameters</CardTitle>
                        <CardDescription className="text-[11px]">
                          Check ideal ranges for species
                        </CardDescription>
                      </div>
                      <Droplets className="h-7 w-7 text-primary flex-shrink-0" />
                    </div>
                  </CardHeader>
                </Card>
              </WaterParameters>
            </div>
          </div>
        </div>
      </section>

      {/* Latest from Aqua Guide */}
      <section className="py-8 md:py-12 dark:bg-background bg-secondary/50">
        <div className="container mx-auto px-4">
          <h2 className="text-[64px] font-zolina font-bold leading-[75px] text-center mb-8 md:mb-12 text-foreground">
            Latest from Aqua Guide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 max-w-6xl mx-auto">
            {[
              {
                title: "Maintaining Crystal Clear Water",
                category: "Water Chemistry",
                date: "Jan 15, 2025",
                image: "/guide1.jpg",
              },
              {
                title: "Top 10 Beginner Fish Species",
                category: "Species Guide",
                date: "Jan 12, 2025",
                image: "/guide2.jpg",
              },
              {
                title: "Building a Biotope Aquarium",
                category: "Aquascaping",
                date: "Jan 10, 2025",
                image: "/guide3.jpg",
              },
            ].map((post, index) => (
              <Card key={index} className="bg-card hover:shadow-lg transition-shadow px-4 py-2 text-card-foreground">
                <CardHeader className="w-full mb-0 p-0">
                    <div className="text-sm font-medium text-primary">
                    {post.category}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center">
                      <img src={post.image} alt={post.title} className="w-[60px] h-[40px] object-cover rounded-[5px]" />
                    </div>
                    <div className="mb-0">
                      <CardTitle className="text-sm text-foreground">{post.title}</CardTitle>
                      <CardDescription className="text-xs text-muted-foreground">{post.date}</CardDescription>
                    </div>                    
                  </div>
                </CardHeader>
                <CardContent className="w-full p-0">
                  <Button variant="link" className="p-0 text-primary hover:text-[#00609D] text-right">
                    Read more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] text-white hover:opacity-90 transition-opacity rounded-lg px-8 py-3">
              See all
            </Button>
          </div>
        </div>
      </section>

      


      {/* Have Questions Section */}
      <section className="py-8 md:py-12 dark:bg-background bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-[64px] font-zolina font-bold leading-[75px] mb-8 md:mb-12 text-foreground">
            Have Questions?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto">
            Our community is here to help! Join thousands of aquarists sharing
            their knowledge and experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] text-white hover:opacity-90 transition-opacity rounded-lg px-8 py-3">
                Contact Us
              </Button>
            </Link>
            <Link to="/faq">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white text-gray-800 border-border hover:bg-gray-100 rounded-lg px-8 py-3">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

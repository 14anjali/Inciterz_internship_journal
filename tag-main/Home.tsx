import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
import { useTextGuidePublic } from "@/hooks/useTextGuidePublic";
import { useCommunityForumPublic } from "@/hooks/useCommunityForumPublic";
import { useVideoUsersSorted } from "@/hooks/useVideoUsers";
import type { CommunityForum, GetAllTextGuidesResponse, TextGuide, VideoArray, getVideoResponse } from "@/api/apiTypes";

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
  const { data: textGuidesResponse, isLoading: isLoadingTextGuides } = useTextGuidePublic(1);
  const { data: communityForumResponse, isLoading: isLoadingCommunityPosts } = useCommunityForumPublic(1);
  const { data: popularVideosResponse, isLoading: isLoadingPopularVideos } = useVideoUsersSorted(1, "views");

  const latestTextGuides: TextGuide[] = ((textGuidesResponse as GetAllTextGuidesResponse | undefined)?.data || []).slice(0, 6);
  const latestCommunityPosts: CommunityForum[] = (communityForumResponse?.data || []).slice(0, 6);
  const popularVideos: VideoArray[] = ((popularVideosResponse as getVideoResponse | undefined)?.videos || []).slice(0, 3);

  const formatShortDate = (value?: string) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const formatCompactNumber = (value: number) => {
    try {
      return new Intl.NumberFormat("en-US", { notation: "compact" }).format(value);
    } catch {
      return String(value);
    }
  };

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
        <div className="relative lg:absolute lg:bottom-0 left-0 lg:right-auto z-20 w-full lg:w-auto lg:mb-0">
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
                  {isLoadingTextGuides ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    ))
                  ) : latestTextGuides.length === 0 ? (
                    <div className="py-2">
                      <div className="text-sm text-foreground">Filter floss is still settling</div>
                      <div className="text-xs text-muted-foreground">Fresh guides will drift in soon.</div>
                    </div>
                  ) : (
                    latestTextGuides.slice(0, 3).map((guide) => (
                      <Link
                        key={guide.id}
                        className="flex flex-col text-left w-full"
                        to={`/view/text/${guide.id}`}
                      >
                        <span className="text-sm text-foreground">{guide.title}</span>
                        <span className="text-xs text-muted-foreground">{formatShortDate(guide.createdAt || guide.created_at)}</span>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Popular Videos */}
              <Card className="bg-card p-0 text-card-foreground">
                <CardHeader className="py-4 px-4 pb-2">
                  <CardTitle className="text-[15px] font-semibold text-foreground">Popular Videos</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {isLoadingPopularVideos ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    ))
                  ) : popularVideos.length === 0 ? (
                    <div className="py-2">
                      <div className="text-sm text-foreground">Reef lights are warming up</div>
                      <div className="text-xs text-muted-foreground">Top videos will surface soon.</div>
                    </div>
                  ) : (
                    popularVideos.map((video) => (
                      <Link key={video.id} to={`/view/video/${video.id}`} className="flex flex-col text-left w-full">
                        <span className="text-sm text-foreground">{video.title}</span>
                        <span className="text-xs text-muted-foreground">{formatCompactNumber(video.viewCount || 0)} views</span>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>

              {/* Community Buzz */}
              <Card className="bg-card p-0 text-card-foreground">
                <CardHeader className="py-4 px-4 pb-2">
                  <CardTitle className="text-[15px] font-semibold text-foreground">Community Buzz</CardTitle>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-3">
                  {isLoadingCommunityPosts ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-1">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    ))
                  ) : latestCommunityPosts.length === 0 ? (
                    <div className="py-2">
                      <div className="text-sm text-foreground">Bubbles are building</div>
                      <div className="text-xs text-muted-foreground">New discussions will pop up soon.</div>
                    </div>
                  ) : (
                    latestCommunityPosts.slice(0, 3).map((post) => (
                      <Link
                        key={post.id}
                        className="flex flex-col text-left w-full"
                        to={`/view/forum/${post.id}`}
                      >
                        <span className="text-sm text-foreground">{post.title}</span>
                        <span className="text-xs text-muted-foreground">{Number(post.Total_Comments || 0)} replies</span>
                      </Link>
                    ))
                  )}
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
          {!isLoadingTextGuides &&
          !isLoadingCommunityPosts &&
          latestTextGuides.length === 0 &&
          latestCommunityPosts.length === 0 ? (
            <Card className="bg-card text-card-foreground max-w-3xl mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-foreground">Tank cycling in progress</CardTitle>
                <CardDescription>
                  Fresh guides and community discussions are conditioning — coming soon.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto">
              <Card className="bg-card text-card-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground">Latest Text Guides</CardTitle>
                  <CardDescription>Newest 6 guides</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoadingTextGuides ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-16 rounded-[5px]" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-28" />
                        </div>
                      </div>
                    ))
                  ) : (
                    latestTextGuides.map((guide) => (
                      <Link
                        key={guide.id}
                        className="w-full text-left flex items-center gap-3"
                        to={`/view/text/${guide.id}`}
                      >
                        <div className="h-10 w-16 rounded-[5px] bg-muted flex-none" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground line-clamp-1">{guide.title}</div>
                          <div className="text-xs text-muted-foreground">{formatShortDate(guide.createdAt || guide.created_at)}</div>
                        </div>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card text-card-foreground">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-foreground">Latest Community Posts</CardTitle>
                  <CardDescription>Newest 6 discussions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoadingCommunityPosts ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="h-10 w-16 rounded-[5px]" />
                        <div className="flex-1 space-y-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    ))
                  ) : (
                    latestCommunityPosts.map((post) => (
                      <Link
                        key={post.id}
                        className="w-full text-left flex items-center gap-3"
                        to={`/view/forum/${post.id}`}
                      >
                        <div className="h-10 w-16 rounded-[5px] bg-muted flex-none" />
                        <div className="min-w-0">
                          <div className="text-sm font-medium text-foreground line-clamp-1">{post.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {post.Creator_Username || "unknown"} • {Number(post.Total_Comments || 0)} replies
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}
          <div className="flex justify-center mt-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/text-guides">
                <Button className="bg-gradient-to-r from-[hsl(var(--primary))] to-[#00609D] text-white hover:opacity-90 transition-opacity rounded-lg px-8 py-3">
                  See all text guides
                </Button>
              </Link>
              <Link to="/community-forum">
                <Button variant="outline" className="bg-white text-gray-800 border-border hover:bg-gray-100 rounded-lg px-8 py-3">
                  See all community posts
                </Button>
              </Link>
            </div>
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

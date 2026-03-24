import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Fish,
    Waves,
    Stethoscope,
    Carrot,
    BookOpen,
    Users,
    Wrench,
    Lightbulb,
    Bug,
    HelpCircle,
} from "lucide-react";
import alexChen from "@/assets/alexchen.webp";
import maria from "@/assets/MariaGarcia.webp";
import { useNavigate, Link } from "react-router-dom";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useState } from "react";
import { useFaq } from "@/hooks/useFaq";

// Social Media Icons
const FacebookIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

const InstagramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
);

const LinkedInIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const XIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const RedditIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
    </svg>
);

const SUBJECTS = {
    SUGGEST_GUIDE: "Suggest a Guide",
    REPORT_BUG: "Report a Bug",
    PARTNERSHIPS: "Partnerships",
    OTHER: "Other Questions",
};

const About = () => {
    const navigate = useNavigate();
    const { openRegister } = useAuthModal();
    const [subject, setSubject] = useState<string>("");
    const [customSubject, setCustomSubject] = useState<string>("");
    const { data: faqData } = useFaq(1, "");
    const aboutFaqs = faqData?.questions ?? [];

    const stripHtmlToText = (html: string): string => {
        if (!html) return "";
        const withNewlines = html.replace(/<br\s*\/?>/gi, "\n");
        const plain = withNewlines.replace(/<[^>]*>/g, "").trim();
        return plain || "";
    };

    const handleClick = () => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        if (accessToken || refreshToken) {
            navigate("/");
        } else {
            openRegister();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
    };

    const finalSubject = customSubject || subject;

    return (
        <div className="w-full">
            {/* Everything You Need to Succeed Section */}
            <section className="relative py-16 md:py-20 overflow-hidden dark:bg-background bg-background">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-zolina font-bold mb-6 text-foreground">
                                Everything You Need to Succeed
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                                The Aqua Guide provides clear, practical resources to help you
                                confidently care for your aquarium, whether you are just starting
                                out or refining advanced setups.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Fish className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Species Spotlights
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Confidently choose the right fish with our guides on species'
                                        needs, temperament, and compatibility.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Waves className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Tank Setup & Water
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Master the nitrogen cycle and maintain ideal water parameters
                                        with our step-by-step instructions.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Stethoscope className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Disease & Treatment
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Learn to identify, prevent, and effectively treat common fish
                                        diseases to keep your aquatic friends healthy.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Carrot className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Nutrition Guidelines
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Discover the best diets and feeding schedules to support vibrant
                                        and healthy fish.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Wrench className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Troubleshooting
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Solve common problems like algae outbreaks, cloudy water, and
                                        equipment issues with proven solutions.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="dark:bg-card rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] transition-shadow duration-300 text-foreground">
                                <CardContent className="p-6 text-center">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] flex items-center justify-center">
                                            <Users className="h-8 w-8 text-primary-foreground" />
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-foreground">
                                        Community & Support
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Connect with fellow fish keepers to share experiences, ask
                                        questions, and learn together.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Aquarists Section */}
            <section className="relative py-16 md:py-20 overflow-hidden">
                {/* Gradient Background - Dark blue (mixed with hsl(var(--primary)) and #00609D) to black */}
                <div
                    className="absolute inset-0 bg-gradient-to-b from-muted to-background dark:from-[#002244] dark:via-[#001122] dark:to-black"
                ></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12 md:mb-16">
                            <h2 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground">
                                Meet Our Aquarists
                            </h2>
                            <p className="text-lg sm:text-xl dark:text-white text-muted-foreground max-w-2xl mx-auto">
                                The Aqua Guide is powered by a team of lifelong hobbyists who have
                                turned their passion into a mission to help others.
                            </p>
                        </div>

                        {/* Alex Chen */}
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
                            <div className="w-full md:w-1/2">
                                <img
                                    src={alexChen}
                                    alt="Alex Chen"
                                    className="w-full max-w-md mx-auto rounded-xl object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 text-foreground">
                                <h3 className="text-3xl font-bold mb-2">Alex Chen</h3>
                                <p className="text-lg mb-4 text-muted-foreground">
                                    Founder & Freshwater Expert
                                </p>
                                <div className="flex gap-3 mb-6">
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <FacebookIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <InstagramIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <LinkedInIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <XIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <RedditIcon />
                                    </a>
                                </div>
                                <div className="relative mt-6">
                                    <div className="flex items-start">
                                        <span className="text-7xl md:text-8xl font-serif text-[hsl(var(--primary))] leading-none font-bold flex-shrink-0 mr-4" style={{ lineHeight: '0.75', paddingTop: '0.25rem' }}>"</span>
                                        <p className="text-base md:text-lg text-foreground leading-relaxed flex-1" style={{ paddingTop: '0.5rem' }}>

                                            <span className="inline-block">As a lifelong fishkeeping enthusiast, I founded The Aqua Guide
                                                to make expert knowledge accessible to everyone. Whether you're
                                                setting up your first tank or troubleshooting a complex issue,
                                                we're here to help you succeed.</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Maria Garcia */}
                        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                            <div className="w-full md:w-1/2">
                                <img
                                    src={maria}
                                    alt="Maria Garcia"
                                    className="w-full max-w-md mx-auto rounded-xl object-cover"
                                />
                            </div>
                            <div className="w-full md:w-1/2 text-foreground">
                                <h3 className="text-3xl font-bold mb-2">Maria Garcia</h3>
                                <p className="text-lg mb-4 text-muted-foreground">
                                    Saltwater & Coral Specialist
                                </p>
                                <div className="flex gap-3 mb-6">
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <FacebookIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <InstagramIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <LinkedInIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <XIcon />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-foreground hover:opacity-90 transition-opacity"
                                    >
                                        <RedditIcon />
                                    </a>
                                </div>
                                <div className="relative mt-6">
                                    <div className="flex items-start">
                                        <span className="text-7xl md:text-8xl font-serif text-[hsl(var(--primary))] leading-none font-bold flex-shrink-0 mr-4" style={{ lineHeight: '0.75', paddingTop: '0.25rem' }}>"</span>
                                        <p className="text-base md:text-lg text-foreground leading-relaxed flex-1" style={{ paddingTop: '0.5rem' }}>
                                            <span className="inline-block">

                                                Specializing in saltwater aquariums and coral care, I focus on
                                                breaking down complex marine concepts into practical, actionable
                                                advice. My goal is to help you create and maintain a thriving
                                                marine ecosystem.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Drop Us a Line Section */}
            <section className="dark:bg-background bg-background py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground">
                                Drop Us a Line
                            </h2>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                                Whether you have a question about the site, a brilliant idea for a
                                guide, or just want to share a fish tale, we're always here to
                                listen. Your currents of thought help shape our community ocean.
                            </p>
                        </div>

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold mb-2 text-foreground">
                                How Can We Help?
                            </h3>
                            <p className="text-muted-foreground">
                                For the fastest response to fishkeeping questions, we recommend
                                posting on our{" "}
                                <Link to="/community-forum" className="text-[hsl(var(--primary))] underline">
                                    Community Forum
                                </Link>
                                .
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            <Card
                                onClick={() => setSubject(SUBJECTS.SUGGEST_GUIDE)}
                                className={`cursor-pointer hover:shadow-lg transition-all ${subject === SUBJECTS.SUGGEST_GUIDE
                                    ? "border-2 border-[hsl(var(--primary))]"
                                    : ""
                                    }`}
                            >
                                <CardContent className="p-6 relative">
                                    <Lightbulb className="h-10 w-10 text-[hsl(var(--primary))] absolute top-4 right-4" />
                                    <h3 className="text-lg font-bold mb-2 text-foreground pr-16">
                                        {SUBJECTS.SUGGEST_GUIDE}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Have an idea for a video or an article? We'd love to hear it.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card
                                onClick={() => setSubject(SUBJECTS.REPORT_BUG)}
                                className={`cursor-pointer hover:shadow-lg transition-all ${subject === SUBJECTS.REPORT_BUG
                                    ? "border-2 border-[hsl(var(--primary))]"
                                    : ""
                                    }`}
                            >
                                <CardContent className="p-6 relative">
                                    <Bug className="h-10 w-10 text-[hsl(var(--primary))] absolute top-4 right-4" />
                                    <h3 className="text-lg font-bold mb-2 text-foreground pr-16">
                                        {SUBJECTS.REPORT_BUG}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Found a hitchhiker snail (a bug) on the site? Let us know!
                                    </p>
                                </CardContent>
                            </Card>

                            <Card
                                onClick={() => setSubject(SUBJECTS.PARTNERSHIPS)}
                                className={`cursor-pointer hover:shadow-lg transition-all ${subject === SUBJECTS.PARTNERSHIPS
                                    ? "border-2 border-[hsl(var(--primary))]"
                                    : ""
                                    }`}
                            >
                                <CardContent className="p-6 relative">
                                    <Users className="h-10 w-10 text-[hsl(var(--primary))] absolute top-4 right-4" />
                                    <h3 className="text-lg font-bold mb-2 text-foreground pr-16">
                                        {SUBJECTS.PARTNERSHIPS}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Want to swim with our school? Let's talk collaboration.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card
                                onClick={() => setSubject(SUBJECTS.OTHER)}
                                className={`cursor-pointer hover:shadow-lg transition-all ${subject === SUBJECTS.OTHER
                                    ? "border-2 border-[hsl(var(--primary))]"
                                    : ""
                                    }`}
                            >
                                <CardContent className="p-6 relative">
                                    <HelpCircle className="h-10 w-10 text-[hsl(var(--primary))] absolute top-4 right-4" />
                                    <h3 className="text-lg font-bold mb-2 text-foreground pr-16">
                                        {SUBJECTS.OTHER}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        For anything else that doesn't fit the categories above.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Send us a Message Form */}
                        <Card className="dark:bg-card shadow-lg text-foreground">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-2 text-foreground">
                                    Send us a Message
                                </h3>
                                <p className="text-muted-foreground mb-6">
                                    Fill out the form below and we'll get back to you as soon as
                                    possible.
                                </p>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-foreground">
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                placeholder="Your name"
                                                className="bg-background border-border rounded-lg h-12"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-foreground">
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="name@email.com"
                                                className="bg-background border-border rounded-lg h-12"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-foreground">
                                            Subject
                                        </Label>
                                        <Select value={subject} onValueChange={setSubject}>
                                            <SelectTrigger
                                                id="subject"
                                                className="bg-background border-border rounded-lg h-12"
                                            >
                                                <SelectValue placeholder="Select a subject" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value={SUBJECTS.SUGGEST_GUIDE}>
                                                    {SUBJECTS.SUGGEST_GUIDE}
                                                </SelectItem>
                                                <SelectItem value={SUBJECTS.REPORT_BUG}>
                                                    {SUBJECTS.REPORT_BUG}
                                                </SelectItem>
                                                <SelectItem value={SUBJECTS.PARTNERSHIPS}>
                                                    {SUBJECTS.PARTNERSHIPS}
                                                </SelectItem>
                                                <SelectItem value={SUBJECTS.OTHER}>
                                                    {SUBJECTS.OTHER}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {subject === SUBJECTS.OTHER && (
                                            <Input
                                                placeholder="Enter your custom subject"
                                                value={customSubject}
                                                onChange={(e) => setCustomSubject(e.target.value)}
                                                className="mt-2 bg-background border-border rounded-lg h-12"
                                            />
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-foreground">
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us how we can help you..."
                                            className="min-h-[150px] bg-background border-border rounded-lg"
                                            required
                                        />
                                    </div>

                                    <div className="flex justify-center pt-4">
                                        <Button
                                            type="submit"
                                            className="bg-gradient-to-r from-[hsl(var(--primary))] to-primary/80 hover:from-primary/80 hover:to-[hsl(var(--primary))] text-white rounded-lg px-8 py-3 font-semibold"
                                        >
                                            Send message
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Our Unwavering Commitment Section */}
            <section className="dark:bg-background bg-background py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl sm:text-5xl font-zolina font-bold mb-6 text-foreground">
                            Our Unwavering Commitment
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                            At The Aqua Guide, we are committed to providing accurate,
                            up-to-date, and practical advice that makes fish keeping enjoyable
                            and successful. Our content is crafted by experienced aquarists and
                            reviewed for accuracy, ensuring you get the best guidance available.
                        </p>
                        <Button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-[hsl(var(--primary))] to-primary/80 hover:from-primary/80 hover:to-[hsl(var(--primary))] text-white rounded-full px-8 py-3 font-semibold shadow-lg"
                        >
                            Start Your Journey
                        </Button>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="dark:bg-background bg-background py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 md:mb-12">
                            <h2 className="text-4xl sm:text-5xl font-zolina font-bold mb-4 text-foreground">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Find answers to common questions about fishkeeping and our platform
                            </p>
                        </div>

                        <div className="bg-card rounded-lg overflow-hidden shadow-lg p-6">
                            {aboutFaqs.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">No content available.</p>
                            ) : (
                                <Accordion type="single" collapsible className="w-full">
                                    {aboutFaqs.map((faq, index) => {
                                        const answerText = stripHtmlToText(faq.answers || "");
                                        return (
                                            <AccordionItem
                                                key={faq.id ?? index}
                                                value={`item-${faq.id ?? index}`}
                                                className="border-0"
                                            >
                                                <AccordionTrigger className="text-left text-sm sm:text-base px-6 py-4 hover:no-underline bg-background data-[state=open]:bg-card data-[state=open]:rounded-t-lg border-b border-border [&:last-child]:border-b-0">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-sm sm:text-base py-4 bg-primary/10 dark:bg-muted rounded-b-lg border-l-4 border-[hsl(var(--primary))] text-foreground dark:text-foreground pl-6 pr-6 whitespace-pre-line">
                                                    {answerText || "No answer available."}
                                                </AccordionContent>
                                            </AccordionItem>
                                        );
                                    })}
                                </Accordion>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Still Have Questions Section */}
            <section className="dark:bg-background bg-background py-16 md:py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="p-6 sm:p-8 glass-effect rounded-lg">
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
                                Still Have Questions?
                            </h2>
                            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                                Can't find what you're looking for? Our community is here to help!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/community-forum" className="w-full sm:w-auto">
                                    <Button
                                        variant="ocean"
                                        className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--primary))] to-primary/80 hover:from-primary/80 hover:to-[hsl(var(--primary))] text-white"
                                    >
                                        Ask the Community
                                    </Button>
                                </Link>
                                <Link to="/contact" className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full sm:w-auto border-border text-muted-foreground hover:bg-gray-50"
                                    >
                                        Contact Support
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
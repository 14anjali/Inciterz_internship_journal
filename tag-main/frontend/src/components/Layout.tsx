import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import RightNavSidebar from "./RightNavSidebar";
import Footer from "./Footer";
import SupportWidget from "./SupportWidget";
import AdSlot from "./AdSlot";
import { useAdsVisibility } from "@/context/AdsVisibilityContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { adsVisible } = useAdsVisibility();
  const location = useLocation();
  const contentRef = useRef<HTMLElement>(null);
  const [sidebarAdsVisible, setSidebarAdsVisible] = useState(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSidebarAdsVisible(entry.isIntersecting),
      {
        rootMargin: "-80px 0px -80px 0px",
        threshold: 0,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {adsVisible && (
        <AdSlot location="after_header" className="container mx-auto px-4 py-2 w-full" />
      )}
      <main ref={contentRef} className="flex-1 pt-[72px] relative xl:pr-14">
        <div className="min-w-0">{children}</div>
        {adsVisible && sidebarAdsVisible && location.pathname !== "/community-chat" && (
          <>
            <div className="absolute left-0 top-[50%] translate-y-[-50%] w-[250px] hidden xl:block z-10 pointer-events-none">
               <div className="pointer-events-auto">
                 <AdSlot
                   location="sidebar_left"
                   className="w-full"
                 />
               </div>
             </div>
             <div className="absolute right-14 top-[50%] translate-y-[-50%] w-[calc(280px-3.5rem)] hidden xl:block z-10 pointer-events-none">
               <div className="pointer-events-auto">
                 <AdSlot
                   location="sidebar_right"
                   className="w-full"
                 />
               </div>
             </div>
          </>
        )}
      </main>
      <RightNavSidebar />
      {adsVisible && (
        <AdSlot location="before_footer" className="container mx-auto px-4 py-4 w-full border-t border-border" />
      )}
      <Footer />
      <SupportWidget />
    </div>
  );
};

export default Layout;

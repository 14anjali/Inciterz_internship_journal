import { useEffect, useState } from "react";
import { Users, Video, BookOpen, Fish, Sprout, MessageCircle } from "lucide-react";
import { socket } from "@/lib/socket";
import axios from "axios";

interface StatsData {
  users: number;
  videoGuides: number;
  textGuides: number;
  species: number;
  plants: number;
  forumPosts: number;
}

export const StatsOverlay = ({ className }: { className?: string }) => {
  const [stats, setStats] = useState<StatsData>({
    users: 0,
    videoGuides: 0,
    textGuides: 0,
    species: 0,
    plants: 0,
    forumPosts: 0,
  });

  useEffect(() => {
    const fetchCurrentStats = async () => {
      try {
        const res = await axios.get("https://theaquaguide.com/api/stats");
        // ONLY update if we actually got data
        if (res.data && typeof res.data.users === 'number') {
           setStats({
            ...res.data,
            plants: res.data.plants || 0,
            forumPosts: res.data.forumPosts || 0
          });
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };

    fetchCurrentStats();

    const handleStatsUpdate = (newStats: StatsData) => {
      if (newStats && typeof newStats.users === 'number') {
        setStats(prev => ({
          ...prev,
          ...newStats,
          plants: newStats.plants !== undefined ? newStats.plants : prev.plants,
          forumPosts: newStats.forumPosts !== undefined ? newStats.forumPosts : prev.forumPosts
        }));
      }
    };

    socket.on("statsUpdate", handleStatsUpdate);
    socket.on("reconnect", fetchCurrentStats);

    return () => {
      socket.off("statsUpdate", handleStatsUpdate);
      socket.off("reconnect", fetchCurrentStats);
    };
  }, []);

  // Card style with #2C354B background
  const cardStyle = "dark:bg-[#2C354B] bg-white rounded-lg shadow-md p-4 flex flex-col items-center justify-center dark:text-white text-foreground";

  const StatCard = ({ icon: Icon, value, label, className }: any) => (
    <div className={`${cardStyle} ${className || ''} min-w-[110px] min-h-[120px]`}>
        <Icon className="h-8 w-8 text-primary mb-2" />
        <span className="text-2xl font-bold leading-none mb-1">
          {value}
        </span>
        <span className="text-sm opacity-80 font-medium">
          {label}
        </span>
    </div>
  );

  return (
    <div className={`
      md:dark:bg-[#151F37]/60 md:bg-background/60 md:dark:bg-card/60 md:backdrop-blur-xl 
      md:rounded-tr-[40px] md:border-t-4 md:border-r-4 md:dark:border-white/30 md:border-black/10 md:shadow-2xl md:p-6
      w-full md:w-auto bg-black/60 backdrop-blur-md p-2
      ${className || ''}
    `} style={{ backdropFilter: 'blur(20px) saturate(180%)' }}>
      <h3 className="text-lg font-semibold mb-4 dark:text-white text-foreground text-center hidden md:block">
        Live Community Stats
      </h3>
      
      {/* Mobile View: Grid of 3 columns (2 rows) */}
      <div className="grid grid-cols-3 gap-2 md:hidden w-full">
        <div className="flex flex-col items-center justify-center p-1">
          <Users className="h-6 w-6 text-primary mb-0.5" />
          <span className="text-xs font-bold text-white leading-none">{stats.users}</span>
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Users</span>          
        </div>
        <div className="flex flex-col items-center justify-center p-1">                    
          <Video className="h-6 w-6 text-primary mb-0.5" />
          <span className="text-xs font-bold text-white leading-none">{stats.videoGuides}</span>
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Videos</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1">          
          <BookOpen className="h-6 w-6 text-primary mb-0.5" />
          <span className="text-xs font-bold text-white leading-none">{stats.textGuides}</span>          
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Guides</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1">                  
          <Fish className="h-6 w-6 text-primary mb-0.5" />
          <span className="text-xs font-bold text-white leading-none">{stats.species}</span>
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Species</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1">
          <Sprout className="h-6 w-6 text-primary mb-0.5" />          
          <span className="text-xs font-bold text-white leading-none">{stats.plants}</span>
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Plants</span>
        </div>
        <div className="flex flex-col items-center justify-center p-1">
          <MessageCircle className="h-6 w-6 text-primary mb-0.5" />          
          <span className="text-xs font-bold text-white leading-none">{stats.forumPosts}</span>
          <span className="text-[9px] text-white/80 font-medium text-center leading-none mt-0.5">Forum</span>
        </div>
      </div>

      {/* Desktop View: Grid 3x2 */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        <StatCard icon={Users} value={stats.users} label="Users" />
        <StatCard icon={Video} value={stats.videoGuides} label="Videos" />
        <StatCard icon={BookOpen} value={stats.textGuides} label="Guides" />
        <StatCard icon={Fish} value={stats.species} label="Species" />
        <StatCard icon={Sprout} value={stats.plants} label="Plants" />
        <StatCard icon={MessageCircle} value={stats.forumPosts} label="Forum" />
      </div>
    </div>
  );
};

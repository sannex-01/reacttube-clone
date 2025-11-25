import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { CommentsSection } from "@/components/CommentsSection";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  Maximize,
  Settings,
  Captions,
} from "lucide-react";
import { cn } from "@/lib/utils";

const suggestedVideos = [
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=240&h=135&fit=crop",
    title: "Learn Web Development in 2024: Complete Guide for Beginners",
    channel: "Code Academy",
    views: "1.2M views",
    timestamp: "1 week ago",
    duration: "45:05",
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=240&h=135&fit=crop",
    title: "Epic Music Mix 2024 | Best Gaming Music",
    channel: "Music Vibes",
    views: "3.4M views",
    timestamp: "2 weeks ago",
    duration: "1:32:45",
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=240&h=135&fit=crop",
    title: "Delicious Recipes: Perfect Pasta from Scratch",
    channel: "Chef's Kitchen",
    views: "567K views",
    timestamp: "5 days ago",
    duration: "15:24",
  },
  {
    id: "5",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=240&h=135&fit=crop",
    title: "Productivity Tips: Get More Done in Less Time",
    channel: "Success Mindset",
    views: "890K views",
    timestamp: "1 week ago",
    duration: "22:18",
  },
];

const Watch = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuClick={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <AppSidebar collapsed={sidebarCollapsed} />

      <main
        className={cn(
          "pt-14 transition-all duration-300",
          sidebarCollapsed ? "md:pl-16" : "pl-0 md:pl-64"
        )}
      >
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Video player and info */}
          <div className="flex-1">
            {/* Video player */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4 group">
              <img
                src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=1280&h=720&fit=crop"
                alt="Video"
                className="w-full h-full object-cover"
              />
              
              {/* Video controls overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                  {/* Progress bar */}
                  <div className="h-1 bg-muted/30 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3" />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      <span className="text-sm">0:01 / 2:11:58</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Captions className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Settings className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Maximize className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Video title */}
            <h1 className="text-xl font-semibold mb-3">
              Amazing Travel Vlog: Exploring Beautiful Destinations Around the World
            </h1>

            {/* Channel info and actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="font-semibold">T</span>
                </div>
                <div>
                  <div className="font-semibold text-sm">Travel Stories</div>
                  <div className="text-xs text-muted-foreground">1.73M subscribers</div>
                </div>
                <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  Subscribe
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center bg-secondary rounded-full">
                  <Button variant="ghost" className="rounded-l-full hover:bg-accent">
                    <ThumbsUp className="w-5 h-5 mr-2" />
                    14K
                  </Button>
                  <div className="w-px h-6 bg-border" />
                  <Button variant="ghost" className="rounded-r-full hover:bg-accent">
                    <ThumbsDown className="w-5 h-5" />
                  </Button>
                </div>
                
                <Button variant="secondary" className="rounded-full">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
                
                <Button variant="secondary" className="rounded-full">
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </Button>
                
                <Button variant="secondary" size="icon" className="rounded-full">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Video description */}
            <div className="bg-secondary rounded-xl p-4">
              <div className="text-sm font-semibold mb-2">
                794,863 views • 3 days ago
              </div>
              <p className="text-sm text-muted-foreground">
                Join us on an incredible journey as we explore some of the most beautiful destinations 
                around the world. From stunning landscapes to vibrant cities, this travel vlog captures 
                the essence of adventure and discovery. Don't forget to like and subscribe for more 
                amazing content!
              </p>
            </div>

            {/* Comments section */}
            <CommentsSection />
          </div>

          {/* Suggested videos sidebar */}
          <div className="lg:w-96">
            <div className="space-y-2">
              {suggestedVideos.map((video) => (
                <Link
                  key={video.id}
                  to={`/watch?v=${video.id}`}
                  className="flex gap-2 p-2 rounded-lg hover:bg-accent transition-colors group"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-40 aspect-video rounded-lg object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-semibold px-1 py-0.5 rounded">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium line-clamp-2 mb-1">
                      {video.title}
                    </h3>
                    <div className="text-xs text-muted-foreground">
                      <div>{video.channel}</div>
                      <div>{video.views} • {video.timestamp}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watch;

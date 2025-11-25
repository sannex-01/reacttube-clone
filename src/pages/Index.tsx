import { useState } from "react";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { VideoCard } from "@/components/VideoCard";
import { cn } from "@/lib/utils";

// Sample video data
const videos = [
  {
    id: "1",
    thumbnail: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=480&h=270&fit=crop",
    title: "Amazing Travel Vlog: Exploring Beautiful Destinations Around the World",
    channel: "Travel Stories",
    views: "794K views",
    timestamp: "3 days ago",
    duration: "2:11:59",
    verified: true,
  },
  {
    id: "2",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=480&h=270&fit=crop",
    title: "Learn Web Development in 2024: Complete Guide for Beginners",
    channel: "Code Academy",
    views: "1.2M views",
    timestamp: "1 week ago",
    duration: "45:05",
    verified: true,
  },
  {
    id: "3",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=480&h=270&fit=crop",
    title: "Epic Music Mix 2024 | Best Gaming Music & Electronic Mix",
    channel: "Music Vibes",
    views: "3.4M views",
    timestamp: "2 weeks ago",
    duration: "1:32:45",
    verified: false,
  },
  {
    id: "4",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=480&h=270&fit=crop",
    title: "Delicious Recipes: How to Cook Perfect Pasta from Scratch",
    channel: "Chef's Kitchen",
    views: "567K views",
    timestamp: "5 days ago",
    duration: "15:24",
    verified: true,
  },
  {
    id: "5",
    thumbnail: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=480&h=270&fit=crop",
    title: "Productivity Tips: How to Get More Done in Less Time",
    channel: "Success Mindset",
    views: "890K views",
    timestamp: "1 week ago",
    duration: "22:18",
    verified: true,
  },
  {
    id: "6",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=480&h=270&fit=crop",
    title: "Tech Review: Latest Gadgets and Innovation in 2024",
    channel: "Tech Today",
    views: "2.1M views",
    timestamp: "3 days ago",
    duration: "18:42",
    verified: true,
  },
  {
    id: "7",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=480&h=270&fit=crop",
    title: "Fitness Journey: Transform Your Body in 90 Days",
    channel: "Fit Life",
    views: "1.5M views",
    timestamp: "2 weeks ago",
    duration: "25:36",
    verified: false,
  },
  {
    id: "8",
    thumbnail: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=480&h=270&fit=crop",
    title: "DIY Home Improvement: Renovation Ideas on a Budget",
    channel: "Home Projects",
    views: "654K views",
    timestamp: "4 days ago",
    duration: "32:15",
    verified: true,
  },
  {
    id: "9",
    thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=480&h=270&fit=crop",
    title: "Nature Documentary: Wildlife in Their Natural Habitat",
    channel: "Nature Plus",
    views: "4.2M views",
    timestamp: "1 month ago",
    duration: "58:29",
    verified: true,
  },
  {
    id: "10",
    thumbnail: "https://images.unsplash.com/photo-1615220368412-a33d97748ace?w=480&h=270&fit=crop",
    title: "Comedy Sketch: Hilarious Moments That Will Make You Laugh",
    channel: "Laugh Out Loud",
    views: "789K views",
    timestamp: "6 days ago",
    duration: "12:08",
    verified: false,
  },
  {
    id: "11",
    thumbnail: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=480&h=270&fit=crop",
    title: "Business Tips: How to Start Your Own Successful Company",
    channel: "Entrepreneur Hub",
    views: "1.8M views",
    timestamp: "1 week ago",
    duration: "36:54",
    verified: true,
  },
  {
    id: "12",
    thumbnail: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=480&h=270&fit=crop",
    title: "Art Tutorial: Painting Techniques for Beginners",
    channel: "Creative Arts",
    views: "432K views",
    timestamp: "5 days ago",
    duration: "28:17",
    verified: false,
  },
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

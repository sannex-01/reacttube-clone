import { Home, TrendingUp, Youtube, History, PlaySquare, Clock, ThumbsUp, Download, List, Music } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  collapsed: boolean;
}

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Shorts", url: "/shorts", icon: TrendingUp },
  { title: "Subscriptions", url: "/subscriptions", icon: Youtube },
  { title: "YouTube Music", url: "/music", icon: Music },
];

const youSection = [
  { title: "History", url: "/history", icon: History },
  { title: "Playlists", url: "/playlists", icon: List },
  { title: "Your videos", url: "/your-videos", icon: PlaySquare },
  { title: "Watch later", url: "/watch-later", icon: Clock },
  { title: "Liked videos", url: "/liked", icon: ThumbsUp },
  { title: "Downloads", url: "/downloads", icon: Download },
];

export function AppSidebar({ collapsed }: AppSidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-14 h-[calc(100vh-3.5rem)] bg-sidebar border-r border-border overflow-y-auto transition-all duration-300 z-40",
        collapsed ? "w-0 md:w-16" : "w-64"
      )}
    >
      <nav className="py-2">
        {/* Main menu */}
        <div className="mb-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.title}
              to={item.url}
              className={cn(
                "flex items-center gap-6 px-3 py-2.5 mx-2 rounded-lg transition-colors hover:bg-accent",
                isActive(item.url) && "bg-accent"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="text-sm font-medium">{item.title}</span>}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        {!collapsed && <div className="h-px bg-border my-2" />}

        {/* You section */}
        {!collapsed && (
          <div>
            <div className="px-5 py-2">
              <h3 className="text-sm font-semibold">You</h3>
            </div>
            {youSection.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={cn(
                  "flex items-center gap-6 px-3 py-2.5 mx-2 rounded-lg transition-colors hover:bg-accent",
                  isActive(item.url) && "bg-accent"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.title}</span>
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </aside>
  );
}

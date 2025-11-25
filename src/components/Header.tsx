import { Menu, Search, Mic, Plus, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-background border-b border-border flex items-center justify-between px-4 z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-accent"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
            <div className="w-5 h-5 bg-white" style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
          </div>
          <span className="text-xl font-semibold">Premium</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-4 flex items-center gap-2">
        <div className="flex-1 flex items-center">
          <Input
            type="text"
            placeholder="Search"
            className="rounded-r-none border-r-0 bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button variant="secondary" className="rounded-l-none px-6 border border-l-0 border-border">
            <Search className="w-5 h-5" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
          <Mic className="w-5 h-5" />
        </Button>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hover:bg-accent">
          <Plus className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}

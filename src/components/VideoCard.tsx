import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  views: string;
  timestamp: string;
  duration: string;
  verified?: boolean;
}

export function VideoCard({
  id,
  thumbnail,
  title,
  channel,
  views,
  timestamp,
  duration,
  verified = false,
}: VideoCardProps) {
  return (
    <div className="flex flex-col gap-3 cursor-pointer group">
      <Link to={`/watch?v=${id}`} className="relative">
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
            {duration}
          </div>
        </div>
      </Link>
      
      <div className="flex gap-3">
        <div className="w-9 h-9 rounded-full bg-muted flex-shrink-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{channel[0]}</span>
        </div>
        
        <div className="flex-1 min-w-0">
          <Link to={`/watch?v=${id}`}>
            <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-foreground/80">
              {title}
            </h3>
          </Link>
          <div className="text-xs text-muted-foreground space-y-0.5">
            <div className="flex items-center gap-1">
              <span>{channel}</span>
              {verified && (
                <svg className="w-3 h-3 fill-muted-foreground" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM9.8 17.3l-4.2-4.1L7 11.8l2.8 2.7L17 7.4l1.4 1.4-8.6 8.5z" />
                </svg>
              )}
            </div>
            <div>
              {views} • {timestamp}
            </div>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" className="w-8 h-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

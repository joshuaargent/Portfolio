"use client";

import { useState } from "react";
import Image from "next/image";
import { cn, getYouTubeThumbnail } from "@/lib/utils";
import { Play } from "lucide-react";

// ============================================
// Types
// ============================================

export interface VideoEmbedProps {
  videoId: string;
  title: string;
  className?: string;
}

// ============================================
// Component
// ============================================

export function VideoEmbed({ videoId, title, className }: VideoEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video rounded-xl overflow-hidden bg-bg-secondary",
        className,
      )}
    >
      {!isLoaded ? (
        <button
          onClick={() => setIsLoaded(true)}
          className="absolute inset-0 w-full h-full group"
          aria-label={`Play ${title}`}
        >
          <Image
            src={getYouTubeThumbnail(videoId, "maxres")}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="p-4 rounded-full bg-white/90 text-accent group-hover:scale-110 transition-transform">
              <Play className="h-8 w-8 fill-current" />
            </div>
          </div>
        </button>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      )}
    </div>
  );
}

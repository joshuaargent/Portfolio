import { VideoCard } from "./VideoCard";
import { Video } from "@/types";

// ============================================
// Types
// ============================================

export interface VideoGridProps {
  videos: Video[];
  columns?: 2 | 3 | 4;
  showDescription?: boolean;
  emptyMessage?: string;
}

// ============================================
// Component
// ============================================

export function VideoGrid({
  videos,
  columns = 3,
  showDescription = false,
  emptyMessage = "No videos found.",
}: VideoGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          showDescription={showDescription}
        />
      ))}
    </div>
  );
}

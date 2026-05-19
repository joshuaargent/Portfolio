'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { formatDate, getYouTubeThumbnail } from '@/lib/utils';
import { Play, Clock, Zap, Eye } from 'lucide-react';
import Image from 'next/image';
import { Video, RunLog } from '@/types';

// ============================================
// Types
// ============================================

// Video paired with run data from Strava
export interface RunningVideoWithRun {
  video: Video;
  run?: RunLog;
}

// ============================================
// Component
// ============================================

export function RunningVideoCard({ video, run }: RunningVideoWithRun) {
  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link
        href={`https://youtube.com/shorts/${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <RunningVideoContent video={video} run={run} />
      </Link>
    </Card>
  );
}

// ============================================
// Content
// ============================================

interface RunningVideoContentProps {
  video: Video;
  run?: RunLog;
}

function RunningVideoContent({ video, run }: RunningVideoContentProps) {
  return (
    <>
      {/* Thumbnail */}
      <div className="bg-bg-secondary relative aspect-video">
        <Image
          src={getYouTubeThumbnail(video.youtubeId)}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
          <div className="text-accent rounded-full bg-white/90 p-3 transition-transform group-hover:scale-110">
            <Play className="h-5 w-5 fill-current" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-text-primary text-sm font-medium line-clamp-2">
          {video.title}
        </div>

        {/* Run stats if available */}
        {run && (
          <div className="text-text-muted mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {Math.floor(run.duration / 60)} min
            </span>
            <span className="flex items-center gap-1">
              <Zap className="h-3.5 w-3.5" />
              {run.pace} /km
            </span>
          </div>
        )}

        {/* View count */}
        {video.viewCount && (
          <div className="text-text-muted mt-2 flex items-center gap-1 text-sm">
            <Eye className="h-3.5 w-3.5" />
            <span>{video.viewCount.toLocaleString()} views</span>
          </div>
        )}
      </div>
    </>
  );
}
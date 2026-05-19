import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { formatDate, getYouTubeThumbnail, decodeHtmlEntities } from '@/lib/utils';
import { Play, Clock, Zap, Eye } from 'lucide-react';
import Image from 'next/image';
import { RunLog, Video } from '@/types';

// ============================================
// Types
// ============================================

export interface RunShortCardProps {
  run: RunLog;
  video?: Video;
}

// ============================================
// Component
// ============================================

export function RunShortCard({ run, video }: RunShortCardProps) {
  const videoId = video?.youtubeId;
  
  return (
    <Card padding="none" hover className="group overflow-hidden">
      {videoId ? (
        <Link
          href={`https://youtube.com/shorts/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RunShortContent run={run} video={video} />
        </Link>
      ) : (
        <RunShortContent run={run} video={video} />
      )}
    </Card>
  );
}

// ============================================
// Run Short Content
// ============================================

interface RunShortContentProps {
  run: RunLog;
  video?: Video;
}

function RunShortContent({ run, video }: RunShortContentProps) {
  const videoId = video?.youtubeId;
  
  return (
    <>
      {/* Thumbnail or Placeholder */}
      <div className="bg-bg-secondary relative aspect-video">
        {videoId ? (
          <>
            <Image
              src={getYouTubeThumbnail(videoId)}
              alt={video?.title || `Run on ${run.date}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <div className="text-accent rounded-full bg-white/90 p-3 transition-transform group-hover:scale-110">
                <Play className="h-5 w-5 fill-current" />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-text-primary text-3xl font-bold">{run.distance}km</div>
              <div className="text-text-muted text-sm">{formatDate(run.date, 'MMM d')}</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="text-text-primary text-sm font-medium">
          {video ? decodeHtmlEntities(video.title) : formatDate(run.date, 'EEEE, MMM d')}
        </div>

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

        {/* View count if video available */}
        {video?.viewCount && (
          <div className="text-text-muted mt-2 flex items-center gap-1 text-sm">
            <Eye className="h-3.5 w-3.5" />
            <span>{video.viewCount.toLocaleString()} views</span>
          </div>
        )}

        {run.notes && <p className="text-text-secondary mt-3 line-clamp-2 text-sm">{run.notes}</p>}
      </div>
    </>
  );
}

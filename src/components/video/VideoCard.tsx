import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime, getYouTubeThumbnail, decodeHtmlEntities } from '@/lib/utils';
import { Play, Clock } from 'lucide-react';
import { Video } from '@/types';

// ============================================
// Types
// ============================================

export interface VideoCardProps {
  video: Video;
  showDescription?: boolean;
}

// ============================================
// Component
// ============================================

export function VideoCard({ video, showDescription = false }: VideoCardProps) {
  const typeColors = {
    'long-form': 'default',
    short: 'accent',
    'running-short': 'health',
  } as const;

  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link
        href={`https://youtube.com/watch?v=${video.youtubeId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={getYouTubeThumbnail(video.youtubeId, 'high')}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
            <div className="text-accent rounded-full bg-white/90 p-3 transition-transform group-hover:scale-110">
              <Play className="h-6 w-6 fill-current" />
            </div>
          </div>
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
            <Clock className="h-3 w-3" />
            {video.duration}
          </div>
          <div className="absolute top-2 left-2">
            <Badge variant={typeColors[video.type]}>
              {video.type === 'running-short' ? 'Run' : video.type === 'short' ? 'Short' : 'Long'}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-text-primary group-hover:text-accent line-clamp-2 font-semibold transition-colors">
            {decodeHtmlEntities(video.title)}
          </h3>
          {showDescription && video.description && (
            <p className="text-text-secondary mt-2 line-clamp-2 text-sm">{decodeHtmlEntities(video.description)}</p>
          )}
          <div className="text-text-muted mt-3 flex items-center gap-2 text-xs">
            <span>{formatRelativeTime(video.publishedAt)}</span>
            {video.viewCount && (
              <>
                <span>•</span>
                <span>{video.viewCount.toLocaleString()} views</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate, getYouTubeThumbnail } from '@/lib/utils';
import { Play, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import { RunLog } from '@/types';

// ============================================
// Types
// ============================================

export interface RunShortCardProps {
  run: RunLog;
  videoId?: string;
}

// ============================================
// Component
// ============================================

export function RunShortCard({ run, videoId }: RunShortCardProps) {
  const feelingColors = {
    great: 'health',
    good: 'accent',
    tired: 'performance',
    rough: 'default',
  } as const;

  return (
    <Card padding="none" hover className="group overflow-hidden">
      {videoId ? (
        <Link
          href={`https://youtube.com/shorts/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RunShortContent run={run} videoId={videoId} feelingColors={feelingColors} />
        </Link>
      ) : (
        <RunShortContent run={run} videoId={videoId} feelingColors={feelingColors} />
      )}
    </Card>
  );
}

// ============================================
// Run Short Content
// ============================================

interface RunShortContentProps {
  run: RunLog;
  videoId?: string;
  feelingColors: Record<string, 'health' | 'accent' | 'performance' | 'default'>;
}

function RunShortContent({ run, videoId, feelingColors }: RunShortContentProps) {
  const feelingLabels = {
    great: '🔥 Great',
    good: '✓ Good',
    tired: '😓 Tired',
    rough: '😩 Rough',
  };
  
  return (
    <>
      {/* Thumbnail or Placeholder */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 relative aspect-video">
        {videoId ? (
          <>
            <Image
              src={getYouTubeThumbnail(videoId)}
              alt={`Run on ${run.date}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-white rounded-full p-4 shadow-lg">
                <Play className="h-6 w-6 fill-accent text-accent" />
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-accent text-4xl font-bold">{run.distance}</div>
              <div className="text-text-muted font-medium">km</div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-text-primary font-medium">
            {formatDate(run.date, 'EEE, MMM d')}
          </span>
          <Badge variant={feelingColors[run.feeling]} size="sm">
            {feelingLabels[run.feeling]}
          </Badge>
        </div>

        <div className="text-text-muted flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {Math.floor(run.duration / 60)} min
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3.5 w-3.5" />
            {run.pace} /km
          </span>
        </div>

        {run.notes && (
          <p className="text-text-secondary mt-3 line-clamp-2 text-sm italic">"{run.notes}"</p>
        )}
      </div>
    </>
  );
}

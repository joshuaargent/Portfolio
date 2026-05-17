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
  // Walk threshold: pace > 8:30 min/km (510 sec/km)
  const WALK_PACE_THRESHOLD = 510;
  const paceSeconds = run.paceSeconds || 0;
  
  // Calculate intensity based on pace
  const getPaceIntensity = (pace: number): 'accent' | 'performance' | 'default' => {
    if (!pace || pace <= 0 || pace > WALK_PACE_THRESHOLD) return 'default';
    // Fast (< 5:00/km): accent
    // Moderate (5:00-6:00/km): performance
    // Slow (> 6:00/km): default
    if (pace < 300) return 'accent';
    if (pace < 360) return 'performance';
    return 'default';
  };
  
  const paceIntensity = getPaceIntensity(paceSeconds);

  return (
    <Card padding="none" hover className="group overflow-hidden">
      {videoId ? (
        <Link
          href={`https://youtube.com/shorts/${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <RunShortContent run={run} videoId={videoId} paceIntensity={paceIntensity} />
        </Link>
      ) : (
        <RunShortContent run={run} videoId={videoId} paceIntensity={paceIntensity} />
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
  paceIntensity: 'accent' | 'performance' | 'default';
}

function RunShortContent({ run, videoId, paceIntensity }: RunShortContentProps) {
  return (
    <>
      {/* Thumbnail or Placeholder */}
      <div className="bg-bg-secondary relative aspect-video">
        {videoId ? (
          <>
            <Image
              src={getYouTubeThumbnail(videoId)}
              alt={`Run on ${run.date}`}
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
        <div className="flex items-center justify-between">
          <span className="text-text-primary text-sm font-medium">
            {formatDate(run.date, 'EEEE, MMM d')}
          </span>
          <Badge variant={paceIntensity} size="sm">
            {run.pace}
          </Badge>
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

        {run.notes && <p className="text-text-secondary mt-3 line-clamp-2 text-sm">{run.notes}</p>}
      </div>
    </>
  );
}

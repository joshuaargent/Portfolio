import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatRelativeTime, getYouTubeThumbnail } from '@/lib/utils';
import { Play, FileText, Clock } from 'lucide-react';
import { ContentPiece } from '@/types';

// ============================================
// Types
// ============================================

export interface ContentCardProps {
  content: ContentPiece;
  showThumbnail?: boolean;
}

// ============================================
// Component
// ============================================

export function ContentCard({ content, showThumbnail = true }: ContentCardProps) {
  const categoryColors = {
    faith: 'faith',
    psychology: 'psychology',
    health: 'health',
    performance: 'performance',
    learning: 'code',
  } as const;

  const typeIcons = {
    video: <Play className="h-4 w-4" />,
    article: <FileText className="h-4 w-4" />,
    short: <Play className="h-4 w-4" />,
    'running-short': <Play className="h-4 w-4" />,
  };

  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link href={`/content/${content.slug}`} className="block">
        {/* Thumbnail */}
        {showThumbnail && content.thumbnail && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            <div className="absolute bottom-2 left-2">
              <Badge variant={categoryColors[content.category]}>{content.category}</Badge>
            </div>
            <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
              {typeIcons[content.type]}
              {content.type}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4">
          <div className="mb-2 flex items-center gap-2">
            {!showThumbnail && (
              <Badge variant={categoryColors[content.category]} size="sm">
                {content.category}
              </Badge>
            )}
            <span className="text-text-muted text-xs">
              {formatRelativeTime(content.publishedAt)}
            </span>
          </div>

          <h3 className="text-text-primary group-hover:text-accent line-clamp-2 font-semibold transition-colors">
            {content.title}
          </h3>

          <p className="text-text-secondary mt-2 line-clamp-2 text-sm">{content.excerpt}</p>

          {content.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {content.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-text-muted bg-bg-secondary rounded px-2 py-0.5 text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}

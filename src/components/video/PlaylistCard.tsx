import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Play, Video } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface PlaylistCardProps {
  title: string;
  description?: string;
  videoCount: number;
  thumbnailUrl: string;
  href: string;
}

// ============================================
// Component
// ============================================

export function PlaylistCard({
  title,
  description,
  videoCount,
  thumbnailUrl,
  href,
}: PlaylistCardProps) {
  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link href={href} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
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
            <Video className="h-3 w-3" />
            {videoCount} videos
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-text-primary group-hover:text-accent font-semibold transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-text-secondary mt-1 line-clamp-2 text-sm">{description}</p>
          )}
        </div>
      </Link>
    </Card>
  );
}

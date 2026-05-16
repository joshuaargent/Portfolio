import { ContentCard } from './ContentCard';
import { ContentPiece } from '@/types';

// ============================================
// Types
// ============================================

export interface ContentFeedProps {
  content: ContentPiece[];
  columns?: 2 | 3;
  showThumbnail?: boolean;
  emptyMessage?: string;
}

// ============================================
// Component
// ============================================

export function ContentFeed({
  content,
  columns = 3,
  showThumbnail = true,
  emptyMessage = 'No content found.',
}: ContentFeedProps) {
  const columnClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  if (content.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {content.map((item) => (
        <ContentCard key={item.slug} content={item} showThumbnail={showThumbnail} />
      ))}
    </div>
  );
}

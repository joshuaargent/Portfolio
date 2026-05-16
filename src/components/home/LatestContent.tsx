import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoCard } from '@/components/video/VideoCard';
import { BookCard } from '@/components/reading/BookCard';
import { ContentCard } from '@/components/content/ContentCard';
import { Video, Book, ContentPiece } from '@/types';

// ============================================
// Types
// ============================================

export interface LatestContentProps {
  videos: Video[];
  books: Book[];
  content: ContentPiece[];
}

// ============================================
// Component
// ============================================

export function LatestContent({ videos, books, content }: LatestContentProps) {
  // TODO: Fetch this data dynamically
  const hasContent = videos.length > 0 || books.length > 0 || content.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <SectionHeading
          title="Latest Content"
          subtitle="A mix of my recent work across running, reading, and content creation."
          action={{ label: 'View all', href: '/content' }}
        />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Latest Video */}
          {videos[0] && <VideoCard video={videos[0]} />}

          {/* Latest Book */}
          {books[0] && <BookCard book={books[0]} />}

          {/* Latest Content */}
          {content[0] && <ContentCard content={content[0]} />}
        </div>
      </div>
    </section>
  );
}

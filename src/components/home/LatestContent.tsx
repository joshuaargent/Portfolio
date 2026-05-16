import { SectionHeading } from '@/components/shared/SectionHeading';
import { VideoCard } from '@/components/video/VideoCard';
import { BookCard } from '@/components/reading/BookCard';
import { ContentCard } from '@/components/content/ContentCard';
import { getRecentVideos } from '@/data/videos';
import { getRecentBooks } from '@/data/books';
import { getRecentContent } from '@/data/content';

// ============================================
// Component
// ============================================

export async function LatestContent() {
  // Fetch data dynamically
  const [videos, books, content] = await Promise.all([
    getRecentVideos(3),
    getRecentBooks(3),
    getRecentContent(3),
  ]);

  const hasContent = videos.length > 0 || books.length > 0 || content.length > 0;

  if (!hasContent) {
    return null;
  }

  return (
    <section className="py-8 md:py-10">
      <div className="container">
        <SectionHeading
          title="Latest Content"
          subtitle="A mix of my recent work across running, reading, and content creation."
          action={{ label: 'View all', href: '/content' }}
        />

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Latest Video */}
          {videos[0] && <VideoCard video={videos[0]} />}

          {/* Latest Book */}
          {books[0] && <BookCard book={books[0]} layout="vertical" />}

          {/* Latest Content */}
          {content[0] && <ContentCard content={content[0]} />}
        </div>
      </div>
    </section>
  );
}

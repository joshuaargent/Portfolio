import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { VideoCard } from '@/components/video/VideoCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getContentPieces } from '@/data/content';
import { getVideos } from '@/data/videos';
import { contentCategories } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

type ContentItem =
  | { type: 'video'; slug: string; title: string; description: string; publishedAt: string; thumbnail?: string; videoType?: string }
  | { type: 'article' | 'short'; slug: string; title: string; description: string; publishedAt: string; thumbnail?: string };

export default async function ContentPage() {
  const [contentPieces, allVideos] = await Promise.all([
    getContentPieces(),
    getVideos(),
  ]);

  const categories = contentCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
  }));

  // Combine videos and content into a single feed
  const contentItems: ContentItem[] = [
    ...allVideos.slice(0, 20).map((v) => ({
      type: 'video' as const,
      slug: v.id,
      title: v.title,
      description: v.description,
      publishedAt: v.publishedAt,
      thumbnail: v.thumbnail,
      videoType: v.type,
    })),
    ...contentPieces.map((c) => ({
      type: c.type as 'article' | 'short',
      slug: c.slug,
      title: c.title,
      description: c.excerpt,
      publishedAt: c.publishedAt,
      thumbnail: c.thumbnail,
    })),
  ].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return (
    <>
      <PageHeader
        title="Content"
        description="I create content about things that matter: faith, learning, psychology, health, and performance."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <SectionHeading title="Categories" />
          <div className="mt-4">
            <p className="text-text-secondary">
              {categories.map((cat) => cat.label).join(' • ')}
            </p>
          </div>

          {/* Combined Content Feed - like the home page */}
          <div className="mt-16">
            <SectionHeading
              title="All Content"
              subtitle="Latest videos and articles, mixed together."
              action={{ label: 'View YouTube', href: 'https://youtube.com/@joshua_argent' }}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contentItems.slice(0, 12).map((item) => (
                <div key={`${item.type}-${item.slug}`} className="flex gap-4">
                  {item.thumbnail && (
                    <div className="bg-bg-secondary relative aspect-video w-32 shrink-0 overflow-hidden rounded-lg">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                      {item.type === 'video' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="text-white rounded-full bg-black/50 p-1">
                            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-text-muted text-xs uppercase">
                      {item.type === 'video' ? 'Video' : 'Article'}
                    </p>
                    <h3 className="text-text-primary mt-1 text-sm font-medium line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary mt-1 text-xs line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeading title="Content Schedule" subtitle="What I create each week." />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <h3 className="text-text-primary font-semibold">1 Long-form Video</h3>
                <p className="text-text-secondary mt-1 text-sm">Deep dive into the book of the week</p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">7 Short Videos</h3>
                <p className="text-text-secondary mt-1 text-sm">Key ideas and insights from the book</p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Daily Running Shorts</h3>
                <p className="text-text-secondary mt-1 text-sm">Quick updates from my daily 5km</p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Weekly Blog Post</h3>
                <p className="text-text-secondary mt-1 text-sm">Longer thoughts on learning and growth</p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { ContentCombinedFilter, type CombinedContent } from '@/components/content/CombinedContentFilter';
import { getContentPieces } from '@/data/content';
import { getVideos } from '@/data/videos';
import { contentCategories } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const initialCategory = params.category || null;

  const [contentPieces, allVideos] = await Promise.all([
    getContentPieces(),
    getVideos(),
  ]);

  const categories = contentCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
  }));

  // Combine videos and articles into one array for filtering
  const combinedContent: CombinedContent[] = [
    ...allVideos.map((v) => ({
      slug: v.id,
      title: v.title,
      excerpt: v.description,
      type: 'video' as const,
      category: v.type || 'learning', // Use video type as category
      publishedAt: v.publishedAt,
      thumbnail: v.thumbnail,
      youtubeId: v.youtubeId,
      videoData: v,
    })),
    ...contentPieces.map((c) => ({
      slug: c.slug,
      title: c.title,
      excerpt: c.excerpt,
      type: 'article' as const,
      category: c.category,
      publishedAt: c.publishedAt,
      thumbnail: c.thumbnail,
      youtubeId: c.youtubeId,
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
            <ContentCombinedFilter content={combinedContent} categories={categories} initialCategory={initialCategory} />
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
import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { VideoCard } from '@/components/video/VideoCard';
import { VideoGrid } from '@/components/video/VideoGrid';
import { ContentCategoryFilter } from '@/components/content/ContentCategoryFilter';
import { VideoEmbed } from '@/components/video/VideoEmbed';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getContentPieces } from '@/data/content';
import { getVideos } from '@/data/videos';
import { contentCategories } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

export default async function ContentPage() {
  const [contentPieces, allVideos] = await Promise.all([
    getContentPieces(),
    getVideos(),
  ]);

  const categories = contentCategories.map((cat) => ({
    id: cat.id,
    label: cat.label,
  }));

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
            <ContentCategoryFilter content={contentPieces} categories={categories} />
          </div>

          {/* Latest Long-form Video */}
          {allVideos.length > 0 && (
            <div className="mt-16">
              <SectionHeading
                title="Latest Video"
                subtitle="Most recent long-form video."
                action={{ label: 'View all', href: 'https://youtube.com/@joshua_argent' }}
              />
              <div className="mt-6">
                {allVideos.find((v) => v.type === 'long-form') ? (
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      {(() => {
                        const video = allVideos.find((v) => v.type === 'long-form');
                        return video ? (
                          <>
                            <VideoEmbed videoId={video.youtubeId} title={video.title} />
                            <h3 className="text-text-primary mt-4 text-lg font-semibold">{video.title}</h3>
                            <p className="text-text-secondary mt-2">{video.description}</p>
                          </>
                        ) : null;
                      })()}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          <div className="mt-16">
            <SectionHeading title="Content Schedule" subtitle="What I create each week." />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <h3 className="text-text-primary font-semibold">1 Long-form Video</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Deep dive into the book of the week
                </p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">7 Short Videos</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Key ideas and insights from the book
                </p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Daily Running Shorts</h3>
                <p className="text-text-secondary mt-1 text-sm">Quick updates from my daily 5km</p>
              </Card>
              <Card>
                <h3 className="text-text-primary font-semibold">Weekly Blog Post</h3>
                <p className="text-text-secondary mt-1 text-sm">
                  Longer thoughts on learning and growth
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

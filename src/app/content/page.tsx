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
import { Content } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content',
  description: 'Videos and articles about faith, learning, psychology, health, and performance.',
};

// Type for combined content (videos + articles)
interface CombinedContent {
  slug: string;
  title: string;
  excerpt: string;
  type: 'video' | 'article';
  category: string;
  publishedAt: string;
  thumbnail?: string;
  youtubeId?: string;
}

export default async function ContentPage() {
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
    ...allVideos
      .filter((v) => v.type !== 'running-short')
      .map((v) => ({
        slug: v.id,
        title: v.title,
        excerpt: v.description,
        type: 'video' as const,
        category: v.category || 'learning',
        publishedAt: v.publishedAt,
        thumbnail: v.thumbnail,
        youtubeId: v.youtubeId,
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
            <ContentCategoryWithFilter content={combinedContent} categories={categories} />
          </div>

          {/* Latest Long-form Video */}
          {(() => {
            const latestLongForm = allVideos.find((v) => v.type === 'long-form');
            return latestLongForm ? (
              <div className="mt-16">
                <SectionHeading
                  title="Latest Video"
                  subtitle="Most recent long-form video."
                  action={{ label: 'View all', href: 'https://youtube.com/@joshua_argent' }}
                />
                <div className="mt-6">
                  <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <VideoEmbed videoId={latestLongForm.youtubeId} title={latestLongForm.title} />
                      <h3 className="text-text-primary mt-4 text-lg font-semibold">{latestLongForm.title}</h3>
                      <p className="text-text-secondary mt-2">{latestLongForm.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null;
          })()}

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

// Client component for filtering combined content
'use client';

import { useState, useMemo } from 'react';
import { CategoryFilter } from '@/components/content/CategoryFilter';
import { ContentCard } from '@/components/content/ContentCard';
import { VideoCard } from '@/components/video/VideoCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Filter, Play } from 'lucide-react';

function ContentCategoryWithFilter({
  content,
  categories,
}: {
  content: CombinedContent[];
  categories: { id: string; label: string }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const filteredContent = useMemo(() => {
    if (!selected) return content;
    return content.filter((item) => item.category === selected);
  }, [content, selected]);

  return (
    <div className="mb-8">
      <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />

      {selected && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-text-secondary">
              {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} in{' '}
              {categories.find((c) => c.id === selected)?.label}
            </p>
            <button onClick={() => setSelected(null)} className="text-accent hover:text-accent-hover text-sm">
              Clear filter
            </button>
          </div>
        </div>
      )}

      {filteredContent.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item) =>
            item.type === 'video' && item.youtubeId ? (
              <a
                key={item.slug}
                href={`https://youtube.com/watch?v=${item.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="bg-bg-secondary relative aspect-video overflow-hidden rounded-lg">
                  {item.thumbnail && (
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="text-white rounded-full bg-black/50 p-3">
                      <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-text-muted text-xs uppercase">Video</p>
                  <h3 className="text-text-primary line-clamp-2 text-sm font-medium transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary line-clamp-2 text-xs mt-1">{item.excerpt}</p>
                </div>
              </a>
            ) : (
              <ContentCard
                key={item.slug}
                content={{
                  slug: item.slug,
                  title: item.title,
                  excerpt: item.excerpt,
                  type: 'article',
                  category: item.category as any,
                  publishedAt: item.publishedAt,
                  thumbnail: item.thumbnail,
                  tags: [],
                }}
              />
            )
          )}
        </div>
      ) : (
        <EmptyState
          icon={<Filter className="h-8 w-8" />}
          title="No content found"
          description={`No content in the ${categories.find((c) => c.id === selected)?.label} category yet.`}
          action={{
            label: 'Clear filter',
            onClick: () => setSelected(null),
          }}
        />
      )}
    </div>
  );
}

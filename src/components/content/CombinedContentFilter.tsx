'use client';

import { useState, useMemo } from 'react';
import { CategoryFilter } from '@/components/content/CategoryFilter';
import { ContentCard } from '@/components/content/ContentCard';
import { VideoCard } from '@/components/video/VideoCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Filter } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface CombinedContent {
  slug: string;
  title: string;
  excerpt: string;
  type: 'video' | 'article';
  category: string;
  publishedAt: string;
  thumbnail?: string;
  youtubeId?: string;
  videoData?: {
    id: string;
    title: string;
    description: string;
    youtubeId: string;
    thumbnail: string;
    duration: string;
    publishedAt: string;
    type: 'long-form' | 'short' | 'running-short';
    tags: string[];
    category?: string;
    viewCount?: number;
  };
}

// ============================================
// Component
// ============================================

export function ContentCombinedFilter({
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
            item.type === 'video' && item.videoData ? (
              <VideoCard key={item.slug} video={item.videoData} showDescription />
            ) : item.type === 'video' && item.youtubeId ? (
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
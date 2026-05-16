import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { VideoEmbed } from '@/components/video/VideoEmbed';
import { TagList } from '@/components/blog/TagList';
import { getContentBySlug, getContentPieces } from '@/data/content';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Play, FileText } from 'lucide-react';

// ============================================
// Types
// ============================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Generate Static Params
// ============================================

export async function generateStaticParams() {
  const content = await getContentPieces();
  return content.map((item) => ({
    slug: item.slug,
  }));
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContentBySlug(slug);

  if (!content) {
    return {
      title: 'Content Not Found',
    };
  }

  return {
    title: content.title,
    description: content.excerpt,
  };
}

// ============================================
// Content Detail Page
// ============================================

export default async function ContentPage({ params }: PageProps) {
  const { slug } = await params;
  const content = await getContentBySlug(slug);

  if (!content) {
    notFound();
  }

  const typeIcons = {
    video: <Play className="h-4 w-4" />,
    article: <FileText className="h-4 w-4" />,
    short: <Play className="h-4 w-4" />,
    'running-short': <Play className="h-4 w-4" />,
  };

  const categoryColors = {
    faith: 'faith',
    psychology: 'psychology',
    health: 'health',
    performance: 'performance',
    learning: 'code',
  } as const;

  return (
    <div className="py-12 md:py-16">
      <div className="container max-w-4xl">
        {/* Back Link */}
        <Link
          href="/content"
          className="text-text-secondary hover:text-accent mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Content
        </Link>

        {/* Header */}
        <header className="mb-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant={categoryColors[content.category]}>{content.category}</Badge>
            <Badge variant="default">
              {typeIcons[content.type]}
              <span className="ml-1">{content.type}</span>
            </Badge>
          </div>

          <h1 className="text-text-primary text-3xl font-bold md:text-4xl">{content.title}</h1>

          <p className="text-text-secondary mt-4 text-lg">{content.excerpt}</p>

          <div className="text-text-muted mt-6 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              {formatDate(content.publishedAt, 'MMMM d, yyyy')}
            </span>
            <span>{formatRelativeTime(content.publishedAt)}</span>
          </div>
        </header>

        {/* Video Embed */}
        {content.youtubeId && (
          <div className="mb-8">
            <VideoEmbed videoId={content.youtubeId} title={content.title} />
          </div>
        )}

        {/* Thumbnail (for articles) */}
        {content.type === 'article' && content.thumbnail && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {/* Content */}
        {content.content && (
          <article
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content.content }}
          />
        )}

        {/* Tags */}
        {content.tags.length > 0 && (
          <div className="border-border mt-8 border-t pt-8">
            <TagList tags={content.tags} />
          </div>
        )}

        {/* Actions */}
        <div className="border-border mt-8 flex flex-wrap gap-3 border-t pt-8">
          <Button variant="outline" asChild>
            <Link href="/content">All Content</Link>
          </Button>
          {content.youtubeId && (
            <Button asChild>
              <a
                href={`https://youtube.com/watch?v=${content.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

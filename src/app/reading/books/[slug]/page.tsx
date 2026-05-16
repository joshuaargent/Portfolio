import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { VideoEmbed } from '@/components/video/VideoEmbed';
import { getBookBySlug, getBooks } from '@/data/books';
import { getVideosByBook } from '@/data/videos';
import { formatDate, decodeHtmlEntities } from '@/lib/utils';
import { ArrowLeft, Star, ExternalLink, BookOpen } from 'lucide-react';

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
  const books = await getBooks();
  return books.map((book) => ({
    slug: book.slug,
  }));
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);

  if (!book) {
    return {
      title: 'Book Not Found',
    };
  }

  return {
    title: `${book.title} by ${book.author}`,
    description: book.review || `Summary and key ideas from ${book.title} by ${book.author}.`,
  };
}

// ============================================
// Book Detail Page
// ============================================

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const [book, videos] = await Promise.all([getBookBySlug(slug), getVideosByBook(slug)]);

  if (!book) {
    notFound();
  }

  return (
    <div className="py-12 md:py-16">
      <div className="container">
        {/* Back Link */}
        <Link
          href="/reading"
          className="text-text-secondary hover:text-accent mb-8 inline-flex items-center gap-1.5 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reading
        </Link>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-6 md:flex-row">
              {/* Cover */}
              <div className="relative mx-auto aspect-[2/3] w-40 shrink-0 md:mx-0 md:w-48">
                <Image
                  src={book.coverImage}
                  alt={`Cover of ${book.title}`}
                  fill
                  className="rounded-lg object-cover shadow-lg"
                  sizes="192px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  {book.category.map((cat) => (
                    <Badge
                      key={cat}
                      variant={cat as 'faith' | 'psychology' | 'health' | 'performance'}
                    >
                      {cat}
                    </Badge>
                  ))}
                  {book.status === 'reading' && <Badge variant="accent">Currently Reading</Badge>}
                </div>

                <h1 className="text-text-primary text-3xl font-bold md:text-4xl">{book.title}</h1>
                <p className="text-text-secondary mt-2 text-lg">by {book.author}</p>

                {book.rating && (
                  <div className="mt-4 flex items-center justify-center gap-1 md:justify-start">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < book.rating! ? 'fill-yellow-500 text-yellow-500' : 'text-border'
                        }`}
                      />
                    ))}
                    <span className="text-text-muted ml-2 text-sm">{book.rating}/5</span>
                  </div>
                )}

                <div className="text-text-muted mt-4 flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
                  {book.finishedAt && (
                    <span>Finished {formatDate(book.finishedAt, 'MMMM d, yyyy')}</span>
                  )}
                </div>

                <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
                  {book.amazonUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={book.amazonUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View on Amazon
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Review */}
            {book.review && (
              <div className="mb-12">
                <h2 className="text-text-primary mb-4 text-2xl font-bold">My Review</h2>
                <Card>
                  <p className="text-text-secondary leading-relaxed">{book.review}</p>
                </Card>
              </div>
            )}

            {/* Key Ideas */}
            {book.keyIdeas.length > 0 && (
              <div className="mb-12">
                <h2 className="text-text-primary mb-4 text-2xl font-bold">Key Ideas</h2>
                <Card>
                  <ul className="space-y-3">
                    {book.keyIdeas.map((idea, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="bg-accent-light text-accent flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium">
                          {index + 1}
                        </span>
                        <span className="text-text-secondary">{idea}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            )}

            {/* Related Videos */}
            {videos.length > 0 && (
              <div>
                <h2 className="text-text-primary mb-4 text-2xl font-bold">Related Videos</h2>
                <div className="space-y-6">
                  {videos.map((video) => (
                    <div key={video.id}>
                      <VideoEmbed videoId={video.youtubeId} title={video.title} />
                      <h3 className="text-text-primary mt-3 text-lg font-semibold">
                        {decodeHtmlEntities(video.title)}
                      </h3>
                      <p className="text-text-secondary mt-1 text-sm">{decodeHtmlEntities(video.description)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info */}
              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Book Info</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Author</dt>
                    <dd className="text-text-primary font-medium">{book.author}</dd>
                  </div>
                  {book.finishedAt && (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Finished</dt>
                      <dd className="text-text-primary font-medium">
                        {formatDate(book.finishedAt, 'MMM d, yyyy')}
                      </dd>
                    </div>
                  )}
                  {book.rating && (
                    <div className="flex justify-between">
                      <dt className="text-text-muted">Rating</dt>
                      <dd className="text-text-primary font-medium">{book.rating}/5</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-text-muted">Category</dt>
                    <dd className="text-text-primary font-medium">{book.category.join(', ')}</dd>
                  </div>
                </dl>
              </Card>

              {/* Actions */}
              <Card>
                <h3 className="text-text-primary mb-4 font-semibold">Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/reading">
                      <BookOpen className="mr-2 h-4 w-4" />
                      All Books
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/content">Related Content</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

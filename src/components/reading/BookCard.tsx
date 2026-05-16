import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';
import { Star, BookOpen, Clock } from 'lucide-react';
import { Book } from '@/types';

// ============================================
// Types
// ============================================

export interface BookCardProps {
  book: Book;
  showReview?: boolean;
  layout?: 'horizontal' | 'vertical';
}

// ============================================
// Component
// ============================================

export function BookCard({ book, showReview = false, layout = 'horizontal' }: BookCardProps) {
  if (layout === 'vertical') {
    return (
      <Card padding="none" hover className="group overflow-hidden">
        <Link href={`/reading/books/${book.slug}`} className="block">
          {/* Cover Image */}
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" />
            {book.status === 'reading' && (
              <div className="absolute top-2 right-2">
                <Badge variant="accent">Reading</Badge>
              </div>
            )}
            {book.finishedAt && (
              <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded bg-black/80 px-2 py-1 text-xs text-white">
                <Clock className="h-3 w-3" />
                {book.finishedAt}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-text-primary group-hover:text-accent line-clamp-2 font-semibold transition-colors">
              {book.title}
            </h3>
            <p className="text-text-secondary mt-1 text-sm">{book.author}</p>

            {book.rating && (
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < book.rating! ? 'fill-yellow-500 text-yellow-500' : 'text-border'
                    }`}
                  />
                ))}
              </div>
            )}

            {showReview && book.review && (
              <p className="text-text-secondary mt-3 line-clamp-3 text-sm">{book.review}</p>
            )}
          </div>
        </Link>
      </Card>
    );
  }

  // Original horizontal layout
  return (
    <Card padding="none" hover className="group overflow-hidden">
      <Link href={`/reading/books/${book.slug}`} className="block">
        <div className="flex flex-col sm:flex-row">
          {/* Cover Image */}
          <div className="relative aspect-[2/3] w-full shrink-0 sm:aspect-auto sm:h-full sm:w-32 md:w-40">
            <Image
              src={book.coverImage}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-text-primary group-hover:text-accent line-clamp-2 font-semibold transition-colors">
                  {book.title}
                </h3>
                {book.status === 'reading' && (
                  <Badge variant="accent" size="sm">
                    Reading
                  </Badge>
                )}
              </div>
              <p className="text-text-secondary mt-1 text-sm">{book.author}</p>

              {book.rating && (
                <div className="mt-2 flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < book.rating! ? 'fill-yellow-500 text-yellow-500' : 'text-border'
                      }`}
                    />
                  ))}
                </div>
              )}

              {showReview && book.review && (
                <p className="text-text-secondary mt-3 line-clamp-3 text-sm">{book.review}</p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              {book.finishedAt && (
                <span className="text-text-muted text-xs">
                  Finished {formatDate(book.finishedAt, 'MMM d, yyyy')}
                </span>
              )}
              <div className="text-accent flex items-center gap-1 text-xs">
                <BookOpen className="h-3 w-3" />
                View details
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

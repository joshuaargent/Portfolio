import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BookOpen, ExternalLink, ChevronRight } from 'lucide-react';
import { Book } from '@/types';

// ============================================
// Types
// ============================================

export interface CurrentBookProps {
  book: Book;
  progress?: number;
}

// ============================================
// Component
// ============================================

export function CurrentBook({ book, progress }: CurrentBookProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Cover Image */}
        <div className="relative aspect-[2/3] md:aspect-auto">
          <Image
            src={book.coverImage}
            alt={`Cover of ${book.title}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-6 md:col-span-2 md:p-8">
          <Badge variant="accent" className="w-fit">
            Currently Reading
          </Badge>

          <h2 className="text-text-primary mt-4 text-2xl font-bold md:text-3xl">{book.title}</h2>
          <p className="text-text-secondary mt-2 text-lg">{book.author}</p>

          {/* Progress Bar */}
          {progress !== undefined && (
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-text-secondary">Progress</span>
                <span className="text-text-primary font-medium">{progress}%</span>
              </div>
              <div className="bg-bg-secondary h-2 overflow-hidden rounded-full">
                <div
                  className="bg-accent h-full rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Key Ideas Preview */}
          {book.keyIdeas.length > 0 && (
            <div className="mt-6">
              <h3 className="text-text-primary text-sm font-semibold tracking-wider uppercase">
                Key Ideas
              </h3>
              <ul className="mt-3 space-y-2">
                {book.keyIdeas.slice(0, 3).map((idea, index) => (
                  <li key={index} className="text-text-secondary flex items-start gap-2 text-sm">
                    <span className="text-accent mt-1">•</span>
                    {idea}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/reading/books/${book.slug}`}
              style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
              className="focus-visible:ring-accent inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium shadow-sm transition-all duration-200 hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View Details
            </Link>
            {book.amazonUrl && (
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="focus-visible:ring-accent border-border text-text-primary hover:bg-bg-secondary inline-flex h-11 items-center justify-center gap-2 rounded-lg border bg-transparent px-5 text-base font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View on Amazon
              </a>
            )}
            <Link
              href="/reading"
              className="focus-visible:ring-accent hover:bg-bg-secondary text-text-primary inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              All Books
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

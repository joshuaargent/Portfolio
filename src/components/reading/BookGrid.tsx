import { BookCard } from './BookCard';
import { Book } from '@/types';

// ============================================
// Types
// ============================================

export interface BookGridProps {
  books: Book[];
  columns?: 1 | 2 | 3;
  showReview?: boolean;
  emptyMessage?: string;
}

// ============================================
// Component
// ============================================

export function BookGrid({
  books,
  columns = 2,
  showReview = false,
  emptyMessage = 'No books found.',
}: BookGridProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  };

  if (books.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-text-muted">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-6`}>
      {books.map((book) => (
        <BookCard key={book.slug} book={book} showReview={showReview} />
      ))}
    </div>
  );
}

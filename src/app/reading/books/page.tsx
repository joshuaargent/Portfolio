import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BookGrid } from '@/components/reading/BookGrid';
import { SearchBar } from '@/components/shared/SearchBar';
import { getCompletedBooks } from '@/data/books';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Books',
  description: "All the books I've read and recommend.",
};

// ============================================
// Books Page
// ============================================

export default async function BooksPage() {
  const books = await getCompletedBooks();

  return (
    <>
      <PageHeader title="Books" description="All the books I've read, rated, and recommend." />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {/* Search */}
          <div className="mb-8">
            <SearchBar
              onSearch={(query) => {
                // TODO: Implement search functionality
                console.log('Searching for:', query);
              }}
              placeholder="Search books..."
            />
          </div>

          {/* Books Grid */}
          <BookGrid books={books} columns={2} showReview emptyMessage="No books found." />

          {/* Stats */}
          <div className="mt-12 text-center">
            <p className="text-text-muted">
              Total books read:{' '}
              <span className="text-text-primary font-semibold">{books.length}</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

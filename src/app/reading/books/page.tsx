import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { BookGrid } from '@/components/reading/BookGrid';
import { BookSearchSection } from '@/components/reading/BookSearchSection';
import { getCompletedBooks } from '@/data/books';

export const metadata: Metadata = {
  title: 'Books',
  description: "All the books I've read and analysed.",
};

export default async function BooksPage() {
  const books = await getCompletedBooks();

  return (
    <>
      <PageHeader title="Books" description="All the books I've read, rated, and analysed." />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <BookSearchSection books={books} />

          <BookGrid books={books} columns={2} showReview emptyMessage="No books found." />

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

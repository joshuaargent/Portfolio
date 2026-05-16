'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from '@/components/shared/SearchBar';
import { Book } from '@/types';
import { BookCard } from './BookCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Search } from 'lucide-react';

interface BookSearchSectionProps {
  books: Book[];
}

export function BookSearchSection({ books }: BookSearchSectionProps) {
  const [query, setQuery] = useState('');

  const filteredBooks = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();
    return books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.category.some((cat) => cat.toLowerCase().includes(lowerQuery))
    );
  }, [books, query]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  return (
    <div className="mb-8">
      <SearchBar onSearch={handleSearch} placeholder="Search books..." defaultValue={query} />

      {query && (
        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-text-secondary">
              {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''} for &quot;{query}
              &quot;
            </p>
            <button
              onClick={() => setQuery('')}
              className="text-accent hover:text-accent-hover text-sm"
            >
              Clear search
            </button>
          </div>

          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredBooks.map((book) => (
                <BookCard key={book.slug} book={book} showReview />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Search className="h-8 w-8" />}
              title="No books found"
              description={`No books matching "${query}". Try a different search term.`}
              action={{
                label: 'Clear search',
                onClick: () => setQuery(''),
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

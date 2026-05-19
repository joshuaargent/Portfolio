import { Book } from '@/types';

// ============================================
// Books Data - Add your books here
// ============================================

export const books: Book[] = [
  {
    slug: 'how-to-win-friends',
    title: 'How to Win Friends and Influence People',
    author: 'Dale Carnegie',
    coverImage: '',
    startedAt: '2025-05-19',
    status: 'reading',
    keyIdeas: [
      'Become genuinely interested in other people',
      'Smile and remember names',
      'Be a good listener and encourage others to talk about themselves',
      'Make the other person feel important',
    ],
    category: ['psychology', 'performance'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/0671027034',
  },
  // Add more books here...
];

// ============================================
// Helper Functions
// ============================================

export async function getBooks(): Promise<Book[]> {
  return books;
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  return books.find((b) => b.slug === slug);
}

export async function getCurrentBook(): Promise<Book | undefined> {
  return books.find((b) => b.status === 'reading');
}

export async function getCompletedBooks(): Promise<Book[]> {
  return books
    .filter((b) => b.status === 'completed')
    .sort((a, b) => new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime());
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  return books.filter((b) => b.category.includes(category as any));
}

export async function getRecentBooks(limit: number = 5): Promise<Book[]> {
  return books
    .filter((b) => b.status === 'completed')
    .sort((a, b) => new Date(b.finishedAt!).getTime() - new Date(a.finishedAt!).getTime())
    .slice(0, limit);
}

import { Book } from '@/types';

// ============================================
// Books Data - Add your books here
// ============================================

export const books: Book[] = [
  {
    slug: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: '/images/books/atomic-habits.jpg',
    startedAt: '2025-01-15',
    status: 'reading',
    keyIdeas: [
      'Small habits compound into remarkable results',
      'Focus on systems, not goals',
      'Make habits obvious, attractive, easy, and satisfying',
      'Identity-based habits: focus on who you want to become',
    ],
    category: ['psychology', 'performance'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/0735211299',
  },
  {
    slug: 'deep-work',
    title: 'Deep Work',
    author: 'Cal Newport',
    coverImage: '/images/books/deep-work.jpg',
    startedAt: '2025-01-01',
    finishedAt: '2025-01-07',
    rating: 5,
    status: 'completed',
    review:
      'A powerful case for focused work in an age of distraction. Changed how I approach my daily schedule.',
    keyIdeas: [
      'Deep work is becoming increasingly valuable and rare',
      'Attention residue reduces cognitive capacity',
      'Embrace boredom to train your focus',
      'Schedule every minute of your day',
    ],
    category: ['performance', 'learning'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/1455586692',
  },
  {
    slug: 'the-courage-to-be-disliked',
    title: 'The Courage to Be Disliked',
    author: 'Ichiro Kishimi & Fumitake Koga',
    coverImage: '/images/books/courage-disliked.jpg',
    startedAt: '2024-12-25',
    finishedAt: '2024-12-31',
    rating: 4,
    status: 'completed',
    review:
      'A refreshing take on Adlerian psychology through a dialogue format. Challenges conventional wisdom about happiness.',
    keyIdeas: [
      'All problems are interpersonal relationship problems',
      'Separation of tasks is key to freedom',
      'Live in the present, not the past or future',
      'Happiness is the feeling of contribution',
    ],
    category: ['psychology', 'faith'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/1501197274',
  },
  {
    slug: 'mans-search-for-meaning',
    title: "Man's Search for Meaning",
    author: 'Viktor E. Frankl',
    coverImage: '/images/books/mans-search.jpg',
    startedAt: '2024-12-18',
    finishedAt: '2024-12-24',
    rating: 5,
    status: 'completed',
    review:
      'A profound exploration of finding purpose even in the most difficult circumstances. Essential reading.',
    keyIdeas: [
      'Life is not primarily a quest for pleasure, but for meaning',
      'Everything can be taken from a man but one thing: the last of human freedoms',
      'Happiness cannot be pursued; it must ensue',
      'Between stimulus and response there is a space',
    ],
    category: ['psychology', 'faith'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/080701429X',
  },
  {
    slug: 'the-power-of-habit',
    title: 'The Power of Habit',
    author: 'Charles Duhigg',
    coverImage: '/images/books/power-of-habit.jpg',
    startedAt: '2024-12-11',
    finishedAt: '2024-12-17',
    rating: 4,
    status: 'completed',
    review:
      'Excellent exploration of the science behind habits and how they shape our lives and organizations.',
    keyIdeas: [
      'Habit loop: cue, routine, reward',
      'Keystone habits create chain reactions',
      'Belief is essential for habit change',
      'Small wins fuel transformative changes',
    ],
    category: ['psychology', 'performance'],
    videos: [],
    amazonUrl: 'https://amazon.com/dp/081298160X',
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

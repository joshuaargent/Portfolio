import { ContentPiece } from '@/types';

// ============================================
// Content Data - Add your content pieces here
// ============================================

export const contentPieces: ContentPiece[] = [
  {
    slug: 'building-consistency',
    title: 'Building Consistency: The Power of Daily Practice',
    type: 'article',
    category: 'performance',
    excerpt:
      'Why showing up every day matters more than being perfect. Lessons from my 87-day running streak.',
    publishedAt: '2025-01-10',
    thumbnail: '/images/content/consistency.jpg',
    tags: ['consistency', 'habits', 'discipline'],
    content: `
      <p>Consistency is the foundation of everything I do. Whether it's running 5km every day, reading one book per week, or creating content regularly, the power of daily practice compounds over time.</p>
      <h2>Why Consistency Matters</h2>
      <p>Small actions, repeated daily, lead to extraordinary results. It's not about being perfect—it's about showing up.</p>
    `,
  },
  {
    slug: 'faith-and-work',
    title: 'Faith and Work: Finding Purpose in What You Do',
    type: 'video',
    category: 'faith',
    excerpt: 'How my faith influences my approach to work, creativity, and daily life.',
    publishedAt: '2025-01-05',
    thumbnail: '/images/content/faith-work.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['faith', 'purpose', 'work'],
  },
  {
    slug: 'psychology-of-habits',
    title: 'The Psychology of Habits: Why We Do What We Do',
    type: 'video',
    category: 'psychology',
    excerpt:
      'Understanding the science behind habit formation and how to use it to your advantage.',
    publishedAt: '2024-12-20',
    thumbnail: '/images/content/habits.jpg',
    youtubeId: 'dQw4w9WgXcQ',
    tags: ['psychology', 'habits', 'neuroscience'],
  },
  {
    slug: 'health-foundations',
    title: 'Health Foundations: Sleep, Nutrition, and Movement',
    type: 'article',
    category: 'health',
    excerpt: 'The three pillars of health and why they matter more than any supplement or hack.',
    publishedAt: '2024-12-15',
    thumbnail: '/images/content/health.jpg',
    tags: ['health', 'sleep', 'nutrition', 'exercise'],
  },
  // Add more content pieces here...
];

// ============================================
// Helper Functions
// ============================================

export async function getContentPieces(): Promise<ContentPiece[]> {
  return contentPieces.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function getContentBySlug(slug: string): Promise<ContentPiece | undefined> {
  return contentPieces.find((c) => c.slug === slug);
}

export async function getContentByCategory(category: string): Promise<ContentPiece[]> {
  return contentPieces
    .filter((c) => c.category === category)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getContentByType(type: ContentPiece['type']): Promise<ContentPiece[]> {
  return contentPieces
    .filter((c) => c.type === type)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getRecentContent(limit: number = 6): Promise<ContentPiece[]> {
  return contentPieces
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

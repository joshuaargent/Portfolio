import { ContentPiece } from '@/types';

// ============================================
// Content Data - Add your content pieces here
// ============================================

export const contentPieces: ContentPiece[] = [
  // ============================================
  // EXAMPLE - Copy this template to add a new article:
  // ============================================
  // {
  //   slug: 'your-article-slug',
  //   title: 'Your Article Title',
  //   type: 'article',  // or 'video'
  //   category: 'health',  // health, psychology, faith, learning, performance
  //   excerpt: 'A short description of your article (1-2 sentences).',
  //   publishedAt: '2025-01-01',  // Format: YYYY-MM-DD
  //   thumbnail: '/images/content/your-image.jpg',
  //   tags: ['tag1', 'tag2'],
  //   content: `
  //     <p>Write your article content here in HTML.</p>
  //     <h2>Section Heading</h2>
  //     <p>Your content goes here.</p>
  //   `,
  // },

  // ============================================
  // EXAMPLE - Copy this template to add a new video:
  // ============================================
  // {
  //   slug: 'your-video-slug',
  //   title: 'Your Video Title',
  //   type: 'video',
  //   category: 'health',
  //   excerpt: 'A short description of your video.',
  //   publishedAt: '2025-01-01',
  //   thumbnail: '/images/content/your-thumbnail.jpg',
  //   youtubeId: 'dQw4w9WgXcQ',  // YouTube video ID
  //   tags: ['tag1', 'tag2'],
  // },
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

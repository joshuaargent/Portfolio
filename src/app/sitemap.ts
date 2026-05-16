import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/constants';
import { getBlogPosts } from '@/data/blog';
import { getBooks } from '@/data/books';
import { getProjects } from '@/data/projects';
import { getContentPieces } from '@/data/content';

// ============================================
// Sitemap
// ============================================

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/running`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reading`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/code`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/content`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // Dynamic pages - Blog posts
  const blogPosts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic pages - Books
  const books = await getBooks();
  const bookPages: MetadataRoute.Sitemap = books.map((book) => ({
    url: `${baseUrl}/reading/books/${book.slug}`,
    lastModified: new Date(book.finishedAt || book.startedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic pages - Projects
  const projects = await getProjects();
  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/code/${project.slug}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Dynamic pages - Content
  const contentPieces = await getContentPieces();
  const contentPages: MetadataRoute.Sitemap = contentPieces.map((content) => ({
    url: `${baseUrl}/content/${content.slug}`,
    lastModified: new Date(content.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages, ...bookPages, ...projectPages, ...contentPages];
}

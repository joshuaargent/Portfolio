import { Project } from '@/types';
import { getGitHubRepos } from '@/lib/github';
import { siteConfig } from '@/lib/constants';

// Fallback static data
const fallbackProjects: Project[] = [
  {
    slug: 'personal-portfolio',
    name: 'Personal Portfolio',
    description: 'My personal website built with Next.js.',
    longDescription: '<p>This website serves as my central hub.</p>',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: siteConfig.url,
    repoUrl: `${siteConfig.links.github}/portfolio`,
    screenshots: ['/images/projects/portfolio-1.png'],
    status: 'active',
    featured: true,
    tags: ['web', 'personal'],
    createdAt: '2025-01-01',
  },
];

export async function getProjects(): Promise<Project[]> {
  const repos = await getGitHubRepos();

  if (repos.length === 0) return fallbackProjects;

  return repos.map((repo) => ({
    slug: repo.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    description: repo.description,
    longDescription: `<p>${repo.description}</p>`,
    techStack: repo.topics.length > 0 ? repo.topics : repo.language ? [repo.language] : [],
    liveUrl: repo.homepage || undefined,
    repoUrl: repo.url,
    screenshots: [],
    status: 'completed',
    featured: repo.stars > 10,
    tags: repo.topics,
    stars: repo.stars,
    language: repo.language,
    updatedAt: repo.updatedAt,
    createdAt: repo.createdAt,
  }));
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => p.featured);
}

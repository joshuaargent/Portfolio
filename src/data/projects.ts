import { Project } from '@/types';

// ============================================
// Projects Data - Add your projects here
// ============================================

export const projects: Project[] = [
  {
    slug: 'personal-portfolio',
    name: 'Personal Portfolio',
    description:
      'My personal website built with Next.js, featuring running stats, book summaries, and coding projects.',
    longDescription: `
      <p>This website serves as my central hub for everything I create. It showcases my running journey, book summaries, coding projects, and content about faith, learning, psychology, health, and performance.</p>
      <h3>Features</h3>
      <ul>
        <li>Running streak tracker with calendar heatmap</li>
        <li>Book reading progress and summaries</li>
        <li>Project showcase with live demos</li>
        <li>Content hub for videos and articles</li>
        <li>Blog with MDX support</li>
      </ul>
    `,
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    liveUrl: 'https://joshua.com',
    repoUrl: 'https://github.com/yourusername/portfolio',
    screenshots: ['/images/projects/portfolio-1.png'],
    status: 'active',
    featured: true,
    tags: ['web', 'personal'],
    createdAt: '2025-01-01',
  },
  {
    slug: 'running-tracker',
    name: 'Running Tracker',
    description:
      'A simple app to log daily runs and track streaks without the bloat of fitness apps.',
    longDescription: `
      <p>I built this because I wanted a clean way to track my daily 5km runs without the complexity of mainstream fitness apps.</p>
      <h3>Features</h3>
      <ul>
        <li>Simple run logging</li>
        <li>Streak tracking</li>
        <li>CSV export</li>
        <li>Local storage</li>
      </ul>
    `,
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
    liveUrl: 'https://running.joshua.com',
    repoUrl: 'https://github.com/yourusername/running-tracker',
    screenshots: ['/images/projects/running-tracker-1.png'],
    status: 'completed',
    featured: false,
    tags: ['web', 'fitness'],
    createdAt: '2024-11-15',
  },
  // Add more projects here...
];

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  return projects.find((p) => p.slug === slug);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return projects.filter((p) => p.featured);
}

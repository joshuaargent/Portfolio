import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectGrid } from '@/components/code/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getProjects, getFeaturedProjects } from '@/data/projects';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Code',
  description: "Projects I've built. Clean, maintainable software that solves real problems.",
};

export default async function CodePage() {
  const [allProjects, featuredProjects] = await Promise.all([getProjects(), getFeaturedProjects()]);

  const techStack = [
    'TypeScript',
    'JavaScript',
    'HTML5',
    'CSS3',
    'Python',
    'Next.js',
    'React',
    'Express.js',
    'Node.js',
    'YouTube API',
    'GitHub API',
    'Strava API',
    'Vercel',
    'Netlify',
    'Render',
    'Git',
    'GitHub',
  ];

  return (
    <>
      <PageHeader
        title="Code"
        description="I build things that solve real problems. Here's what I've been working on."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <SectionHeading title="Featured Projects" subtitle="My most impactful work." />
              <div className="mt-6">
                <ProjectGrid projects={featuredProjects} columns={1} />
              </div>
            </div>
          )}

          <div className="mb-12">
            <SectionHeading
              title="All Projects"
              subtitle="Everything I've built, from web apps to CLI tools."
              action={{ label: 'View on GitHub', href: 'https://github.com/yourusername' }}
            />
            <div className="mt-6">
              <ProjectGrid projects={allProjects} columns={2} />
            </div>
          </div>

          <div className="mb-12">
            <SectionHeading title="Tech Stack" subtitle="Technologies I work with regularly." />
            <div className="mt-6">
              <Card>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="default" size="lg">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-text-primary text-xl font-semibold">
                    More Projects
                  </h3>
                  <p className="text-text-secondary mt-2">
                    Check out more of my projects on GitHub.
                  </p>
                </div>
                <Button
                  asChild
                  style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                  className="hover:opacity-90"
                >
                  <a
                    href="https://github.com/joshuaargent"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    View GitHub
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

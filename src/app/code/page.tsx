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

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Code',
  description: "Projects I've built. Clean, maintainable software that solves real problems.",
};

// ============================================
// Code Page
// ============================================

export default async function CodePage() {
  const [allProjects, featuredProjects] = await Promise.all([getProjects(), getFeaturedProjects()]);

  const techStack = [
    'Next.js',
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Tailwind CSS',
    'Prisma',
    'tRPC',
    'Docker',
    'AWS',
  ];

  return (
    <>
      <PageHeader
        title="Code"
        description="I build things that solve real problems. Here's what I've been working on."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-12">
              <SectionHeading title="Featured Projects" subtitle="My most impactful work." />
              <div className="mt-6">
                <ProjectGrid projects={featuredProjects} columns={1} />
              </div>
            </div>
          )}

          {/* All Projects */}
          <div className="mb-12">
            <SectionHeading
              title="All Projects"
              subtitle="Everything I've built, from web apps to CLI tools."
              action={{
                label: 'View on GitHub',
                href: 'https://github.com/yourusername',
              }}
            />
            <div className="mt-6">
              <ProjectGrid projects={allProjects} columns={2} />
            </div>
          </div>

          {/* Tech Stack */}
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

          {/* Open Source */}
          <div>
            <Card>
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div>
                  <h3 className="text-text-primary text-xl font-semibold">
                    Open Source Contributions
                  </h3>
                  <p className="text-text-secondary mt-2">
                    I believe in giving back to the community. Check out my open source work on
                    GitHub.
                  </p>
                </div>
                <Button asChild>
                  <a
                    href="https://github.com/yourusername"
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

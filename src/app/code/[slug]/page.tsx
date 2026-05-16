import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProjectDetail } from '@/components/code/ProjectDetail';
import { ProjectGrid } from '@/components/code/ProjectGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { getProjectBySlug, getProjects } from '@/data/projects';

// ============================================
// Types
// ============================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============================================
// Generate Static Params
// ============================================

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// ============================================
// Generate Metadata
// ============================================

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.name,
    description: project.description,
  };
}

// ============================================
// Project Detail Page
// ============================================

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const [project, allProjects] = await Promise.all([getProjectBySlug(slug), getProjects()]);

  if (!project) {
    notFound();
  }

  // Get related projects (same tags, excluding current)
  const relatedProjects = allProjects
    .filter((p) => p.slug !== slug && p.tags.some((t) => project.tags.includes(t)))
    .slice(0, 2);

  return (
    <div className="py-8">
      <div className="container">
        <ProjectDetail project={project} />

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <div className="mt-16">
            <SectionHeading
              title="Related Projects"
              subtitle="Similar projects you might be interested in."
            />
            <div className="mt-6">
              <ProjectGrid projects={relatedProjects} columns={2} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

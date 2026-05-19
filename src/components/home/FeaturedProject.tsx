import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Project } from '@/types';

// ============================================
// Types
// ============================================

export interface FeaturedProjectProps {
  project: Project;
}

// ============================================
// Component
// ============================================

export function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <Card padding="none" className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative aspect-video lg:aspect-auto">
              <Image
                src={project.screenshots[0] || '/images/placeholder.png'}
                alt={project.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
              <div className="mb-4 flex items-center gap-2">
                <Badge variant="accent">Featured Project</Badge>
                <Badge variant="default">{project.status}</Badge>
              </div>

              <h3 className="text-text-primary text-2xl font-bold md:text-3xl">{project.name}</h3>

              <p className="text-text-secondary mt-4">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button
                    asChild
                    style={{ backgroundColor: '#0D9488', color: '#ffffff' }}
                    className="hover:opacity-90"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="outline" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Source Code
                    </a>
                  </Button>
                )}
                <Button variant="ghost" asChild>
                  <Link href={`/code/${project.slug}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}

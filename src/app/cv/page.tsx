import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getCVData } from '@/data/cv';
import { formatDate } from '@/lib/utils';
import {
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Heart,
} from 'lucide-react';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'CV / Resume',
  description: 'My professional experience, education, and skills.',
};

// ============================================
// CV Page
// ============================================

export default async function CVPage() {
  const cv = await getCVData();

  return (
    <>
      <PageHeader
        title="CV / Resume"
        description="My professional experience, education, and skills."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild>
            <a href="/cv.pdf" download>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Link>
          </Button>
        </div>
      </PageHeader>

      <section className="pb-12 md:pb-16">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            {/* Summary */}
            <div>
              <h2 className="text-text-primary mb-4 flex items-center gap-2 text-2xl font-bold">
                <Heart className="text-accent h-5 w-5" />
                Summary
              </h2>
              <Card>
                <p className="text-text-secondary leading-relaxed">{cv.summary}</p>
              </Card>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Briefcase className="text-accent h-5 w-5" />
                Experience
              </h2>
              <div className="space-y-6">
                {cv.experience.map((exp) => (
                  <Card key={exp.id}>
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-text-primary text-xl font-semibold">{exp.role}</h3>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      <div className="text-text-muted text-left text-sm md:text-right">
                        <p className="flex items-center gap-1 md:justify-end">
                          <Calendar className="h-4 w-4" />
                          {formatDate(exp.startDate, 'MMM yyyy')} —{' '}
                          {exp.current ? 'Present' : formatDate(exp.endDate!, 'MMM yyyy')}
                        </p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </p>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4">{exp.description}</p>

                    <h4 className="text-text-primary mb-2 text-sm font-semibold tracking-wider uppercase">
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, index) => (
                        <li
                          key={index}
                          className="text-text-secondary flex items-start gap-2 text-sm"
                        >
                          <span className="text-accent mt-1">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    {exp.techStack && (
                      <div className="border-border mt-4 border-t pt-4">
                        <div className="flex flex-wrap gap-1.5">
                          {exp.techStack.map((tech) => (
                            <Badge key={tech} variant="default" size="sm">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <GraduationCap className="text-accent h-5 w-5" />
                Education
              </h2>
              <div className="space-y-6">
                {cv.education.map((edu) => (
                  <Card key={edu.id}>
                    <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-text-primary text-xl font-semibold">{edu.degree}</h3>
                        <p className="text-accent font-medium">{edu.institution}</p>
                      </div>
                      <div className="text-text-muted text-left text-sm md:text-right">
                        <p className="flex items-center gap-1 md:justify-end">
                          <Calendar className="h-4 w-4" />
                          {formatDate(edu.startDate, 'MMM yyyy')} —{' '}
                          {formatDate(edu.endDate, 'MMM yyyy')}
                        </p>
                        <p className="flex items-center gap-1 md:justify-end">
                          <MapPin className="h-4 w-4" />
                          {edu.location}
                        </p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>

                    {edu.highlights && (
                      <ul className="space-y-2">
                        {edu.highlights.map((highlight, index) => (
                          <li
                            key={index}
                            className="text-text-secondary flex items-start gap-2 text-sm"
                          >
                            <span className="text-accent mt-1">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Code className="text-accent h-5 w-5" />
                Skills
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {cv.skills.map((skillGroup) => (
                  <Card key={skillGroup.category}>
                    <h3 className="text-text-primary mb-3 font-semibold">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((skill) => (
                        <Badge key={skill} variant="default" size="sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h2 className="text-text-primary mb-6 flex items-center gap-2 text-2xl font-bold">
                <Award className="text-accent h-5 w-5" />
                Certifications
              </h2>
              <div className="space-y-4">
                {cv.certifications.map((cert) => (
                  <Card key={cert.id}>
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-text-primary font-semibold">{cert.name}</h3>
                        <p className="text-text-secondary text-sm">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-text-muted text-sm">
                          {formatDate(cert.date, 'MMM yyyy')}
                        </span>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent-hover"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Content & Community */}
            <div>
              <h2 className="text-text-primary mb-6 text-2xl font-bold">Content & Community</h2>
              <Card>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-text-primary font-semibold">YouTube</h3>
                    <p className="text-text-secondary text-sm">
                      Creating weekly content about books, learning, and personal development. 1
                      long-form video + 7 shorts per week.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold">Newsletter</h3>
                    <p className="text-text-secondary text-sm">
                      Weekly newsletter sharing insights from books, running, and building in
                      public.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-text-primary font-semibold">Open Source</h3>
                    <p className="text-text-secondary text-sm">
                      Active contributor to open source projects. Building tools that help
                      developers.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <Card className="bg-accent-light">
                <h2 className="text-text-primary mb-2 text-2xl font-bold">
                  Interested in working together?
                </h2>
                <p className="text-text-secondary mb-6">
                  I'm always open to new opportunities and interesting conversations.
                </p>
                <Button size="lg" asChild>
                  <Link href="/contact">
                    <Mail className="mr-2 h-4 w-4" />
                    Get in Touch
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

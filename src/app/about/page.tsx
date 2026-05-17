import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { personalInfo, socialLinks } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { getRunningStats } from '@/data/running';
import { getCurrentBook } from '@/data/books';
import { getProjects } from '@/data/projects';
import { decodeHtmlEntities } from '@/lib/utils';
import { ArrowRight, Download, Mail, Youtube, Github, Instagram, Facebook } from 'lucide-react';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${personalInfo.name} — runner, reader, Coder, and content creator.`,
};

// ============================================
// About Page
// ============================================

export default async function AboutPage() {
  // Fetch dynamic data
  const [stats, currentBook, projects] = await Promise.all([
    getRunningStats(),
    getCurrentBook(),
    getProjects(),
  ]);

  const runningValue = `Day ${stats.currentStreak} of daily 5km`;
  const readingValue = currentBook
    ? currentBook.title
    : "No book currently reading";
  const buildingValue = projects.length > 0
    ? projects[0].name
    : "Working on something";

  return (
    <>
      <PageHeader title="About Me" description="Runner. Reader. Coder. Here's my story." />

      <section className="pb-12 md:pb-16">
        <div className="container">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Bio */}
              <div className="prose max-w-none">
                <p className="text-text-secondary text-lg leading-relaxed">{personalInfo.bio}</p>
              </div>

              {/* What I Do */}
              <div className="mt-12">
                <h2 className="text-text-primary mb-6 text-2xl font-bold">What I Do</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">🏃 Running</h3>
                    <p className="text-text-secondary mt-2">
                      I run 5km every day. It's not about speed—it's about showing up consistently
                      and building discipline that carries into everything else.
                    </p>
                    <Link
                      href="/running"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      View my running journey <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">📚 Reading</h3>
                    <p className="text-text-secondary mt-2">
                      I read one book per week and create videos summarizing the key ideas. It's my
                      way of learning in public and helping others learn too.
                    </p>
                    <Link
                      href="/reading"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      See what I'm reading <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">💻 Coding</h3>
                    <p className="text-text-secondary mt-2">
                      I build things with code—web applications, tools, and products that solve real
                      problems. Clean, maintainable software is my focus.
                    </p>
                    <Link
                      href="/code"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      View my projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">🎥 Content</h3>
                    <p className="text-text-secondary mt-2">
                      I create content about faith, learning, psychology, health, and performance.
                      One long-form video and seven shorts every week.
                    </p>
                    <Link
                      href="/content"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      Watch my content <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>
                </div>
              </div>

              {/* Values */}
              <div className="mt-12">
                <h2 className="text-text-primary mb-6 text-2xl font-bold">My Values</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">01</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">
                        Consistency Over Intensity
                      </h3>
                      <p className="text-text-secondary mt-1">
                        Small actions, repeated daily, compound into extraordinary results. I'd
                        rather do something moderately every day than intensely once a week.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">02</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">Learn in Public</h3>
                      <p className="text-text-secondary mt-1">
                        Sharing what I learn helps me understand it better and helps others along
                        the way. Teaching is the best form of learning.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">03</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">Build Things That Matter</h3>
                      <p className="text-text-secondary mt-1">
                        Whether it's code, content, or habits—I focus on creating things that
                        provide real value to real people.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">04</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">Faith as Foundation</h3>
                      <p className="text-text-secondary mt-1">
                        My faith informs everything I do—how I work, how I treat others, and how I
                        approach challenges. It's the foundation of my life.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Avatar Card */}
                <Card className="text-center">
                  <div className="relative mx-auto mb-4 h-32 w-32">
                    <Image
                      src={personalInfo.avatar}
                      alt={personalInfo.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="128px"
                    />
                  </div>
                  <h2 className="text-text-primary text-center text-xl font-semibold">{personalInfo.name}</h2>
                  <p className="text-text-secondary mt-1 text-center">{personalInfo.tagline}</p>
                  <p className="text-text-muted mt-1 text-center text-sm">{personalInfo.location}</p>
                </Card>

                {/* Quick Links */}
                <Card>
                  <h3 className="text-text-primary mb-4 font-semibold">Quick Links</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/cv">
                        <Download className="mr-2 h-4 w-4" />
                        Download CV
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Get in Touch
                      </Link>
                    </Button>
                  </div>
                </Card>

                {/* Social Links */}
                <Card>
                  <h3 className="text-text-primary mb-4 font-semibold">Connect</h3>
                  <div className="space-y-2">
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Youtube className="h-5 w-5 text-red-500" />
                      <span className="text-text-secondary text-sm">@joshua_argent</span>
                    </a>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Github className="text-text-primary h-5 w-5" />
                      <span className="text-text-secondary text-sm">@joshuaargent</span>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-pink-500" />
                      <span className="text-text-secondary text-sm">@joshua_argent</span>
                    </a>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="text-text-secondary text-sm">@joshua_argent</span>
                    </a>
                    <a
                      href={socialLinks.strava}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066l-2.084 8.116zM12.735 8.403L9.141 0H0l5.338 15.597h3.182l.215-1.397 3.182-7.797h-3.182l.215-2.055 1.833-4.944h-2.918z" />
                      </svg>
                      <span className="text-text-secondary text-sm">Strava</span>
                    </a>
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.12-.41.12-.43 1-.37 1.58.22.24.57.4 1.03.4.04 0 .09.01.14-.03.43-.26.83-.56 1.2-.87.34-.31.75-.51 1.2-.49.33.01.67.16.92.46.13.16.13 1.13-.16 1.56-.33.5-.88.84-1.46.86-.07.01-.15-.02-.22-.02-.04 2.01 1.51 3.98 3.45 4.18 1.08.11 2.18-.2 2.91-1.01.73-.81 1.11-1.87.97-2.92-.14-1.03-.89-1.89-1.99-2.1-.63-.12-1.3-.03-1.89.27-.3.15-.46.47-.44.8v-.01c-.02.32.13.62.38.83.5.41 1.18.36 1.77.23.42-.09.84-.27 1.16-.52.32-.25.49-.69.49-1.12V.02z" />
                      </svg>
                      <span className="text-text-secondary text-sm">@joshuaargent5</span>
                    </a>
                  </div>
                </Card>

                {/* Now */}
                <Card>
                  <h3 className="text-text-primary mb-4 font-semibold">What I'm Doing Now</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-text-muted">📖 Reading:</span>
                      <span className="text-text-secondary ml-2">{readingValue}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">🏃 Running:</span>
                      <span className="text-text-secondary ml-2">{runningValue}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">💻 Building:</span>
                      <span className="text-text-secondary ml-2">{buildingValue}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

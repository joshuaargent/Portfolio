import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { personalInfo, socialLinks } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, Download, Mail, Youtube, Github, Instagram, Facebook } from 'lucide-react';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${personalInfo.name} — runner, reader, builder, and content creator.`,
};

// ============================================
// About Page
// ============================================

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About Me" description="Runner. Reader. Builder. Here's my story." />

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
                  <h2 className="text-text-primary text-xl font-semibold">{personalInfo.name}</h2>
                  <p className="text-text-secondary mt-1">{personalInfo.tagline}</p>
                  <p className="text-text-muted mt-1 text-sm">{personalInfo.location}</p>
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
                      <span className="text-text-secondary text-sm">YouTube</span>
                    </a>
                    <a
                      href={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Github className="text-text-primary h-5 w-5" />
                      <span className="text-text-secondary text-sm">GitHub</span>
                    </a>
                    <a
                      href={socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Instagram className="h-5 w-5 text-pink-500" />
                      <span className="text-text-secondary text-sm">Instagram</span>
                    </a>
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span className="text-text-secondary text-sm">Facebook</span>
                    </a>
                  </div>
                </Card>

                {/* Now */}
                <Card>
                  <h3 className="text-text-primary mb-4 font-semibold">What I'm Doing Now</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-text-muted">📖 Reading:</span>
                      <span className="text-text-secondary ml-2">Atomic Habits</span>
                    </div>
                    <div>
                      <span className="text-text-muted">🏃 Running:</span>
                      <span className="text-text-secondary ml-2">Day 87 of daily 5km</span>
                    </div>
                    <div>
                      <span className="text-text-muted">💻 Building:</span>
                      <span className="text-text-secondary ml-2">This website</span>
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

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
  description: `Learn more about ${personalInfo.name} | runner, reader, Coder, and content creator.`,
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
  const readingValue = currentBook ? currentBook.title : 'No book currently reading';
  const buildingValue = projects.length > 0 ? projects[0].name : 'Working on something';

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
                    <h3 className="text-text-primary text-lg font-semibold">Running</h3>
                    <p className="text-text-secondary mt-2">
                      I run 5km every day. It's not primarily about speed, but mainly the discipline
                      and consistency that carries over to other aspects of life and drives you to
                      success.
                    </p>
                    <Link
                      href="/running"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      View my running journey <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">Reading</h3>
                    <p className="text-text-secondary mt-2">
                      I read one book per week and create videos that analyse the key ideas.
                      Teaching others is important for shared growth and also helps you learn the
                      information.
                    </p>
                    <Link
                      href="/reading"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      See what I'm reading <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">Coding</h3>
                    <p className="text-text-secondary mt-2">
                      I am a full stack developer so I code websites, tools, and products that solve
                      actual problems people have. Clean, maintainable software is my primary focus.
                    </p>
                    <Link
                      href="/code"
                      className="text-accent hover:text-accent-hover mt-3 inline-flex items-center text-sm"
                    >
                      View my projects <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Card>

                  <Card>
                    <h3 className="text-text-primary text-lg font-semibold">ontent</h3>
                    <p className="text-text-secondary mt-2">
                      I create content about faith, learning, psychology, health, and performance.
                      One long form video and twenty shorts a week; I will do more long form in
                      future.
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
                      <h3 className="text-text-primary font-semibold">Faith is Foundational</h3>
                      <p className="text-text-secondary mt-1">
                        Faith is at the root of what I do, how I work, how I treat others, and how I
                        approach life. The Lord has to come before all things. I fail a lot with
                        this and I aim to grow to become better at sinning less. Praise the Lord who
                        has saved us even though we will always fall short.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">02</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">Honesty and Integrity</h3>
                      <p className="text-text-secondary mt-1">
                        Being honest is a staple of being an good person. Sometimes the truth can be
                        offensive to others and you may not like the truth very much; it is key that
                        you stay truthful even in light of aversion. Integrity is also about having
                        a consistent character no matter who your audience is.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">03</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">
                        Discipline and Consistency
                      </h3>
                      <p className="text-text-secondary mt-1">
                        I obsess over things that matter to me; if I don't do something every day,
                        I'm not likely to do it very often. Even if you aren't motivated to do
                        something you can still be consistent and disciplined which I think is a
                        major attribute amongst those who succeed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-accent-light rounded-lg p-2">
                      <span className="text-accent">04</span>
                    </div>
                    <div>
                      <h3 className="text-text-primary font-semibold">Love and Appreciation</h3>
                      <p className="text-text-secondary mt-1">
                        Love is about helping and putting the needs of others before yourself. Love
                        isn't always doing what a person wants. Showing appreciation is incredibly
                        underdone. Next time you dislike or want someone to do something, try first
                        to find the things you appreciate about them.
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
                  <h2 className="text-text-primary text-center text-xl font-semibold">
                    {personalInfo.name}
                  </h2>
                  <p className="text-text-secondary mt-1 text-center">{personalInfo.tagline}</p>
                  <p className="text-text-muted mt-1 text-center text-sm">
                    {personalInfo.location}
                  </p>
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
                      <svg className="h-5 w-5 text-orange-500" viewBox="0 0 16 16">
                        <path
                          fill="currentColor"
                          d="M6.731 0 2 9.125h2.788L6.73 5.497l1.93 3.628h2.766zm4.694 9.125-1.372 2.756L8.66 9.125H6.547L10.053 16l3.484-6.875z"
                        />
                      </svg>
                      <span className="text-text-secondary text-sm">@500534339</span>
                    </a>
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:bg-bg-secondary flex items-center gap-3 rounded-lg p-2 transition-colors"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 16 16">
                        <path
                          fill="black"
                          d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"
                        />
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
                      <span className="text-text-muted">Reading:</span>
                      <span className="text-text-secondary ml-2">{readingValue}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Running:</span>
                      <span className="text-text-secondary ml-2">{runningValue}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Building:</span>
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

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Activity, BookOpen, Code, Lightbulb, ArrowRight } from 'lucide-react';
import { getRunningStats } from '@/data/running';
import { getBooks } from '@/data/books';
import { getProjects } from '@/data/projects';
import { getContentPieces } from '@/data/content';
import { getVideos } from '@/data/videos';

// ============================================
// Types
// ============================================

interface Pillar {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  stats?: string;
}

// ============================================
// Component
// ==============================================

export async function PillarCards() {
  // Fetch dynamic stats
  const [stats, books, projects, content, videos] = await Promise.all([
    getRunningStats(),
    getBooks(),
    getProjects(),
    getContentPieces(),
    getVideos(),
  ]);

  // Total content includes both articles (contentPieces) and videos
  const totalContent = content.length + videos.length;

  const pillars: Pillar[] = [
    {
      title: 'Running',
      description:
        '5km every day. Staying consistent and disciplined is a key component to success.',
      icon: <Activity className="h-6 w-6" />,
      href: '/running',
      stats: `${stats.currentStreak} day streak`,
    },
    {
      title: 'Reading',
      description:
        'One book per week. Sharing my analysis with actionable steps to help you improve.',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/reading',
      stats: `${books.length} books`,
    },
    {
      title: 'Code',
      description:
        'Building websites for friends, communities and businesses. Clean, maintainable software.',
      icon: <Code className="h-6 w-6" />,
      href: '/code',
      stats: `${projects.length} projects`,
    },
    {
      title: 'Content',
      description: 'Sharing what I learn about faith, psychology, health, and performance.',
      icon: <Lightbulb className="h-6 w-6" />,
      href: '/content',
      stats: `${totalContent} posts`,
    },
  ];

  return (
    <section className="py-8 md:py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pillars.map((pillar) => (
            <Card key={pillar.title} hover className="group">
              <Link href={pillar.href} className="block">
                <div className="flex items-start gap-4">
                  <div className="bg-accent-light text-accent rounded-xl p-3">{pillar.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-text-primary text-xl font-semibold">{pillar.title}</h3>
                      <ArrowRight className="text-text-muted group-hover:text-accent h-5 w-5 transition-all group-hover:translate-x-1" />
                    </div>
                    <p className="text-text-secondary mt-2">{pillar.description}</p>
                    {pillar.stats && (
                      <p className="text-accent mt-3 text-sm font-medium">{pillar.stats}</p>
                    )}
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Activity, BookOpen, Code, Lightbulb, ArrowRight } from 'lucide-react';

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
// ============================================

export function PillarCards() {
  const pillars: Pillar[] = [
    {
      title: 'Running',
      description: '5km every day. Building consistency, one step at a time.',
      icon: <Activity className="h-6 w-6" />,
      href: '/running',
      stats: '87 day streak',
    },
    {
      title: 'Reading',
      description: 'One book per week. Distilling key ideas into actionable insights.',
      icon: <BookOpen className="h-6 w-6" />,
      href: '/reading',
      stats: '52 books/year',
    },
    {
      title: 'Code',
      description: 'Building things that solve real problems. Clean, maintainable software.',
      icon: <Code className="h-6 w-6" />,
      href: '/code',
      stats: '12 projects',
    },
    {
      title: 'Content',
      description: 'Sharing what I learn about faith, psychology, health, and performance.',
      icon: <Lightbulb className="h-6 w-6" />,
      href: '/content',
      stats: '1 long-form + 7 shorts/week',
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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

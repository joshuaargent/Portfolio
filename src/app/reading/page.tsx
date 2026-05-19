import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { CurrentBook } from '@/components/reading/CurrentBook';
import { BookGrid } from '@/components/reading/BookGrid';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getCurrentBook, getRecentBooks } from '@/data/books';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reading',
  description: 'One book per week. Distilling key ideas into actionable insights.',
};

export default async function ReadingPage() {
  const [currentBook, recentBooks] = await Promise.all([
    getCurrentBook(),
    getRecentBooks(6),
  ]);

  return (
    <>
      <PageHeader
        title="Reading"
        description="One book per week. Distilling key ideas into actionable insights."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {currentBook && (
            <div className="mb-12">
              <CurrentBook book={currentBook} progress={60} />
            </div>
          )}

          <div>
            <SectionHeading
              title="Books Read"
              subtitle={`So far this year: ${recentBooks.length} books completed.`}
              action={{ label: 'View all', href: '/reading/books' }}
            />
            <div className="mt-6">
              <BookGrid books={recentBooks} columns={2} />
            </div>
          </div>

          <div className="mt-16">
            <Card>
              <h2 className="text-text-primary mb-4 text-2xl font-bold">My Reading Philosophy</h2>
              <div className="prose max-w-none">
                <p>
                  I read one book per week. It's not about speed reading or skipping
                  pages—it's about making reading a daily habit and being intentional about
                  what I read.
                </p>
                <h3>How I Read</h3>
                <ul>
                  <li>
                    <strong>30-60 minutes daily.</strong> Usually in the morning before starting
                    work.
                  </li>
                  <li>
                    <strong>Take notes.</strong> I highlight key ideas and write summaries.
                  </li>
                  <li>
                    <strong>Create content.</strong> Each book becomes one long-form video and seven
                    shorts.
                  </li>
                  <li>
                    <strong>Apply what I learn.</strong> Knowledge without action is just trivia.
                  </li>
                </ul>
                <h3>What I Read</h3>
                <p>
                  I focus on books about faith, psychology, health, performance, and learning. I
                  believe in reading widely but deeply—understanding a few books well is better than
                  skimming many.
                </p>
                <p>
                  Teaching others is important for shared growth and also helps you learn the information.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

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
  description: 'One book per week. Analysing key ideas to form actionable steps',
};

export default async function ReadingPage() {
  const [currentBook, recentBooks] = await Promise.all([getCurrentBook(), getRecentBooks(6)]);

  return (
    <>
      <PageHeader
        title="Reading"
        description="One book per week. Analysing key ideas to form actionable steps."
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
              <h2 className="text-text-primary mb-4 text-2xl font-bold">My Approach to Reading</h2>
              <div className="prose max-w-none">
                <p>
                  I read one book per week. It's not about speed reading or skipping pages. It's
                  about making reading a daily habit and being intentional about what I read as it's
                  incredibly important for self growth and literacy.
                </p>
                <h3>How I Read</h3>
                <ul>
                  <li>
                    <strong> At least an hour a day.</strong> It doesn't matter when, just do it.
                  </li>
                  <li>
                    <strong>Take notes.</strong> Taking notes ensures you remember key ideas.
                  </li>
                  <li>
                    <strong>Apply what you learn.</strong> Knowledge without action is pointless.
                  </li>
                </ul>
                <h3>What I Read</h3>
                <p>
                  I focus on books about faith, psychology, health, performance, and learning. I
                  believe in reading widely but deeply. I don't read may fantasy books but Enid
                  Blyton and C. S. Lewis are noticeable mentions. Teaching others about what I have
                  read helps me remember, learn and hopefully helps others in their journey.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

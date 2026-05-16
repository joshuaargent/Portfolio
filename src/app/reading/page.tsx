import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { CurrentBook } from '@/components/reading/CurrentBook';
import { BookGrid } from '@/components/reading/BookGrid';
import { VideoEmbed } from '@/components/video/VideoEmbed';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getCurrentBook, getRecentBooks } from '@/data/books';
import { getLongFormVideos, getRecentNonRunningVideos } from '@/data/videos';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reading',
  description: 'One book per week. Distilling key ideas into actionable insights.',
};

export default async function ReadingPage() {
  const [currentBook, recentBooks, longFormVideos, recentVideos] = await Promise.all([
    getCurrentBook(),
    getRecentBooks(6),
    getLongFormVideos(),
    getRecentNonRunningVideos(4),
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

          <div className="mb-12">
            <SectionHeading
              title="This Week's Content"
              subtitle="Long-form summary and short videos about the current book."
            />
            <div className="mt-6">
              {longFormVideos.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="lg:col-span-2">
                    <VideoEmbed
                      videoId={longFormVideos[0].youtubeId}
                      title={longFormVideos[0].title}
                    />
                    <h3 className="text-text-primary mt-4 text-lg font-semibold">
                      {longFormVideos[0].title}
                    </h3>
                    <p className="text-text-secondary mt-2">{longFormVideos[0].description}</p>
                  </div>

                  <div className="space-y-4">
                    {recentVideos.map((video) => (
                      <a
                        key={video.id}
                        href={`https://youtube.com/shorts/${video.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                      >
                        <div className="bg-bg-secondary relative aspect-video overflow-hidden rounded-lg">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
                            <div className="text-accent rounded-full bg-white/90 p-2">
                              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <h4 className="text-text-primary group-hover:text-accent mt-2 line-clamp-2 text-sm font-medium transition-colors">
                          {video.title}
                        </h4>
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-text-muted">No videos yet for this week.</p>
              )}
            </div>
          </div>

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
                  I read one book per week. It&apos;s not about speed reading or skipping
                  pages—it&apos;s about making reading a daily habit and being intentional about
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
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

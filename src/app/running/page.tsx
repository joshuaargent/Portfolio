import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { StreakCounter } from '@/components/running/StreakCounter';
import { StreakCalendar } from '@/components/running/StreakCalendar';
import { RunStats } from '@/components/running/RunStats';
import { RunShortCard } from '@/components/running/RunShortCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { getRunningStats, getRunLogs, getRecentRuns } from '@/data/running';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Running',
  description: 'My daily 5km running journey. Building consistency, one step at a time.',
};

// ============================================
// Running Page
// ============================================

export default async function RunningPage() {
  const [stats, allRuns, recentRuns] = await Promise.all([
    getRunningStats(),
    getRunLogs(),
    getRecentRuns(6),
  ]);

  return (
    <>
      <PageHeader
        title="Running"
        description="5km every day. Building consistency, one step at a time."
      />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {/* Stats */}
          <div className="mb-12">
            <StreakCounter stats={stats} />
          </div>

          {/* Calendar */}
          <div className="mb-12">
            <StreakCalendar runs={allRuns} />
          </div>

          {/* Weekly Stats */}
          <div className="mb-12">
            <SectionHeading title="This Week" subtitle="How I've been doing lately." />
            <div className="mt-6">
              <RunStats runs={allRuns} />
            </div>
          </div>

          {/* Recent Runs */}
          <div>
            <SectionHeading
              title="Recent Runs"
              subtitle="My latest daily runs with notes and videos."
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentRuns.map((run) => (
                <RunShortCard key={run.id} run={run} />
              ))}
            </div>
          </div>

          {/* My Approach */}
          <div className="mt-16">
            <Card>
              <h2 className="text-text-primary mb-4 text-2xl font-bold">My Approach to Running</h2>
              <div className="prose max-w-none">
                <p>
                  I started running every day on October 20, 2024. The goal was simple: run 5km
                  every day, no matter what. Not for speed, not for distance—just for the discipline
                  of showing up.
                </p>
                <p>Here's what I've learned:</p>
                <ul>
                  <li>
                    <strong>Start small.</strong> 5km is achievable on even the worst days.
                  </li>
                  <li>
                    <strong>Consistency beats intensity.</strong> A moderate effort every day beats
                    a heroic effort once a week.
                  </li>
                  <li>
                    <strong>You won't always feel like it.</strong> That's the point. You do it
                    anyway.
                  </li>
                  <li>
                    <strong>Track your progress.</strong> Seeing the streak grow is motivating.
                  </li>
                </ul>
                <p>
                  If you're thinking about starting a daily running habit, my advice is simple:
                  start with a week. Just one week. See how it feels. You might surprise yourself.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

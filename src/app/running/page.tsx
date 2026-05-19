import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { StreakCounter } from '@/components/running/StreakCounter';
import { StreakCalendar } from '@/components/running/StreakCalendar';
import { RunShortCard } from '@/components/running/RunShortCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { PersonalRecords } from '@/components/running/PersonalRecords';
import { GoalTracker } from '@/components/running/GoalTracker';
import {
  getRunningStats,
  getRunLogs,
  getRecentRunsWithVideos,
  type RunWithVideo,
} from '@/data/running';
import { runningGoals } from '@/lib/constants';

// ============================================
// Metadata
// ============================================

export const metadata: Metadata = {
  title: 'Running',
  description: "5km every day. Run with me if you're free.",
};

// ============================================
// Running Page
// ============================================

export default async function RunningPage() {
  const [stats, allRuns, recentRuns] = await Promise.all([
    getRunningStats(),
    getRunLogs(),
    getRecentRunsWithVideos(6),
  ]);

  return (
    <>
      <PageHeader title="Running" description="5km every day. Run with me if you're free." />

      <section className="pb-12 md:pb-16">
        <div className="container">
          {/* Main Stats - Current Streak & Totals */}
          <div className="mb-12">
            <StreakCounter stats={stats} />
          </div>

          {/* Goals & Progress */}
          <div className="mb-12">
            <SectionHeading title="Goals" subtitle="Track your progress." />
            <div className="mt-6">
              <GoalTracker
                stats={stats}
                runs={allRuns}
                weeklyGoal={runningGoals.weekly}
                monthlyGoal={runningGoals.monthly}
                yearlyGoal={runningGoals.yearly}
              />
            </div>
          </div>

          {/* Records & Predictions */}
          <div className="mb-12">
            <SectionHeading
              title="Records & Predictions"
              subtitle="Your best moments and what's possible."
            />
            <div className="mt-6">
              <PersonalRecords stats={stats} runs={allRuns} />
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-12">
            <StreakCalendar
              runs={allRuns}
              year={new Date().getFullYear()}
              avgPace={stats.averagePaceSeconds}
            />
          </div>

          {/* Recent Runs */}
          <div>
            <SectionHeading
              title="Recent Runs"
              subtitle="My latest daily runs with notes and videos."
              action={{ label: 'View all', href: '/running/videos' }}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentRuns.map((run) => (
                <RunShortCard key={run.id} run={run} video={run.video} />
              ))}
            </div>
          </div>

          {/* My Approach */}
          <div className="mt-16">
            <Card>
              <h2 className="text-text-primary mb-4 text-2xl font-bold">My Approach to Running</h2>
              <div className="prose max-w-none">
                <p>
                  I started running every day on the 4th May, 2026. The goal was simple: run 5km
                  every day, and share that with others. I figured by running and hopefully
                  inspiring others, I'd being doing two productive actions at once. It's not
                  primarily about speed, although we all aim for a better time, but for the
                  discipline and health benefits of doing such a challenge.
                </p>
                <p>Here's what I've learned:</p>
                <ul>
                  <li>
                    <strong>You can walk.</strong> Push yourself but not know your limits. Walk on
                    the rest days.
                  </li>
                  <li>
                    <strong>Track your progress.</strong> Seeing the streak and the seed grow is
                    motivating.
                  </li>
                  <li>
                    <strong>You won't always feel like it.</strong> Being disciplined is more
                    important than how you feel.
                  </li>
                </ul>
                <p>
                  If you're thinking about getting more healthy and want to start a habit, my advice
                  is simple: start now, don't wait and do it when you don't feel like it. Start
                  running.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

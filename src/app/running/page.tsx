import { Metadata } from 'next';
import { PageHeader } from '@/components/layout/PageHeader';
import { StreakCounter } from '@/components/running/StreakCounter';
import { StreakCalendar } from '@/components/running/StreakCalendar';
import { RunShortCard } from '@/components/running/RunShortCard';
import { SectionHeading } from '@/components/shared/SectionHeading';
import { Card } from '@/components/ui/Card';
import { PersonalRecords } from '@/components/running/PersonalRecords';
import { GoalTracker } from '@/components/running/GoalTracker';
import { DayOfWeekStats } from '@/components/running/DayOfWeekStats';
import { getRunningStats, getRunLogs, getRecentRuns } from '@/data/running';
import { runningGoals } from '@/lib/constants';

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
          {/* Main Stats - Current Streak & Totals */}
          <div className="mb-12">
            <StreakCounter stats={stats} />
          </div>

          {/* Goals & Progress */}
          <div className="mb-12">
            <SectionHeading title="Goals" subtitle="Track your progress." />
            <div className="mt-6">
              <GoalTracker stats={stats} runs={allRuns} weeklyGoal={runningGoals.weekly} monthlyGoal={runningGoals.monthly} yearlyGoal={runningGoals.yearly} />
            </div>
          </div>

          {/* Records & Predictions */}
          <div className="mb-12">
            <SectionHeading title="Records & Predictions" subtitle="Your best moments and what's possible." />
            <div className="mt-6">
              <PersonalRecords stats={stats} runs={allRuns} />
            </div>
          </div>

          {/* Calendar */}
          <div className="mb-12">
            <StreakCalendar runs={allRuns} />
          </div>

          {/* Day of Week */}
          <div className="mb-12">
            <DayOfWeekStats runs={allRuns} />
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

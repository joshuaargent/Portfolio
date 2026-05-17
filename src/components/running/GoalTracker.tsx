import { Card } from '@/components/ui/Card';
import { RunningStats, RunLog } from '@/types';
import { Target, TrendingUp, Calendar } from 'lucide-react';
import { runningGoals } from '@/lib/constants';

// ============================================
// Types
// ============================================

export interface GoalTrackerProps {
  stats: RunningStats;
  runs: RunLog[];
  weeklyGoal?: number;
  monthlyGoal?: number;
  yearlyGoal?: number;
}

// ============================================
// Component
// ============================================

export function GoalTracker({ stats, runs, weeklyGoal = runningGoals.weekly, monthlyGoal = runningGoals.monthly, yearlyGoal = runningGoals.yearly }: GoalTrackerProps) {
  // Get runs from last 7 days (relative to most recent data)
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mostRecentDate = sortedRuns.length > 0 ? new Date(sortedRuns[0].date) : new Date();
  
  // Calculate 7 days ago (exclude the exact day 7 days ago)
  const sevenDaysAgo = new Date(mostRecentDate);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0);
  
  const thisWeekRuns = runs.filter((run) => {
    const runDate = new Date(run.date);
    // Use > to exclude the exact 7 days ago date (only last 7 full days)
    return runDate > sevenDaysAgo && runDate <= mostRecentDate;
  });
  
  const thisWeekDistance = thisWeekRuns.reduce((sum, run) => sum + run.distance, 0);
  const weeklyProgress = Math.round((thisWeekDistance / weeklyGoal) * 100);
  
  // This month
  const thisMonthRuns = runs.filter((run) => {
    const runDate = new Date(run.date);
    return runDate.getMonth() === mostRecentDate.getMonth() && runDate.getFullYear() === mostRecentDate.getFullYear();
  });
  
  const thisMonthDistance = thisMonthRuns.reduce((sum, run) => sum + run.distance, 0);
  const monthlyProgress = Math.round((thisMonthDistance / monthlyGoal) * 100);
  
  // Predict end of month distance if keep current pace
  const daysInMonth = new Date(mostRecentDate.getFullYear(), mostRecentDate.getMonth() + 1, 0).getDate();
  const dayOfMonth = mostRecentDate.getDate();
  const daysLeft = daysInMonth - dayOfMonth;
  const avgDaily = thisMonthDistance / dayOfMonth;
  const projectedMonthDistance = Math.round(thisMonthDistance + (avgDaily * daysLeft));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Weekly Goal */}
      <GoalCard
        icon={<Target className="h-5 w-5 text-blue-500" />}
        title="This Week"
        current={thisWeekDistance}
        goal={weeklyGoal}
        progress={weeklyProgress}
        unit="km"
      />
      
      {/* Monthly Goal */}
      <GoalCard
        icon={<Calendar className="h-5 w-5 text-green-500" />}
        title="This Month"
        current={thisMonthDistance}
        goal={monthlyGoal}
        progress={monthlyProgress}
        unit="km"
      />
      
      {/* Year to Date */}
      <GoalCard
        icon={<TrendingUp className="h-5 w-5 text-purple-500" />}
        title="Year to Date"
        current={stats.ytdDistance}
        goal={yearlyGoal}
        progress={Math.round((stats.ytdDistance / yearlyGoal) * 100)}
        unit="km"
        subtitle={`${stats.ytdRuns} runs`}
      />
    </div>
  );
}

// ============================================
// Goal Card
// ============================================

interface GoalCardProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  goal: number;
  progress: number;
  unit: string;
  subtitle?: string;
  isProjection?: boolean;
}

function GoalCard({ icon, title, current, goal, progress, unit, subtitle, isProjection }: GoalCardProps) {
  const isComplete = progress >= 100;
  const progressClamped = Math.min(progress, 100);
  
  // Format distance consistently - show 1 decimal place
  const formattedCurrent = current.toFixed(1);
  
  return (
    <Card>
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <span className="font-semibold">{title}</span>
      </div>
      
      <div className="flex justify-between items-end mb-2">
        <span className="text-2xl font-bold">{formattedCurrent} / {goal}{unit}</span>
        <span className={`text-sm ${isComplete ? 'text-green-500' : 'text-text-secondary'}`}>
          {progress}%
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isComplete ? 'bg-green-500' : isProjection ? 'bg-purple-500' : 'bg-blue-500'
          }`}
          style={{ width: `${progressClamped}%` }}
        />
      </div>
      
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${isComplete ? 'text-green-500' : 'text-text-secondary'}`}>
          {isComplete ? 'goal reached!' : `${Math.max(0, (goal - current)).toFixed(1)} ${unit} left`}
        </span>
        {subtitle && (
          <span className="text-xs text-text-secondary">{subtitle}</span>
        )}
      </div>
    </Card>
  );
}
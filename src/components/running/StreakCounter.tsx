import { Card } from '@/components/ui/Card';
import { Flame, Timer, MapPin, TrendingUp } from 'lucide-react';
import { RunningStats } from '@/types';
import { formatDuration, formatPace, formatNumber } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface StreakCounterProps {
  stats: RunningStats;
}

// ============================================
// Component
// ============================================

export function StreakCounter({ stats }: StreakCounterProps) {
  const totalDist = typeof stats.totalDistance === 'number' ? stats.totalDistance : Number(stats.totalDistance) || 0;
  const avgDist = typeof stats.averageDistance === 'number' ? stats.averageDistance : Number(stats.averageDistance) || 0;
  
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        icon={<Flame className="h-5 w-5 text-orange-500" />}
        label="Current Streak"
        value={`${stats.currentStreak} days`}
        subtext={`Best: ${stats.longestStreak}`}
      />
      <StatCard
        icon={<MapPin className="text-accent h-5 w-5" />}
        label="Total Distance"
        value={`${totalDist.toFixed(2)} km`}
        subtext={`${avgDist.toFixed(2)} km avg/day`}
      />
      <StatCard
        icon={<Timer className="h-5 w-5 text-blue-500" />}
        label="Total Time"
        value={formatDuration(stats.totalTime)}
        subtext={`${formatPace(stats.averagePaceSeconds)} /km`}
      />
      <StatCard
        icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        label="Total Runs"
        value={`${stats.totalRuns}`}
        subtext={`${stats.thisWeekRuns} this week`}
      />
    </div>
  );
}

// ============================================
// Stat Card
// ============================================

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
}

function StatCard({ icon, label, value, subtext }: StatCardProps) {
  return (
    <Card className="text-center">
      <div className="mb-3 flex justify-center">
        <div className="bg-bg-secondary rounded-lg p-2">{icon}</div>
      </div>
      <p className="text-text-muted text-sm">{label}</p>
      <p className="text-text-primary mt-1 text-2xl font-bold">{value}</p>
      <p className="text-text-muted mt-1 text-xs">{subtext}</p>
    </Card>
  );
}

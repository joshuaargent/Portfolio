import { Card } from '@/components/ui/Card';
import { RunLog } from '@/types';
import { formatDuration, formatPace, formatDate } from '@/lib/utils';
import { Calendar, Clock, MapPin, Zap } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface RunStatsProps {
  runs: RunLog[];
}

// ============================================
// Component
// ============================================

export function RunStats({ runs }: RunStatsProps) {
  // Find the most recent run date in the data
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const mostRecentDate = sortedRuns.length > 0 ? new Date(sortedRuns[0].date) : new Date();
  
  // Calculate stats relative to the data's most recent date
  const weekAgo = new Date(mostRecentDate);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const thisWeekRuns = runs.filter((run) => {
    const runDate = new Date(run.date);
    return runDate >= weekAgo && runDate <= mostRecentDate;
  });

  // Use the most recent run's month/year as "this month"
  const thisMonthRuns = runs.filter((run) => {
    const runDate = new Date(run.date);
    return runDate.getMonth() === mostRecentDate.getMonth() && runDate.getFullYear() === mostRecentDate.getFullYear();
  });

  const averagePace =
    runs.length > 0
      ? runs.reduce(
          (sum, run) => sum + run.pace.split(':').reduce((a, b) => a * 60 + parseInt(b), 0),
          0
        ) / runs.length
      : 0;

  const feelingCounts = runs.reduce(
    (acc, run) => {
      acc[run.feeling] = (acc[run.feeling] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const mostCommonFeeling =
    Object.entries(feelingCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <MiniStat
        icon={<Calendar className="h-4 w-4" />}
        label="This Week"
        value={`${thisWeekRuns.length} runs`}
      />
      <MiniStat
        icon={<MapPin className="h-4 w-4" />}
        label="This Month"
        value={`${thisMonthRuns.length} runs`}
      />
      <MiniStat
        icon={<Clock className="h-4 w-4" />}
        label="Avg Pace"
        value={averagePace > 0 ? formatPace(averagePace) : 'N/A'}
      />
      <MiniStat icon={<Zap className="h-4 w-4" />} label="Avg Feeling" value={mostCommonFeeling} />
    </div>
  );
}

// ============================================
// Mini Stat
// ============================================

interface MiniStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function MiniStat({ icon, label, value }: MiniStatProps) {
  return (
    <Card className="flex items-center gap-3">
      <div className="bg-accent-light text-accent rounded-lg p-2">{icon}</div>
      <div>
        <p className="text-text-muted text-xs">{label}</p>
        <p className="text-text-primary font-semibold">{value}</p>
      </div>
    </Card>
  );
}

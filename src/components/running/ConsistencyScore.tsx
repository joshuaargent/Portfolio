import { Card } from '@/components/ui/Card';
import { RunningStats, RunLog } from '@/types';
import { Heart } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface ConsistencyScoreProps {
  stats: RunningStats;
  runs: RunLog[];
}

// ============================================
// Component
// ============================================

export function ConsistencyScore({ stats, runs }: ConsistencyScoreProps) {
  if (runs.length === 0) {
    return null;
  }

  // Get first run date from data
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const firstRunDate = new Date(sortedRuns[0].date);
  firstRunDate.setHours(0, 0, 0, 0);
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Calculate total days since first run
  const totalDays = Math.floor((today.getTime() - firstRunDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // Count unique days with runs
  const runDays = new Set(runs.map(r => r.date)).size;
  
  // Calculate consistency % (100% = every day since first run)
  const consistencyPercent = Math.round((runDays / totalDays) * 100);
  
  // Get grade
  let grade: string;
  let color: string;
  if (consistencyPercent >= 95) {
    grade = 'A+';
    color = 'text-green-500';
  } else if (consistencyPercent >= 85) {
    grade = 'A';
    color = 'text-green-500';
  } else if (consistencyPercent >= 75) {
    grade = 'B';
    color = 'text-green-400';
  } else if (consistencyPercent >= 65) {
    grade = 'C+';
    color = 'text-yellow-400';
  } else if (consistencyPercent >= 55) {
    grade = 'C';
    color = 'text-yellow-500';
  } else if (consistencyPercent >= 45) {
    grade = 'D';
    color = 'text-orange-500';
  } else {
    grade = 'F';
    color = 'text-red-500';
  }
  
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-text-muted text-sm">Consistency</span>
          </div>
          <div className={`text-4xl font-bold ${color}`}>
            {grade}
          </div>
        </div>
        
        <div className="text-right space-y-1">
          <ScoreBar label="Days" value={consistencyPercent} />
          <div className="text-xs text-text-muted">
            {runDays} of {totalDays} days
          </div>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Score Bar
// ============================================

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-muted">{value}%</span>
      </div>
      <div className="h-1.5 w-20 bg-bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
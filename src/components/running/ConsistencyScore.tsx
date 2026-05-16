import { Card } from '@/components/ui/Card';
import { RunningStats } from '@/types';
import { Heart, Zap } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface ConsistencyScoreProps {
  stats: RunningStats;
}

// ============================================
// Component
// ============================================

export function ConsistencyScore({ stats }: ConsistencyScoreProps) {
  const totalRuns = stats.totalRuns;
  const currentStreak = stats.currentStreak;
  const longestStreak = stats.longestStreak;
  
  // Calculate consistency score (0-100)
  // Based on: runs this month vs expected monthly runs
  // Expected: ~20 runs/month (about 5 per week) for daily runner
  const expectedRunsPerMonth = 20; // ~5 runs/week
  const runScore = Math.min(100, Math.round((stats.thisMonthRuns / expectedRunsPerMonth) * 100));
  
  const streakScore = Math.min(100, Math.round((longestStreak / 14) * 100)); // 14 day streak = 100
  
  const overallScore = Math.round((runScore * 0.5 + streakScore * 0.5));
  
  // Get grade - now more achievable
  let grade: string;
  let color: string;
  if (overallScore >= 95) {
    grade = 'A+';
    color = 'text-green-500';
  } else if (overallScore >= 85) {
    grade = 'A';
    color = 'text-green-500';
  } else if (overallScore >= 75) {
    grade = 'B';
    color = 'text-green-400';
  } else if (overallScore >= 65) {
    grade = 'C+';
    color = 'text-yellow-400';
  } else if (overallScore >= 55) {
    grade = 'C';
    color = 'text-yellow-500';
  } else if (overallScore >= 45) {
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
          <ScoreBar label="Runs" value={runScore} max={100} />
          <ScoreBar label="Streak" value={streakScore} max={100} />
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Score Bar
// ============================================

function ScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const percent = Math.round((value / max) * 100);
  
  return (
    <div className="text-right">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-text-muted">{label}</span>
        <span className="text-text-muted">{value}%</span>
      </div>
      <div className="h-1.5 w-20 bg-bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
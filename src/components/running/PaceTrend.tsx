import { Card } from '@/components/ui/Card';
import { RunLog } from '@/types';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface PaceTrendProps {
  runs: RunLog[];
}

// ============================================
// Component
// ============================================

export function PaceTrend({ runs }: PaceTrendProps) {
  // Sort runs by date
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  if (sortedRuns.length < 2) {
    return (
      <Card>
        <div className="text-center text-text-muted py-4">
          Need at least 2 runs to show trend
        </div>
      </Card>
    );
  }
  
  // Split into first half and second half
  const midpoint = Math.floor(sortedRuns.length / 2);
  const firstHalf = sortedRuns.slice(0, midpoint);
  const secondHalf = sortedRuns.slice(midpoint);
  
  const firstHalfAvg = firstHalf.reduce((sum, run) => sum + (run.paceSeconds || 0), 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, run) => sum + (run.paceSeconds || 0), 0) / secondHalf.length;
  
  if (firstHalfAvg === 0 || secondHalfAvg === 0) {
    return (
      <Card>
        <div className="text-center text-text-muted py-4">
          Not enough pace data to show trend
        </div>
      </Card>
    );
  }
  
  const difference = firstHalfAvg - secondHalfAvg; // Positive = getting faster
  const percentChange = Math.round((difference / firstHalfAvg) * 100);
  const isFaster = difference > 0;
  const isSignificantlyFaster = Math.abs(percentChange) >= 5;
  
  // Get recent pace
  const recentRuns = sortedRuns.slice(-5);
  const recentAvgPace = recentRuns.reduce((sum, run) => sum + (run.paceSeconds || 0), 0) / recentRuns.length;
  
  return (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-text-muted text-sm mb-1">Pace Trend</div>
          <div className="flex items-center gap-2">
            {isFaster ? (
              <TrendingDown className="h-5 w-5 text-green-500" />
            ) : (
              <TrendingUp className="h-5 w-5 text-red-500" />
            )}
            <span className={`text-2xl font-bold ${isFaster ? 'text-green-500' : 'text-red-500'}`}>
              {isFaster ? '-' : '+'}{Math.abs(percentChange)}%
            </span>
            <span className="text-text-muted text-sm">
              {isSignificantlyFaster ? (isFaster ? 'faster!' : 'slower') : (isFaster ? 'faster' : 'slower')}
            </span>
          </div>
          <div className="text-text-muted text-xs mt-1">
            Last {midpoint} runs vs previous {midpoint}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-text-muted text-sm mb-1">Current Avg</div>
          <div className="text-xl font-bold">
            {formatPace(recentAvgPace)}/km
          </div>
          <div className="text-text-muted text-xs">
            Last {Math.min(5, sortedRuns.length)} runs
          </div>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Helper
// ============================================

function formatPace(seconds: number): string {
  if (!seconds || seconds <= 0) return '0:00';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}
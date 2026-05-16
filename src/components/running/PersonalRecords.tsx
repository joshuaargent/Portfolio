import { Card } from '@/components/ui/Card';
import { RunningStats, RunLog } from '@/types';
import { Trophy, Route, TrendingUp, Target, Sparkles } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface PersonalRecordsProps {
  stats: RunningStats;
  runs: RunLog[];
}

// ============================================
// Component
// ============================================

export function PersonalRecords({ stats, runs }: PersonalRecordsProps) {
  const formatPace = (seconds: number): string => {
    if (!seconds || seconds <= 0) return 'N/A';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateStr: string): string => {
    if (!dateStr) return '';
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  const predictions = calculatePredictions(runs, stats);

  return (
    <Card>
      <div className="grid grid-cols-2 gap-6">
        {/* Current Records */}
        <div>
          <h3 className="text-text-primary font-semibold mb-4">Personal Records</h3>
          <div className="space-y-3">
            <RecordRow 
              icon={<Trophy className="h-4 w-4 text-yellow-500" />}
              label="Best Pace"
              value={formatPace(stats.fastestPace)}
              subtext={formatDate(stats.fastestPaceDate)}
            />
            <RecordRow 
              icon={<Route className="h-4 w-4 text-blue-500" />}
              label="Longest Run"
              value={`${stats.longestRun?.toFixed(1) || 'N/A'} km`}
              subtext={formatDate(stats.longestRunDate)}
            />
          </div>
        </div>

        {/* Predictions */}
        <div>
          <h3 className="text-text-primary font-semibold mb-4">Predictions</h3>
          <div className="space-y-3">
            {predictions.sub30 && (
              <PredictionRow 
                label="Sub-30 5k"
                target="29:59"
                current={predictions.sub30}
                icon={<Target className="h-4 w-4 text-green-500" />}
              />
            )}
            {predictions.sub6 && (
              <PredictionRow 
                label="6 min/km pace"
                target="5:59"
                current={predictions.sub6}
                icon={<Sparkles className="h-4 w-4 text-purple-500" />}
              />
            )}
            {predictions.totalByYearEnd > 0 && (
              <PredictionRow 
                label="Year-end total"
                target="1,820 km"
                current={`${predictions.totalByYearEnd} km`}
                icon={<TrendIcon progress={predictions.onTrackForYear} />}
              />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Record Row
// ============================================

function RecordRow({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-bg-secondary rounded-lg p-2 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-text-muted text-xs">{label}</p>
        <p className="text-text-primary font-semibold">{value}</p>
        {subtext && <p className="text-text-muted text-xs">{subtext}</p>}
      </div>
    </div>
  );
}

// ============================================
// Prediction Row
// ============================================

function PredictionRow({ label, target, current, icon }: { label: string; target: string; current: string; icon: React.ReactNode }) {
  const isOnTrack = !current.includes('weeks');
  
  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-lg p-2 flex-shrink-0 ${isOnTrack ? 'bg-green-500/10' : 'bg-bg-secondary'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-text-muted text-xs">{label}</p>
        <p className={`text-sm font-medium ${isOnTrack ? 'text-green-600' : 'text-text-primary'}`}>
          {current} <span className="text-text-muted text-xs">/ {target}</span>
        </p>
      </div>
    </div>
  );
}

// ============================================
// Trend Icon
// ============================================

function TrendIcon({ progress }: { progress: boolean }) {
  if (progress) {
    return <TrendingUp className="h-4 w-4 text-green-500" />;
  }
  return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
}

// ============================================
// Calculations
// ============================================

function calculatePredictions(runs: RunLog[], stats: RunningStats) {
  const predictions: { 
    sub30: string | null; 
    sub6: string | null;
    totalByYearEnd: number;
    onTrackForYear: boolean;
  } = {
    sub30: null,
    sub6: null,
    totalByYearEnd: 0,
    onTrackForYear: false,
  };

  if (runs.length < 3) return predictions;

  // Sort runs by date
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get average pace from recent runs
  const recentRuns = sortedRuns.slice(0, Math.min(5, sortedRuns.length));
  const avgPaceSeconds = recentRuns.reduce((sum, r) => sum + (r.paceSeconds || 0), 0) / recentRuns.length;

  // Sub-30 prediction (currently 361 sec/km = 6:01/km)
  if (avgPaceSeconds <= 360) {
    predictions.sub30 = 'You could do it!';
  } else if (avgPaceSeconds < 420) { // 7 min/km
    const paceNeeded = 360; // 6 min/km
    const improvementPerKm = (avgPaceSeconds - paceNeeded) / avgPaceSeconds;
    const weeksToImprove = Math.ceil(improvementPerKm * 10);
    predictions.sub30 = `${weeksToImprove} weeks at current pace`;
  } else {
    predictions.sub30 = `${Math.ceil((avgPaceSeconds - 360) / 10)} weeks to sub-30`;
  }

  // Sub-6 min/km prediction
  if (avgPaceSeconds < 360) {
    predictions.sub6 = 'Already there!';
  } else if (avgPaceSeconds < 420) {
    predictions.sub6 = `${Math.ceil((avgPaceSeconds - 354) / 5} weeks`;
  } else {
    predictions.sub6 = 'Need more training';
  }

  // Year-end prediction
  const mostRecentRun = new Date(sortedRuns[0].date);
  const daysInYear = 365;
  const daysPassed = Math.max(1, Math.floor((mostRecentRun.getTime() - new Date(mostRecentRun.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)));
  const daysLeft = daysInYear - daysPassed;
  
  if (daysLeft > 0 && sortedRuns.length > 0) {
    const avgPerDay = stats.totalDistance / daysPassed;
    predictions.totalByYearEnd = Math.round(stats.totalDistance + (avgPerDay * daysLeft));
    predictions.onTrackForYear = predictions.totalByYearEnd >= 1820;
  }

  return predictions;
}
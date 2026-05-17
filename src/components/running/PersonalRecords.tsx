import { Card } from '@/components/ui/Card';
import { RunningStats, RunLog } from '@/types';
import { Trophy, Route, TrendingUp, Activity } from 'lucide-react';

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

  const predictions = calculateRacePredictions(runs);
  const consistency = calculateConsistency(runs);

  return (
    <Card className="space-y-6">
      {/* Section 1: Personal Records */}
      <div>
        <h3 className="text-text-muted text-sm font-medium mb-3">Personal Records</h3>
        <div className="grid grid-cols-2 gap-4">
          <RecordItem 
            icon={<Trophy className="h-5 w-5 text-yellow-500" />}
            label="Best Pace"
            value={formatPace(stats.fastestPace)}
            subtext={formatDate(stats.fastestPaceDate)}
          />
          <RecordItem 
            icon={<Route className="h-5 w-5 text-blue-500" />}
            label="Longest Run"
            value={`${stats.longestRun?.toFixed(1) || 'N/A'} km`}
            subtext={formatDate(stats.longestRunDate)}
          />
        </div>
      </div>

      {/* Section 2: Race Predictions */}
      <div>
        <h3 className="text-text-muted text-sm font-medium mb-3">Race Predictions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <PredictionItem 
            label="5k"
            current={predictions.fiveK}
            target="30:00"
            isMet={predictions.fiveKSecs <= 1800}
          />
          <PredictionItem 
            label="10k"
            current={predictions.tenK}
            target="1:00:00"
            isMet={predictions.tenKSecs <= 3600}
          />
          <PredictionItem 
            label="Half"
            current={predictions.halfMarathon}
            target="2:00:00"
            isMet={predictions.halfSecs <= 7200}
          />
          <PredictionItem 
            label="Marathon"
            current={predictions.marathon}
            target="4:00:00"
            isMet={predictions.marathonSecs <= 14400}
          />
        </div>
      </div>

      {/* Section 3: Trends */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-bg-secondary">
        <TrendItem 
          label="Consistency"
          value={`${consistency.percent}%`}
          subtext={`${consistency.runDays} of ${consistency.totalDays} days`}
          icon={<Activity className="h-5 w-5 text-green-500" />}
          trendPositive={consistency.percent >= 80}
        />
        <TrendItem 
          label="Pace Trend"
          value={`${predictions.paceTrend > 0 ? '+' : ''}${predictions.paceTrend}%`}
          subtext="Last 6 vs previous 6"
          icon={<TrendingUp className={`h-5 w-5 ${predictions.paceTrend > 0 ? 'text-green-500' : 'text-red-500'}`} />}
          trendPositive={predictions.paceTrend >= 0}
        />
      </div>
    </Card>
  );
}

// ============================================
// Record Item
// ============================================

function RecordItem({ icon, label, value, subtext }: { icon: React.ReactNode; label: string; value: string; subtext: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-bg-secondary rounded-lg p-2.5 flex-shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-text-muted text-xs">{label}</p>
        <p className="text-text-primary font-bold text-lg truncate">{value}</p>
        {subtext && <p className="text-text-muted text-xs truncate">{subtext}</p>}
      </div>
    </div>
  );
}

// ============================================
// Prediction Item
// ============================================

function PredictionItem({ label, current, target, isMet }: { label: string; current: string; target: string; isMet: boolean }) {
  return (
    <div className={`text-center p-3 rounded-lg ${isMet ? 'bg-green-500/10' : 'bg-bg-secondary'}`}>
      <p className="text-text-muted text-xs mb-1">{label}</p>
      <p className={`text-xl font-bold ${isMet ? 'text-green-500' : 'text-text-primary'}`}>{current}</p>
      <p className="text-text-muted text-xs">Target: {target}</p>
    </div>
  );
}

// ============================================
// Trend Item
// ============================================

function TrendItem({ label, value, subtext, icon, trendPositive }: { 
  label: string; 
  value: string; 
  subtext: string; 
  icon: React.ReactNode;
  trendPositive: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="bg-bg-secondary rounded-lg p-2.5 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-text-muted text-xs">{label}</p>
        <p className={`font-bold text-lg ${trendPositive ? 'text-green-500' : 'text-text-primary'}`}>{value}</p>
        <p className="text-text-muted text-xs">{subtext}</p>
      </div>
    </div>
  );
}

// ============================================
// Race Time Predictions (Smart Algorithm)
// ============================================

interface RacePredictions {
  fiveK: string;
  tenK: string;
  halfMarathon: string;
  marathon: string;
  fiveKSecs: number;
  tenKSecs: number;
  halfSecs: number;
  marathonSecs: number;
  paceTrend: number;
}

function calculateRacePredictions(runs: RunLog[]): RacePredictions {
  const result: RacePredictions = {
    fiveK: 'N/A',
    tenK: 'N/A',
    halfMarathon: 'N/A',
    marathon: 'N/A',
    fiveKSecs: 0,
    tenKSecs: 0,
    halfSecs: 0,
    marathonSecs: 0,
    paceTrend: 0,
  };

  if (runs.length < 3) return result;

  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentRuns = sortedRuns.slice(0, Math.min(10, sortedRuns.length));
  const previousRuns = sortedRuns.slice(10, Math.min(20, sortedRuns.length));

  // Calculate weighted average pace - but weigh runs higher than walks
  let totalWeight = 0;
  let weightedPaceSum = 0;
  
  recentRuns.forEach((run, index) => {
    if (run.paceSeconds && run.paceSeconds > 0) {
      const recencyWeight = recentRuns.length - index;
      // Detect walks vs runs: pace > 9 min/km (540 sec/km) is likely a walk
      const isWalk = run.paceSeconds > 540;
      const activityWeight = isWalk ? 0.5 : 1.0; // Walks count less
      
      const weight = recencyWeight * activityWeight;
      weightedPaceSum += run.paceSeconds * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return result;

  const basePace = weightedPaceSum / totalWeight;

  // Calculate fatigue factor based on consistency
  const consistency = calculateConsistency(runs);
  const fatigueFactor = 1 + (0.05 * (100 - consistency.percent) / 100);

  // Race-specific adjustments
  const raceFactors = {
    fiveK: 1.0,
    tenK: 1.05,
    half: 1.12,
    marathon: 1.20,
  };

  const predictRaceTime = (basePace: number, distanceKm: number, factor: number, fatigue: number): { time: string; secs: number } => {
    const adjustedPace = basePace * factor * fatigue;
    const totalSeconds = adjustedPace * distanceKm;
    return { time: formatTime(totalSeconds), secs: totalSeconds };
  };

  const fiveKResult = predictRaceTime(basePace, 5, raceFactors.fiveK, fatigueFactor);
  result.fiveK = fiveKResult.time;
  result.fiveKSecs = fiveKResult.secs;

  const tenKResult = predictRaceTime(basePace, 10, raceFactors.tenK, fatigueFactor);
  result.tenK = tenKResult.time;
  result.tenKSecs = tenKResult.secs;

  const halfFatigue = fatigueFactor + 0.02;
  const halfResult = predictRaceTime(basePace, 21.1, raceFactors.half, halfFatigue);
  result.halfMarathon = halfResult.time;
  result.halfSecs = halfResult.secs;

  const marathonFatigue = fatigueFactor + 0.05;
  const marathonResult = predictRaceTime(basePace, 42.195, raceFactors.marathon, marathonFatigue);
  result.marathon = marathonResult.time;
  result.marathonSecs = marathonResult.secs;

  // Calculate pace trend (last 6 vs previous 6)
  if (recentRuns.length >= 3 && previousRuns.length >= 3) {
    const recentAvg = recentRuns.reduce((sum, r) => sum + (r.paceSeconds || 0), 0) / recentRuns.length;
    const previousAvg = previousRuns.reduce((sum, r) => sum + (r.paceSeconds || 0), 0) / previousRuns.length;
    if (previousAvg > 0) {
      result.paceTrend = Math.round(((previousAvg - recentAvg) / previousAvg) * 100);
    }
  }

  return result;
}

function formatTime(seconds: number): string {
  if (!seconds || seconds <= 0) return 'N/A';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.round(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// Consistency Calculation
// ============================================

function calculateConsistency(runs: RunLog[]): { percent: number; runDays: number; totalDays: number } {
  if (runs.length === 0) {
    return { percent: 0, runDays: 0, totalDays: 0 };
  }

  const sortedRuns = [...runs].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const firstRunDate = new Date(sortedRuns[0].date);
  firstRunDate.setHours(0, 0, 0, 0);
  
  const lastRunDate = new Date(sortedRuns[sortedRuns.length - 1].date);
  lastRunDate.setHours(0, 0, 0, 0);
  
  const totalDays = Math.floor((lastRunDate.getTime() - firstRunDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const runDays = new Set(runs.map(r => r.date)).size;
  const percent = Math.min(100, Math.round((runDays / totalDays) * 100));

  return { percent, runDays, totalDays };
}
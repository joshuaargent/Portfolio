import { Card } from '@/components/ui/Card';
import { RunningStats, RunLog } from '@/types';
import { Trophy, Route, TrendingUp, TrendingDown, Activity } from 'lucide-react';

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

  const consistency = calculateConsistency(runs);
  const predictions = calculateRacePredictions(runs, consistency);

  // Determine if pace trend is positive (lower pace = faster = green)
  const paceImproved = predictions.paceTrend > 0;

  return (
    <Card className="space-y-6">
      {/* Section 1: Personal Records */}
      <div>
        <h3 className="text-text-secondary text-sm font-medium mb-3">Personal Records</h3>
        <div className="grid grid-cols-2 gap-4">
          <RecordItem 
            icon={<Trophy className="h-5 w-5" />}
            iconBg="bg-yellow-500/10"
            iconColor="text-yellow-600"
            label="Best Pace"
            value={formatPace(stats.fastestPace)}
            subtext={formatDate(stats.fastestPaceDate)}
          />
          <RecordItem 
            icon={<Route className="h-5 w-5" />}
            iconBg="bg-blue-500/10"
            iconColor="text-blue-600"
            label="Longest Run"
            value={`${stats.longestRun?.toFixed(1) || 'N/A'} km`}
            subtext={formatDate(stats.longestRunDate)}
          />
        </div>
      </div>

      {/* Section 2: Race Predictions */}
      <div>
        <h3 className="text-text-secondary text-sm font-medium mb-3">Race Predictions</h3>
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
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
        <TrendItem 
          label="Consistency"
          value={`${consistency.percent}%`}
          subtext={`${consistency.runDays} of ${consistency.totalDays} days`}
          icon={<Activity className="h-5 w-5" />}
          iconBg="bg-green-500/10"
          iconColor="text-green-600"
          trendPositive={consistency.percent >= 80}
        />
        <TrendItem 
          label="Pace Trend"
          value={`${predictions.paceTrend > 0 ? '+' : ''}${predictions.paceTrend}%`}
          subtext="Last 6 vs previous 6"
          icon={paceImproved ? <TrendingDown className="h-5 w-5" /> : <TrendingUp className="h-5 w-5" />}
          iconBg={paceImproved ? "bg-green-500/10" : "bg-red-500/10"}
          iconColor={paceImproved ? "text-green-600" : "text-red-600"}
          trendPositive={paceImproved}
        />
      </div>
    </Card>
  );
}

// ============================================
// Record Item
// ============================================

function RecordItem({ icon, iconBg, iconColor, label, value, subtext }: { 
  icon: React.ReactNode; 
  iconBg?: string;
  iconColor?: string;
  label: string; 
  value: string; 
  subtext: string 
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${iconBg || 'bg-bg-secondary'} rounded-lg p-2.5 flex-shrink-0`}>
        <span className={iconColor || 'text-text-muted'}>{icon}</span>
      </div>
      <div className="min-w-0">
        <p className="text-text-secondary text-xs">{label}</p>
        <p className="text-text-primary font-bold text-lg truncate">{value}</p>
        {subtext && <p className="text-text-secondary text-xs truncate">{subtext}</p>}
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
      <p className="text-text-secondary text-xs mb-1">{label}</p>
      <p className={`text-xl font-bold ${isMet ? 'text-green-600' : 'text-text-primary'}`}>{current}</p>
      <p className="text-text-secondary text-xs">Target: {target}</p>
    </div>
  );
}

// ============================================
// Trend Item
// ============================================

function TrendItem({ label, value, subtext, icon, iconBg, iconColor, trendPositive }: { 
  label: string; 
  value: string; 
  subtext: string; 
  icon: React.ReactNode;
  iconBg?: string;
  iconColor?: string;
  trendPositive: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className={`${iconBg || 'bg-bg-secondary'} rounded-lg p-2.5 flex-shrink-0`}>
        <span className={iconColor || 'text-text-muted'}>{icon}</span>
      </div>
      <div>
        <p className="text-text-secondary text-xs">{label}</p>
        <p className={`font-bold text-lg ${trendPositive ? 'text-green-600' : 'text-text-primary'}`}>{value}</p>
        <p className="text-text-secondary text-xs">{subtext}</p>
      </div>
    </div>
  );
}

// ============================================
// Race Time Predictions (Optimized Algorithm)
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
  avgPace: number;
}

// Walk threshold: pace > 8:30 min/km (510 sec/km) is considered a walk
const WALK_PACE_THRESHOLD = 510;

// Calculate dynamic fatigue factor based on:
// 1. Average pace (slower = more fatigue)
// 2. Recent trend (getting slower = more fatigue)
// 3. Consistency (missing days = more fatigue)
function calculateFatigueFactor(avgPace: number, paceTrend: number, consistencyPercent: number): number {
  if (!avgPace || avgPace <= 0) return 1.0;
  
  // Baseline is around 5:00/km (300 sec/km) = 1.0 fatigue
  const baselinePace = 300;
  const paceDiff = avgPace - baselinePace;
  const paceFatigue = (paceDiff / 10) * 0.025;
  
  // Trend impact: if getting slower, add fatigue
  const trendFatigue = paceTrend < 0 ? Math.abs(paceTrend) / 100 * 0.03 : 0;
  
  // Consistency impact: if missing days, add fatigue
  const consistencyFatigue = (100 - consistencyPercent) / 100 * 0.03;
  
  const fatigue = 1 + paceFatigue + trendFatigue + consistencyFatigue;
  
  // Clamp between 1.0 and 1.30 (max 30% fatigue)
  return Math.max(1.0, Math.min(1.30, fatigue));
}

// Best possible prediction algorithm
function calculateRacePredictions(runs: RunLog[], consistency: { percent: number }): RacePredictions {
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
    avgPace: 0,
  };

  if (runs.length < 3) return result;

  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const recentRuns = sortedRuns.slice(0, Math.min(10, sortedRuns.length));
  const previousRuns = sortedRuns.slice(10, Math.min(20, sortedRuns.length));
  const olderRuns = sortedRuns.slice(20, Math.min(30, sortedRuns.length));

  // Calculate average pace - ONLY using runs (not walks)
  // Walks are completely excluded from pace calculations
  const recentRunPaces = recentRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);
    
  const previousRunPaces = previousRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);
    
  const olderRunPaces = olderRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);

  // Need at least some runs to calculate
  if (recentRunPaces.length === 0) return result;

  // Calculate averages with recency weighting for recent runs
  const recentWeightedPace = recentRunPaces.reduce((sum, pace, i) => sum + pace * (recentRunPaces.length - i), 0) 
    / (recentRunPaces.reduce((sum, _, i) => sum + (recentRunPaces.length - i), 0));
    
  const avgRunningPace = recentRunPaces.reduce((sum, p) => sum + p, 0) / recentRunPaces.length;
  
  // Use ALL runs (recent + previous + older) for overall average
  const allPaces = [...recentRunPaces, ...previousRunPaces, ...olderRunPaces];
  const overallAvgPace = allPaces.length > 0 
    ? allPaces.reduce((sum, p) => sum + p, 0) / allPaces.length 
    : avgRunningPace;

  // Calculate pace trend (recent vs previous)
  let paceTrend = 0;
  if (recentRunPaces.length > 0 && previousRunPaces.length > 0) {
    const recentAvg = recentRunPaces.reduce((sum, p) => sum + p, 0) / recentRunPaces.length;
    const previousAvg = previousRunPaces.reduce((sum, p) => sum + p, 0) / previousRunPaces.length;
    if (previousAvg > 0) {
      paceTrend = Math.round(((previousAvg - recentAvg) / previousAvg) * 100);
    }
  }

  // Calculate dynamic fatigue factor
  const fatigueFactor = calculateFatigueFactor(avgRunningPace, paceTrend, consistency.percent);

  // Race-specific adjustments (more realistic factors)
  const raceFactors = {
    fiveK: 1.0,
    tenK: 1.02,
    half: 1.05,
    marathon: 1.10,
  };

  const predictRaceTime = (pace: number, distanceKm: number, factor: number, fatigue: number): { time: string; secs: number } => {
    const adjustedPace = pace * factor * fatigue;
    const totalSeconds = adjustedPace * distanceKm;
    return { time: formatTime(totalSeconds), secs: totalSeconds };
  };

  result.avgPace = avgRunningPace;
  result.paceTrend = paceTrend;

  // 5K - use recent weighted pace (most relevant)
  const fiveKResult = predictRaceTime(recentWeightedPace, 5, raceFactors.fiveK, fatigueFactor);
  result.fiveK = fiveKResult.time;
  result.fiveKSecs = fiveKResult.secs;

  // 10K - blend recent and overall
  const tenKPace = (recentWeightedPace + overallAvgPace) / 2;
  const tenKResult = predictRaceTime(tenKPace, 10, raceFactors.tenK, fatigueFactor);
  result.tenK = tenKResult.time;
  result.tenKSecs = tenKResult.secs;

  // Half marathon - use overall average
  const halfFatigue = fatigueFactor + 0.02;
  const halfResult = predictRaceTime(overallAvgPace, 21.1, raceFactors.half, halfFatigue);
  result.halfMarathon = halfResult.time;
  result.halfSecs = halfResult.secs;

  // Marathon - use overall average
  const marathonFatigue = fatigueFactor + 0.04;
  const marathonResult = predictRaceTime(overallAvgPace, 42.195, raceFactors.marathon, marathonFatigue);
  result.marathon = marathonResult.time;
  result.marathonSecs = marathonResult.secs;

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
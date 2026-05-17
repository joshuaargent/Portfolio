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

// Calculate fatigue - less fatigue if more walking (restful activity)
function calculateFatigue(pace: number, runWalkRatio: number, consistency: number): number {
  if (!pace || pace <= 0) return 1.0;
  
  // Baseline 5:00/km = 1.0 fatigue (0% adjustment)
  const baselinePace = 300;
  const paceDiff = pace - baselinePace;
  
  // Slower = more fatigue (2.5% per 10 sec/km)
  let fatigue = 1 + (paceDiff / 10) * 0.025;
  
  // More walks than runs = less fatigue (walking is restful)
  // If runWalkRatio < 1, reduce fatigue
  if (runWalkRatio < 1) {
    fatigue -= (1 - runWalkRatio) * 0.1; // up to 10% less fatigue
  }
  
  // Consistency impact
  const consistencyFatigue = (100 - consistency) / 100 * 0.02;
  fatigue += consistencyFatigue;
  
  return Math.max(1.0, Math.min(1.25, fatigue));
}

// Best prediction algorithm
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

  // Recent = last 10 runs
  const recentRuns = sortedRuns.slice(0, Math.min(10, sortedRuns.length));
  const previousRuns = sortedRuns.slice(10, Math.min(20, sortedRuns.length));

  // Separate runs and walks
  const runPaces = recentRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);
    
  const walkPaces = recentRuns
    .filter(r => r.paceSeconds && r.paceSeconds > WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);
    
  const prevRunPaces = previousRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .map(r => r.paceSeconds);

  // Need at least one run to predict
  if (runPaces.length === 0) return result;

  // Calculate run/walk ratio for fatigue adjustment
  const totalRecent = recentRuns.filter(r => r.paceSeconds && r.paceSeconds > 0).length;
  const runCount = runPaces.length;
  const runWalkRatio = totalRecent > 0 ? runCount / totalRecent : 1;

  // Recent weighted pace (most recent = highest weight)
  const weightedPace = runPaces.reduce((sum, pace, i) => sum + pace * (runPaces.length - i), 0) 
    / (runPaces.reduce((sum, _, i) => sum + (runPaces.length - i), 0));
    
  // Simple average pace
  const avgPace = runPaces.reduce((sum, p) => sum + p, 0) / runPaces.length;
  
  // Overall average for longer races (all recent runs)
  const overallRecentRunPaces = sortedRuns
    .filter(r => r.paceSeconds && r.paceSeconds > 0 && r.paceSeconds <= WALK_PACE_THRESHOLD)
    .slice(0, 20)
    .map(r => r.paceSeconds);
    
  const overallPace = overallRecentRunPaces.length > 0
    ? overallRecentRunPaces.reduce((sum, p) => sum + p, 0) / overallRecentRunPaces.length
    : avgPace;

  // Pace trend
  let paceTrend = 0;
  if (runPaces.length > 0 && prevRunPaces.length > 0) {
    const recentAvg = runPaces.reduce((sum, p) => sum + p, 0) / runPaces.length;
    const prevAvg = prevRunPaces.reduce((sum, p) => sum + p, 0) / prevRunPaces.length;
    if (prevAvg > 0) {
      paceTrend = Math.round(((prevAvg - recentAvg) / prevAvg) * 100);
    }
  }

  // Calculate fatigue
  const fatigueFactor = calculateFatigue(avgPace, runWalkRatio, consistency.percent);

  // Race factors (minor adjustments for longer distances)
  const raceFactors = { fiveK: 1.0, tenK: 1.01, half: 1.03, marathon: 1.06 };

  const predict = (pace: number, km: number, factor: number, fatigue: number) => {
    const adjustedPace = pace * factor * fatigue;
    const seconds = adjustedPace * km;
    return { time: formatTime(seconds), secs: seconds };
  };

  result.avgPace = avgPace;
  result.paceTrend = paceTrend;

  // 5K - recent weighted pace
  result.fiveK = predict(weightedPace, 5, raceFactors.fiveK, fatigueFactor).time;
  result.fiveKSecs = predict(weightedPace, 5, raceFactors.fiveK, fatigueFactor).secs;

  // 10K - blend
  result.tenK = predict((weightedPace + overallPace) / 2, 10, raceFactors.tenK, fatigueFactor).time;
  result.tenKSecs = predict((weightedPace + overallPace) / 2, 10, raceFactors.tenK, fatigueFactor).secs;

  // Half - overall pace
  result.halfMarathon = predict(overallPace, 21.1, raceFactors.half, fatigueFactor + 0.02).time;
  result.halfSecs = predict(overallPace, 21.1, raceFactors.half, fatigueFactor + 0.02).secs;

  // Marathon - overall pace
  result.marathon = predict(overallPace, 42.195, raceFactors.marathon, fatigueFactor + 0.04).time;
  result.marathonSecs = predict(overallPace, 42.195, raceFactors.marathon, fatigueFactor + 0.04).secs;

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
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

  const formatDuration = (seconds: number): string => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
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
    <Card>
      {/* Records Row */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <RecordItem 
          icon={<Trophy className="h-4 w-4 text-yellow-500" />}
          label="Best Pace"
          value={formatPace(stats.fastestPace)}
          subtext={formatDate(stats.fastestPaceDate)}
        />
        <RecordItem 
          icon={<Route className="h-4 w-4 text-blue-500" />}
          label="Longest Run"
          value={`${stats.longestRun?.toFixed(1) || 'N/A'} km`}
          subtext={formatDate(stats.longestRunDate)}
        />
      </div>

      {/* Predictions Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <PredictionItem 
          label="5k"
          current={predictions.fiveK}
          target="30:00"
          raceInfo={`@ ${formatPace(predictions.fiveKPace)}/km`}
        />
        <PredictionItem 
          label="10k"
          current={predictions.tenK}
          target="1:00:00"
          raceInfo={`@ ${formatPace(predictions.tenKPace)}/km`}
        />
        <PredictionItem 
          label="Half"
          current={predictions.halfMarathon}
          target="2:00:00"
          raceInfo={`@ ${formatPace(predictions.halfPace)}/km`}
        />
        <PredictionItem 
          label="Marathon"
          current={predictions.marathon}
          target="4:00:00"
          raceInfo={`@ ${formatPace(predictions.marathonPace)}/km`}
        />
      </div>

      {/* Consistency & Trend */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-bg-secondary rounded-lg p-2 flex-shrink-0">
            <Activity className="h-4 w-4 text-green-500" />
          </div>
          <div>
            <p className="text-text-muted text-xs">Consistency</p>
            <p className="text-text-primary font-semibold">{consistency.percent}%</p>
            <p className="text-text-muted text-xs">{consistency.runDays} of {consistency.totalDays} days</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-bg-secondary rounded-lg p-2 flex-shrink-0">
            <TrendingUp className={`h-4 w-4 ${predictions.paceTrend > 0 ? 'text-green-500' : 'text-red-500'}`} />
          </div>
          <div>
            <p className="text-text-muted text-xs">Pace Trend</p>
            <p className={`font-semibold ${predictions.paceTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {predictions.paceTrend > 0 ? '+' : ''}{predictions.paceTrend}%
            </p>
            <p className="text-text-muted text-xs">Last 6 vs previous 6</p>
          </div>
        </div>
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
// Prediction Item
// ============================================

function PredictionItem({ label, current, target, raceInfo }: { label: string; current: string; target: string; raceInfo: string }) {
  const isOnTrack = current !== 'N/A';
  
  return (
    <div className={`text-center ${!isOnTrack ? 'opacity-50' : ''}`}>
      <p className="text-text-muted text-xs mb-1">{label}</p>
      <p className="text-text-primary font-semibold text-lg">{current}</p>
      <p className="text-text-muted text-xs">/ {target}</p>
      {isOnTrack && <p className="text-text-muted text-xs mt-1">{raceInfo}</p>}
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
  fiveKPace: number;
  tenKPace: number;
  halfPace: number;
  marathonPace: number;
  paceTrend: number;
}

function calculateRacePredictions(runs: RunLog[]): RacePredictions {
  const result: RacePredictions = {
    fiveK: 'N/A',
    tenK: 'N/A',
    halfMarathon: 'N/A',
    marathon: 'N/A',
    fiveKPace: 0,
    tenKPace: 0,
    halfPace: 0,
    marathonPace: 0,
    paceTrend: 0,
  };

  if (runs.length < 3) return result;

  // Sort runs by date (newest first)
  const sortedRuns = [...runs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Get recent runs (last 10, or all if less)
  const recentRuns = sortedRuns.slice(0, Math.min(10, sortedRuns.length));
  const previousRuns = sortedRuns.slice(10, Math.min(20, sortedRuns.length));

  // Calculate weighted average pace (more recent = more weight)
  let totalWeight = 0;
  let weightedPaceSum = 0;
  
  recentRuns.forEach((run, index) => {
    if (run.paceSeconds && run.paceSeconds > 0) {
      // Weight: most recent runs have higher weight
      const weight = recentRuns.length - index;
      weightedPaceSum += run.paceSeconds * weight;
      totalWeight += weight;
    }
  });

  if (totalWeight === 0) return result;

  // Base prediction pace (weighted average)
  const basePace = weightedPaceSum / totalWeight;

  // Calculate fatigue factor based on consistency
  const consistency = calculateConsistency(runs);
  const fatigueFactor = 1 + (0.05 * (100 - consistency.percent) / 100);

  // Race-specific adjustments (each race has different fatigue:
  // 5k: minimal fatigue adjustment
  // 10k: slight fatigue, start to feel it
  // Half: significant fatigue, "wall" potential
  // Full: major fatigue, extreme endurance demand
  const raceFactors = {
    fiveK: 1.0,      // Pure speed
    tenK: 1.05,     // ~5% slower than 5k pace base
    half: 1.12,     // ~12% slower (the "wall" zone)
    marathon: 1.20,  // ~20% slower (extreme endurance)
  };

  // Calculate adjusted paces using Riegel's formula equivalent
  // T2 = T1 * (D2 / D1)^1.06 (energy cost model)
  // But we use direct pace * fatigue for simplicity
  const predictRaceTime = (basePace: number, distanceKm: number, factor: number, fatigue: number): string => {
    const adjustedPace = basePace * factor * fatigue;
    const totalSeconds = adjustedPace * distanceKm;
    return formatTime(totalSeconds);
  };

  // 5k prediction
  result.fiveKPace = basePace * raceFactors.fiveK * fatigueFactor;
  result.fiveK = predictRaceTime(basePace, 5, raceFactors.fiveK, fatigueFactor);

  // 10k prediction
  result.tenKPace = basePace * raceFactors.tenK * fatigueFactor;
  result.tenK = predictRaceTime(basePace, 10, raceFactors.tenK, fatigueFactor);

  // Half marathon (21.1km) - add extra fatigue for long races
  const halfFatigue = fatigueFactor + 0.02;
  result.halfPace = basePace * raceFactors.half * halfFatigue;
  result.halfMarathon = predictRaceTime(basePace, 21.1, raceFactors.half, halfFatigue);

  // Marathon (42.2km) - longest distance, most fatigue
  const marathonFatigue = fatigueFactor + 0.05;
  result.marathonPace = basePace * raceFactors.marathon * marathonFatigue;
  result.marathon = predictRaceTime(basePace, 42.195, raceFactors.marathon, marathonFatigue);

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

  // Sort runs by date
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
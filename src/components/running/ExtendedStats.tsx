import { Card } from '@/components/ui/Card';
import { RunningStats } from '@/types';
import { Mountain, Flame, Zap, Timer } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface ExtendedStatsProps {
  stats: RunningStats;
}

// ============================================
// Component
// ============================================

export function ExtendedStats({ stats }: ExtendedStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <MiniStat
        icon={<Mountain className="h-4 w-4 text-green-600" />}
        label="Total Elevation"
        value={`${stats.totalElevation} m`}
        subtext={`${stats.averageElevation} m avg`}
      />
      <MiniStat
        icon={<Flame className="h-4 w-4 text-orange-500" />}
        label="Total Calories"
        value={stats.totalCalories ? `${stats.totalCalories} kcal` : 'N/A'}
        subtext={stats.totalRuns ? `${Math.round(stats.totalCalories! / stats.totalRuns)} kcal avg` : ''}
      />
      <MiniStat
        icon={<Timer className="h-4 w-4 text-blue-500" />}
        label="Total Time"
        value={formatDuration(stats.totalTime)}
        subtext={formatPace(stats.averagePaceSeconds)}
      />
      <MiniStat
        icon={<Zap className="h-4 w-4 text-yellow-500" />}
        label="Avg Distance"
        value={`${stats.averageDistance} km`}
        subtext="per run"
      />
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
  subtext: string;
}

function MiniStat({ icon, label, value, subtext }: MiniStatProps) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <div className="bg-bg-secondary rounded-lg p-2 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-text-muted text-xs">{label}</p>
          <p className="text-text-primary font-semibold">{value}</p>
          <p className="text-text-muted text-xs">{subtext}</p>
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Helper Functions
// ============================================

function formatDuration(seconds: number): string {
  if (!seconds) return '0:00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatPace(seconds: number): string {
  if (!seconds || seconds <= 0) return '';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}/km`;
}
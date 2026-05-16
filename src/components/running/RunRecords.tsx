import { Card } from '@/components/ui/Card';
import { RunningStats } from '@/types';
import { Trophy, Route } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface RunRecordProps {
  stats: RunningStats;
}

// ============================================
// Component
// ============================================

export function RunRecords({ stats }: RunRecordProps) {
  const formatNum = (n: number | undefined, decimals = 2) => n && n > 0 ? n.toFixed(decimals) : 'N/A';
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <RecordCard
        icon={<Trophy className="h-4 w-4 text-yellow-500" />}
        label="Best Pace"
        value={formatPaceSeconds(stats.fastestPace)}
        subtext={formatDate(stats.fastestPaceDate)}
      />
      <RecordCard
        icon={<Route className="h-4 w-4 text-blue-500" />}
        label="Longest Run"
        value={`${formatNum(stats.longestRun)} km`}
        subtext={formatDate(stats.longestRunDate)}
      />
    </div>
  );
}

// ============================================
// Stats Card
// ============================================

interface RecordCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext: string;
}

function RecordCard({ icon, label, value, subtext }: RecordCardProps) {
  const hasValue = subtext && subtext !== 'Invalid Date';
  
  return (
    <Card className={!hasValue ? 'opacity-50' : ''}>
      <div className="flex items-center gap-3">
        <div className="bg-bg-secondary rounded-lg p-2 flex-shrink-0">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-text-muted text-xs truncate">{label}</p>
          <p className="text-text-primary font-semibold truncate">{value}</p>
          {hasValue && <p className="text-text-muted text-xs truncate">{subtext}</p>}
        </div>
      </div>
    </Card>
  );
}

// ============================================
// Helper Functions
// ============================================

function formatPaceSeconds(seconds: number): string {
  if (!seconds || seconds <= 0) return 'N/A';
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  } catch {
    return '';
  }
}
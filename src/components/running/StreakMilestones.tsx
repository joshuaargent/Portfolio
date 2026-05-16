import { Card } from '@/components/ui/Card';
import { RunningStats } from '@/types';
import { Award, Flame, Star, Trophy, Medal, Crown } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface StreakMilestonesProps {
  stats: RunningStats;
}

// ============================================
// Milestones Data
// ============================================

const milestones = [
  { days: 7, name: 'One Week', icon: Flame, color: 'text-orange-400' },
  { days: 14, name: 'Two Weeks', icon: Star, color: 'text-yellow-400' },
  { days: 30, name: 'One Month', icon: Medal, color: 'text-yellow-500' },
  { days: 50, name: 'Fifty Days', icon: Trophy, color: 'text-yellow-600' },
  { days: 100, name: 'Century', icon: Crown, color: 'text-yellow-700' },
];

// ============================================
// Component
// ============================================

export function StreakMilestones({ stats }: StreakMilestonesProps) {
  const current = stats.currentStreak;
  const longest = stats.longestStreak;
  
  return (
    <Card>
      <div className="flex flex-wrap gap-3 justify-center">
        {milestones.map((milestone) => {
          const achieved = longest >= milestone.days;
          const active = current >= milestone.days;
          
          return (
            <div
              key={milestone.days}
              className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-all ${
                achieved
                  ? 'bg-yellow-500/20'
                  : active
                  ? 'bg-accent/20 animate-pulse'
                  : 'bg-bg-secondary opacity-40'
              }`}
            >
              <milestone.icon className={`h-6 w-6 ${achieved ? milestone.color : 'text-text-muted'}`} />
              <span className={`text-xs font-medium ${achieved ? 'text-yellow-500' : 'text-text-muted'}`}>
                {milestone.days}
              </span>
              <span className={`text-xs ${achieved ? 'text-yellow-500' : 'text-text-muted'}`}>
                {milestone.name}
              </span>
              {achieved && (
                <span className="text-xs text-green-500">✓</span>
              )}
              {active && !achieved && (
                <span className="text-xs text-accent animate-pulse">in progress</span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
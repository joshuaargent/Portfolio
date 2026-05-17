import { Card } from '@/components/ui/Card';
import { RunLog } from '@/types';
import { BarChart3 } from 'lucide-react';

// ============================================
// Types
// ============================================

export interface DayOfWeekProps {
  runs: RunLog[];
}

// ============================================
// Component
// ============================================

export function DayOfWeekStats({ runs }: DayOfWeekProps) {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Distance per day of week - ALL runs included
  const dayDistance = [0, 0, 0, 0, 0, 0, 0];
  
  for (const run of runs) {
    const date = new Date(run.date);
    const dayIndex = date.getDay();
    dayDistance[dayIndex] += run.distance;
  }
  
  // Calculate average - all days with data
  const totalDistance = dayDistance.reduce((sum, d) => sum + d, 0);
  const avgDistance = totalDistance / 7; // Average across ALL 7 days
  
  // Calculate height: average = 50%, less = below, more = above
  // Scale: min 20%, max 100%
  const getHeight = (dist: number): number => {
    if (avgDistance === 0) return 50; // Default to middle
    
    const ratio = dist / avgDistance;
    // ratio = 1 → 50%
    // ratio = 0 → 20%
    // ratio = 2 → 100%
    const height = 20 + (ratio * 30);
    return Math.max(20, Math.min(100, height));
  };
  
  // Find favorite day
  const favoriteDay = dayDistance.indexOf(Math.max(...dayDistance));
  const favoriteDistance = dayDistance[favoriteDay];
  
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-text-muted" />
        <span className="font-semibold">Distance per Day</span>
      </div>
      
      {/* Bar chart - height relative to average (50% = middle) */}
      <div className="flex items-end justify-between gap-1 h-24 mb-4">
        {dayDistance.map((dist, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-accent rounded-t hover:bg-accent/80 transition-colors"
              style={{ 
                height: `${getHeight(dist)}%`, 
                minHeight: dist > 0 ? '4px' : '0'
              }}
              title={`${dist.toFixed(1)} km`}
            />
            <span className="text-xs text-text-muted mt-1">{dayNames[index]}</span>
          </div>
        ))}
      </div>
      
      {/* Stats */}
      {avgDistance > 0 && (
        <div className="text-center text-sm text-text-muted">
          <span className="text-text-primary font-medium">{dayNames[favoriteDay]}</span> is your favorite day ({favoriteDistance.toFixed(1)} km)
        </div>
      )}
    </Card>
  );
}
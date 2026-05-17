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
  
  // Count runs and distance per day of week
  const dayDistance = [0, 0, 0, 0, 0, 0, 0];
  
  for (const run of runs) {
    const date = new Date(run.date);
    const dayIndex = date.getDay();
    dayDistance[dayIndex] += run.distance;
  }
  
  // Calculate average distance
  const totalDistance = dayDistance.reduce((sum, d) => sum + d, 0);
  const daysWithRuns = dayDistance.filter(d => d > 0).length;
  const avgDistance = daysWithRuns > 0 ? totalDistance / daysWithRuns : 0;
  
  // Calculate height as percentage of average
  // Below average = shorter (min 20%), At average = 50%, Above average = taller (max 100%)
  const getHeight = (dist: number): number => {
    if (dist === 0) return 10; // minimal height for no runs
    if (avgDistance === 0) return 50;
    
    const ratio = dist / avgDistance;
    if (ratio < 0.5) return 20; // very low = 20%
    if (ratio < 1) return 20 + (ratio - 0.5) * 60; // 20-50%
    if (ratio === 1) return 50; // average = 50%
    if (ratio < 1.5) return 50 + (ratio - 1) * 50; // 50-75%
    return Math.min(100, 50 + (ratio - 1) * 60); // max 100%
  };
  
  // Find favorite day (by distance)
  const favoriteDay = dayDistance.indexOf(Math.max(...dayDistance));
  const favoriteDistance = dayDistance[favoriteDay];
  
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-text-muted" />
        <span className="font-semibold">Distance per Day</span>
      </div>
      
      {/* Bar chart - height varies with distance vs average */}
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
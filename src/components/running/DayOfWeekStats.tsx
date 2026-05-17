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
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];
  const dayDistance = [0, 0, 0, 0, 0, 0, 0];
  
  for (const run of runs) {
    const date = new Date(run.date);
    const dayIndex = date.getDay();
    dayCounts[dayIndex]++;
    dayDistance[dayIndex] += run.distance;
  }
  
  const maxDistance = Math.max(...dayDistance, 1);
  
  // Find favorite day (by distance for more variation)
  const favoriteDay = dayDistance.indexOf(Math.max(...dayDistance));
  const favoriteDistance = dayDistance[favoriteDay];
  
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-text-muted" />
        <span className="font-semibold">Runs by Day</span>
      </div>
      
      {/* Bar chart - show distance for more variation */}
      <div className="flex items-end justify-between gap-1 h-24 mb-4">
        {dayDistance.map((dist, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-accent rounded-t hover:bg-accent/80 transition-colors"
              style={{ 
                height: `${(dist / maxDistance) * 100}%`, 
                minHeight: dist > 0 ? '4px' : '0',
                opacity: dist > 0 ? 0.4 + (dist / maxDistance) * 0.6 : 0
              }}
              title={`${dist.toFixed(1)} km`}
            />
            <span className="text-xs text-text-muted mt-1">{dayNames[index]}</span>
          </div>
        ))}
      </div>
      
      {/* Favorite day */}
      {favoriteDistance > 0 && (
        <div className="text-center text-sm text-text-muted">
          <span className="text-text-primary font-medium">{dayNames[favoriteDay]}</span> is your favorite day ({favoriteDistance.toFixed(1)} km)
        </div>
      )}
    </Card>
  );
}
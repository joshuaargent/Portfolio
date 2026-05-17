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
  
  // Sum distance per day of week
  const dayDistance = [0, 0, 0, 0, 0, 0, 0];
  
  for (const run of runs) {
    const date = new Date(run.date);
    const dayIndex = date.getDay();
    dayDistance[dayIndex] += run.distance;
  }
  
  // Use max distance as scale (not average)
  const maxDistance = Math.max(...dayDistance, 1);
  const avgDistance = dayDistance.reduce((sum, d) => sum + d, 0) / 7;
  
  return (
    <Card>
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-4 w-4 text-text-muted" />
        <span className="font-semibold">Distance per Day</span>
      </div>
      
      {/* Bar heights - max fills most of height */}
      <div className="flex items-end justify-between gap-1 h-24 mb-4">
        {dayDistance.map((dist, index) => {
          const height = (dist / maxDistance) * 100;
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-accent rounded-t hover:bg-accent/80 transition-colors"
                style={{ 
                  height: `${Math.max(20, Math.min(100, height))}%`, 
                  minHeight: dist > 0 ? '4px' : '0'
                }}
                title={`${dist.toFixed(1)} km`}
              />
              <span className="text-xs text-text-muted mt-1">{dayNames[index]}</span>
            </div>
          );
        })}
      </div>
      
      {avgDistance > 0 && (
        <div className="text-center text-sm text-text-muted">
          Avg: {avgDistance.toFixed(1)} km
        </div>
      )}
    </Card>
  );
}
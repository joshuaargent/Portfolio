'use client';

import { useMemo } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { RunLog } from '@/types';

// Walk threshold: pace > 8:30 min/km (510 sec/km) is considered a walk
const WALK_PACE_THRESHOLD = 510;

// Calculate dynamic intensity based on pace relative to average
// Use average pace as the "moderate" baseline
function getIntensityColor(paceSeconds: number | undefined, avgPace: number): string {
  if (!paceSeconds || paceSeconds <= 0 || paceSeconds > WALK_PACE_THRESHOLD) {
    return 'bg-accent/70';
  }
  
  // Use average pace as baseline (= 70% intensity)
  const avgPaceValue = avgPace || 330; // default to 5:30/km if no average
  
  if (paceSeconds <= avgPaceValue - 30) {
    // ~30 sec/km faster than average = full intensity
    return 'bg-accent';
  }
  
  if (paceSeconds >= avgPaceValue + 30) {
    // ~30 sec/km slower than average = minimum intensity
    return 'bg-accent/40';
  }
  
  // Interpolate between 40% and 100% based on difference from average
  const diff = paceSeconds - avgPaceValue;
  const ratio = 1 - (diff / 60); // -30 to +30 range
  const intensity = Math.round(40 + ratio * 60);
  return `bg-accent/${intensity}`;
}

// ============================================
// Types
// ============================================

export interface StreakCalendarProps {
  runs: RunLog[];
  year: number;
  avgPace?: number;
}

// ============================================
// Component
// ============================================

export function StreakCalendar({ runs, year, avgPace }: StreakCalendarProps) {
  const calendarData = useMemo(() => {
    // Create a map of dates to runs
    const runMap = new Map<string, RunLog>();
    runs.forEach((run) => {
      runMap.set(run.date, run);
    });

    // Generate all days of the year
    const days: { date: string; run?: RunLog; isCurrentYear: boolean }[] = [];
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      days.push({
        date: dateStr,
        run: runMap.get(dateStr),
        isCurrentYear: true,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  }, [runs, year]);

  // Group by weeks for display
  const weeks = useMemo(() => {
    const result: (typeof calendarData)[] = [];
    let currentWeek: typeof calendarData = [];

    calendarData.forEach((day, index) => {
      const dayOfWeek = new Date(day.date).getDay();

      // Start a new week on Sunday
      if (index === 0) {
        // Pad the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', isCurrentYear: false });
        }
      }

      currentWeek.push(day);

      // End the week on Saturday
      if (dayOfWeek === 6 || index === calendarData.length - 1) {
        result.push(currentWeek);
        currentWeek = [];
      }
    });

    return result;
  }, [calendarData]);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <Card>
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <h3 className="text-base font-semibold md:text-lg">{year} Running Calendar</h3>
        <div className="text-text-muted hidden items-center gap-2 text-xs md:flex">
          <span>Less</span>
          <div className="bg-bg-secondary h-3 w-3 rounded-sm" />
          <div className="bg-accent-light h-3 w-3 rounded-sm" />
          <div className="bg-accent h-3 w-3 rounded-sm" />
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="mb-1 ml-6 flex md:mb-2 md:ml-8">
        {months.map((month, index) => (
          <span key={month} className="text-text-muted text-[8px] md:text-xs" style={{ width: `${100 / 12}%` }}>
            {index % 2 === 0 ? month : ''}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-px md:gap-1">
        {/* Day labels - hidden on mobile */}
        <div className="text-text-muted hidden flex-col gap-px pr-1 text-xs md:flex md:gap-1 md:pr-2">
          {days.map((day, index) => (
            <span key={index} className="flex h-2 items-center md:h-3">
              {index % 2 === 1 ? day : ''}
            </span>
          ))}
        </div>

        {/* Weeks - scrollable on mobile */}
        <div className="flex flex-1 gap-px overflow-x-auto md:gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-px md:gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    'h-2 w-2 rounded-sm transition-colors md:h-3 md:w-3',
                    !day.isCurrentYear && 'bg-transparent',
                    day.isCurrentYear && !day.run && 'bg-bg-secondary',
                    day.run && getIntensityColor(day.run.paceSeconds, avgPace || 0)
                  )}
                  title={day.run ? `${day.date}: ${day.run.distance}km` : day.date}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend - compact on mobile */}
      <div className="border-border mt-4 border-t pt-3 md:mt-6 md:pt-4">
        <div className="text-text-secondary flex flex-wrap gap-x-3 gap-y-1 text-[10px] md:gap-4 md:text-xs">
          <span className="flex items-center gap-1">
            <span className="bg-accent h-2 w-2 rounded-sm md:h-3 md:w-3" />
            <span className="hidden md:inline">Faster than avg</span>
            <span className="md:hidden">Fast</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="bg-accent/70 h-2 w-2 rounded-sm md:h-3 md:w-3" />
            <span className="hidden md:inline">At average</span>
            <span className="md:hidden">Avg</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="bg-accent/40 h-2 w-2 rounded-sm md:h-3 md:w-3" />
            <span className="hidden md:inline">Slower than avg</span>
            <span className="md:hidden">Slow</span>
          </span>
        </div>
      </div>
    </Card>
  );
}

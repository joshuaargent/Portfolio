'use client';

import { useMemo } from 'react';
import { cn, formatDate } from '@/lib/utils';
import { Card } from '@/components/ui/Card';
import { RunLog } from '@/types';

// ============================================
// Types
// ============================================

export interface StreakCalendarProps {
  runs: RunLog[];
  year?: number;
}

// ============================================
// Component
// ============================================

export function StreakCalendar({ runs, year = new Date().getFullYear() }: StreakCalendarProps) {
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
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-text-primary text-lg font-semibold">{year} Running Calendar</h3>
        <div className="text-text-muted flex items-center gap-2 text-xs">
          <span>Less</span>
          <div className="bg-bg-secondary h-3 w-3 rounded-sm" />
          <div className="bg-accent-light h-3 w-3 rounded-sm" />
          <div className="bg-accent h-3 w-3 rounded-sm" />
          <span>More</span>
        </div>
      </div>

      {/* Month labels */}
      <div className="mb-2 ml-8 flex">
        {months.map((month, index) => (
          <span key={month} className="text-text-muted text-xs" style={{ width: `${100 / 12}%` }}>
            {index % 2 === 0 ? month : ''}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="flex gap-1">
        {/* Day labels */}
        <div className="text-text-muted flex flex-col gap-1 pr-2 text-xs">
          {days.map((day, index) => (
            <span key={index} className="flex h-3 items-center">
              {index % 2 === 1 ? day : ''}
            </span>
          ))}
        </div>

        {/* Weeks */}
        <div className="flex flex-1 gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    'h-3 w-3 rounded-sm transition-colors',
                    !day.isCurrentYear && 'bg-transparent',
                    day.isCurrentYear && !day.run && 'bg-bg-secondary',
                    day.run && 'bg-accent',
                    day.run?.feeling === 'great' && 'bg-accent',
                    day.run?.feeling === 'good' && 'bg-accent/80',
                    day.run?.feeling === 'tired' && 'bg-accent/60',
                    day.run?.feeling === 'rough' && 'bg-accent/40'
                  )}
                  title={day.run ? `${day.date}: ${day.run.distance}km` : day.date}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="border-border mt-6 border-t pt-4">
        <div className="text-text-muted flex flex-wrap gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="bg-accent h-3 w-3 rounded-sm" />
            Great run
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-accent/60 h-3 w-3 rounded-sm" />
            Tired
          </span>
          <span className="flex items-center gap-1.5">
            <span className="bg-accent/40 h-3 w-3 rounded-sm" />
            Rough day
          </span>
        </div>
      </div>
    </Card>
  );
}

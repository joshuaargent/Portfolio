import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface ReadingProgressProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// ============================================
// Component
// ============================================

export function ReadingProgress({
  progress,
  className,
  showLabel = true,
  size = 'md',
}: ReadingProgressProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-text-secondary">Reading Progress</span>
          <span className="text-text-primary font-medium">{clampedProgress}%</span>
        </div>
      )}
      <div className={cn('bg-bg-secondary overflow-hidden rounded-full', sizeClasses[size])}>
        <div
          className="bg-accent h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}

import { cn } from '@/lib/utils';
import Link from 'next/link';

// ============================================
// Types
// ============================================

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

// ============================================
// Component
// ============================================

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center px-6 py-12 text-center', className)}
    >
      {icon && <div className="bg-bg-secondary text-text-muted mb-4 rounded-full p-4">{icon}</div>}
      <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
      {description && <p className="text-text-secondary mt-2 max-w-sm text-sm">{description}</p>}
      {action && (
        <div className="mt-6">
          {action.href ? (
            <Link
              href={action.href}
              className="focus-visible:ring-accent bg-accent hover:bg-accent-hover inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium text-white shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {action.label}
            </Link>
          ) : (
            <button
              onClick={action.onClick}
              className="focus-visible:ring-accent bg-accent hover:bg-accent-hover inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-base font-medium text-white shadow-sm transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

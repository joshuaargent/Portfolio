'use client';

import { cn } from '@/lib/utils';

// ============================================
// Types
// ============================================

export interface Category {
  id: string;
  label: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
  className?: string;
}

// ============================================
// Component
// ============================================

export function CategoryFilter({ categories, selected, onSelect, className }: CategoryFilterProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
          selected === null
            ? 'bg-accent text-white'
            : 'bg-bg-secondary text-text-secondary hover:bg-border'
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelect(category.id)}
          className={cn(
            'rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
            selected === category.id
              ? 'bg-accent text-white'
              : 'bg-bg-secondary text-text-secondary hover:bg-border'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

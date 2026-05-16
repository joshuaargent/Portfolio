'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// ============================================
// Types
// ============================================

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

// ============================================
// Component
// ============================================

export function SearchBar({
  onSearch,
  placeholder = 'Search...',
  defaultValue = '',
  className,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative', className)}>
      <div className="relative">
        <Search className="text-text-muted absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={cn(
            'border-border bg-bg-card h-11 w-full rounded-lg border pr-10 pl-10',
            'placeholder:text-text-muted text-base',
            'focus:ring-accent focus:ring-2 focus:ring-offset-2 focus:outline-none',
            'transition-all duration-200'
          )}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-1 h-8 w-8 -translate-y-1/2"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}

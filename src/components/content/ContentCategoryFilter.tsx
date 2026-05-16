'use client';

import { useState, useMemo } from 'react';
import { CategoryFilter } from './CategoryFilter';
import { ContentPiece } from '@/types';
import { ContentCard } from './ContentCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { Filter } from 'lucide-react';

interface ContentCategoryFilterProps {
  content: ContentPiece[];
  categories: { id: string; label: string }[];
}

export function ContentCategoryFilter({ content, categories }: ContentCategoryFilterProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const filteredContent = useMemo(() => {
    if (!selected) return content;
    return content.filter((item) => item.category === selected);
  }, [content, selected]);

  return (
    <div className="mb-8">
      <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />

      {selected && (
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-text-secondary">
              {filteredContent.length} item{filteredContent.length !== 1 ? 's' : ''} in{' '}
              {categories.find((c) => c.id === selected)?.label}
            </p>
            <button
              onClick={() => setSelected(null)}
              className="text-accent hover:text-accent-hover text-sm"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}

      {filteredContent.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item) => (
            <ContentCard key={item.slug} content={item} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Filter className="h-8 w-8" />}
          title="No content found"
          description={`No content in the ${categories.find((c) => c.id === selected)?.label} category yet.`}
          action={{
            label: 'Clear filter',
            onClick: () => setSelected(null),
          }}
        />
      )}
    </div>
  );
}

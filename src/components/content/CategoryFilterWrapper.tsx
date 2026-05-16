'use client';

import { useState } from 'react';
import { CategoryFilter, Category } from './CategoryFilter';

// ============================================
// Types
// ============================================

interface CategoryFilterWrapperProps {
  categories: Category[];
  onCategoryChange?: (categoryId: string | null) => void;
}

// ============================================
// Component
// ============================================

export function CategoryFilterWrapper({
  categories,
  onCategoryChange,
}: CategoryFilterWrapperProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (categoryId: string | null) => {
    setSelected(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return <CategoryFilter categories={categories} selected={selected} onSelect={handleSelect} />;
}

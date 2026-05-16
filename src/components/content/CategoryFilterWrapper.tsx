'use client';

import { useState } from 'react';
import { CategoryFilter, Category } from './CategoryFilter';

interface CategoryFilterWrapperProps {
  categories: Category[];
  onCategoryChange?: (categoryId: string | null) => void;
}

export function CategoryFilterWrapper({
  categories,
  onCategoryChange,
}: CategoryFilterWrapperProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (categoryId: string | null) => {
    setSelected(categoryId);
    onCategoryChange?.(categoryId);
  };

  return <CategoryFilter categories={categories} selected={selected} onSelect={handleSelect} />;
}

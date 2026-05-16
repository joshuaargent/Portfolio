'use client';

import { useState } from 'react';
import { CategoryFilter, Category } from './CategoryFilter';

// ============================================
// Types
// ============================================

interface CategoryFilterWrapperProps {
  categories: Category[];
}

// ============================================
// Component
// ============================================

export function CategoryFilterWrapper({ categories }: CategoryFilterWrapperProps) {
  const [selected, setSelected] = useState<string | null>(null);

  return <CategoryFilter categories={categories} selected={selected} onSelect={setSelected} />;
}

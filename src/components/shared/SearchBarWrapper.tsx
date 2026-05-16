'use client';

import { useState, useMemo } from 'react';
import { SearchBar } from './SearchBar';

// ============================================
// Types
// ============================================

interface SearchBarWrapperProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

// ============================================
// Component
// ============================================

export function SearchBarWrapper({ placeholder = 'Search...', onSearch }: SearchBarWrapperProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return <SearchBar onSearch={handleSearch} placeholder={placeholder} defaultValue={query} />;
}

'use client';

import { useState, type FormEvent } from 'react';
import { SearchBar } from './SearchBar';

// ============================================
// Types
// ============================================

interface SearchBarWrapperProps {
  placeholder?: string;
}

// ============================================
// Component
// ============================================

export function SearchBarWrapper({ placeholder = 'Search...' }: SearchBarWrapperProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // TODO: Implement actual search functionality
    console.log('Searching for:', searchQuery);
  };

  return <SearchBar onSearch={handleSearch} placeholder={placeholder} defaultValue={query} />;
}

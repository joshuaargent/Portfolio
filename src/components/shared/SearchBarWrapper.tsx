'use client';

import { useState } from 'react';
import { SearchBar } from './SearchBar';

interface SearchBarWrapperProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBarWrapper({ placeholder = 'Search...', onSearch }: SearchBarWrapperProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    onSearch?.(searchQuery);
  };

  return <SearchBar onSearch={handleSearch} placeholder={placeholder} defaultValue={query} />;
}

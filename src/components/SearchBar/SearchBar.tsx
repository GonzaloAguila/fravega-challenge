import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onLoadingChange?: (isLoading: boolean) => void;
  initialQuery?: string;
  isLoading?: boolean;
  error?: string;
}

export const SearchBar = ({ 
  onSearch, 
  onLoadingChange, 
  initialQuery = '', 
  isLoading: externalLoading,
  error 
}: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchQuery = router.query.q as string;
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [router.query.q]);

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  const handleSearch = useCallback(
    (searchQuery: string) => {
      setIsLoading(true);
      setQuery(searchQuery);
      onSearch?.(searchQuery);

      const timeoutId = setTimeout(async () => {
        try {
          if (searchQuery) {
            await router.push({
              pathname: '/',
              query: { q: searchQuery },
            });
          } else {
            await router.push('/');
          }
        } finally {
          setIsLoading(false);
        }
      }, 300);

      return () => clearTimeout(timeoutId);
    },
    [router, onSearch]
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar usuarios..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />
      {(isLoading || externalLoading) && <div className={styles.loadingIndicator} role="status">Buscando...</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}; 
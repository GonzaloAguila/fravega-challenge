import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onLoadingChange?: (isLoading: boolean) => void;
}

export const SearchBar = ({ onLoadingChange }: SearchBarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Actualizar el input cuando cambia la URL
  useEffect(() => {
    const searchQuery = router.query.q as string;
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [router.query.q]);

  // Notificar cambios en el estado de carga
  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  // Función para manejar la búsqueda
  const handleSearch = useCallback(
    (searchQuery: string) => {
      setIsLoading(true);
      setQuery(searchQuery);

      // Usar un debounce para evitar demasiadas peticiones
      const timeoutId = setTimeout(() => {
        if (searchQuery) {
          router.push({
            pathname: '/',
            query: { q: searchQuery },
          });
        } else {
          router.push('/');
        }
        setIsLoading(false);
      }, 500); // 500ms de debounce

      return () => clearTimeout(timeoutId);
    },
    [router]
  );

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Buscar usuarios de GitHub..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        className={styles.searchInput}
      />
      {isLoading && <div className={styles.loadingIndicator}>Buscando...</div>}
    </div>
  );
}; 
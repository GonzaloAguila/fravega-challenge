import { SearchBar } from '@/components/SearchBar/SearchBar';
import { UserGrid } from '@/components/UserGrid/UserGrid';
import { useFavorites } from '@/hooks/useFavorites';
import { useUsers } from '@/hooks/useUsers';
import { User } from '@/types';
import Link from 'next/link';
import styles from './HomeLayout.module.css';
import { Loader } from '@/components/Loader/Loader';
import { useState, useCallback } from 'react';
import { useLoading } from '@/hooks/useLoading';
import { useSort, SortField, SortOrder } from '@/hooks/useSort';

interface HomeLayoutProps {
  users: User[];
  searchQuery?: string;
}

export const HomeLayout = ({ users, searchQuery = '' }: HomeLayoutProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { isLoading: isRouteLoading } = useLoading();
  const { data = users, isLoading: isUsersLoading } = useUsers(searchQuery);
  const { sortedItems = [], sortField, sortOrder, toggleSort } = useSort(data || []);

  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState<boolean>(false);

  const handleSearchLoading = (loading: boolean) => {
    setIsSearchLoading(loading);
  };

  const handleToggleFavorite = useCallback(
    (user: User) => {
      setIsFavoriteLoading(true);
      toggleFavorite(user);
      setTimeout(() => setIsFavoriteLoading(false), 500);
    },
    [toggleFavorite]
  );

  const showLoader = isRouteLoading || isSearchLoading || isUsersLoading || isFavoriteLoading;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>GitHub Users</h1>
          <Link href="/favorites" className={styles.link}>
            Ver Favoritos
          </Link>
        </div>
        
        <SearchBar onLoadingChange={handleSearchLoading} />
        {searchQuery && (
          <div className={styles.searchResults}>
            Resultados para: {searchQuery}
          </div>
        )}
        <div className={styles.sortControls}>
          <button
            onClick={() => toggleSort(SortField.LOGIN)}
            className={`${styles.sortButton} ${sortField === SortField.LOGIN ? styles.active : ''}`}
          >
            Nombre
            {sortField === SortField.LOGIN && (
              <span>{sortOrder === SortOrder.ASC ? '↑' : '↓'}</span>
            )}
          </button>
          <button
            onClick={() => toggleSort(SortField.ID)}
            className={`${styles.sortButton} ${sortField === SortField.ID ? styles.active : ''}`}
          >
            ID
            {sortField === SortField.ID && (
              <span>{sortOrder === SortOrder.ASC ? '↑' : '↓'}</span>
            )}
          </button>
        </div>
        {sortedItems.length === 0 ? (
          <div className={styles.emptyState}>
            {searchQuery ? 'No se encontraron usuarios' : 'No hay usuarios para mostrar'}
          </div>
        ) : (
          <UserGrid 
            users={sortedItems} 
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>
      {showLoader && <Loader />}
    </main>
  );
}; 
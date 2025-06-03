import { UserGrid } from '@/components/UserGrid/UserGrid';
import { Loader } from '@/components/Loader/Loader';
import Link from 'next/link';
import { useState } from 'react';
import styles from './FavoritesLayout.module.css';
import { useFavorites } from '@/hooks/useFavorites';
import { User } from '@/types';
import { useSort } from '@/hooks/useSort';
import { FilterPanel } from '@/components/FilterPanel/FilterPanel';

export const FavoritesLayout = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { sortedItems, sortField, sortOrder, toggleSort } = useSort(favorites);

  const handleToggleFavorite = (user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      toggleFavorite(user);
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.link}>
            Volver
          </Link>
          <h1 className={styles.title}>Usuarios Favoritos</h1>
        </div>

        <FilterPanel
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={toggleSort}
          limit={0}
          onLimitChange={() => {}}
          showLimit={false}
        />

        {sortedItems.length === 0 ? (
          <div className={styles.emptyState}>
            No tienes usuarios favoritos aún
          </div>
        ) : (
          <UserGrid 
            users={sortedItems} 
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>
      {isLoading && <Loader />}
    </main>
  );
}; 
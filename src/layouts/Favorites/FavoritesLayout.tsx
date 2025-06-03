import { UserGrid } from '@/components/UserGrid/UserGrid';
import { Loader } from '@/components/Loader/Loader';
import Link from 'next/link';
import { useState } from 'react';
import styles from './FavoritesLayout.module.css';
import { useFavorites } from '@/hooks/useFavorites';
import { User } from '@/types';

export const FavoritesLayout = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

        {favorites.length === 0 ? (
          <div className={styles.emptyState}>
            No tienes usuarios favoritos aún
          </div>
        ) : (
          <UserGrid 
            users={favorites} 
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      </div>
      {isLoading && <Loader />}
    </main>
  );
}; 
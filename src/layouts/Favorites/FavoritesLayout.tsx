import { UserGrid } from '@/components/UserGrid/UserGrid';
import { Loader } from '@/components/Loader/Loader';
import { User } from '@/types';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import styles from './FavoritesLayout.module.css';
import toast from 'react-hot-toast';

interface FavoritesLayoutProps {
  favorites: User[];
}

export const FavoritesLayout = ({ favorites: initialFavorites }: FavoritesLayoutProps) => {
  const [favorites, setFavorites] = useState<User[]>(initialFavorites);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('github-favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleToggleFavorite = useCallback((user: User) => {
    setIsLoading(true);
    setTimeout(() => {
      setFavorites((prevFavorites) => {
        const newFavorites = prevFavorites.filter((fav) => fav.id !== user.id);
        localStorage.setItem('github-favorites', JSON.stringify(newFavorites));
        toast.error(`${user.login} eliminado de favoritos`);
        setIsLoading(false);
        return newFavorites;
      });
    }, 500);
  }, []);

  const isFavorite = useCallback(
    (userId: number) => favorites.some((fav) => fav.id === userId),
    [favorites]
  );

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
      </main>
  );
}; 
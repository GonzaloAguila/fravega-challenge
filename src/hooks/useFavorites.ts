import { User } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const FAVORITES_KEY = 'github-favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<User[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = useCallback((user: User) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === user.id);
      let newFavorites: User[];

      if (isFavorite) {
        newFavorites = prevFavorites.filter((fav) => fav.id !== user.id);
        toast.error(`${user.login} eliminado de favoritos`);
      } else {
        newFavorites = [...prevFavorites, user];
        toast.success(`${user.login} agregado a favoritos`);
      }

      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (userId: number) => favorites.some((fav) => fav.id === userId),
    [favorites]
  );

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}; 
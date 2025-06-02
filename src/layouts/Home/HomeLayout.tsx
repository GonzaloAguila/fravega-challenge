import { SearchBar } from '@/components/SearchBar/SearchBar';
import { UserGrid } from '@/components/UserGrid/UserGrid';
import { useFavorites } from '@/hooks/useFavorites';
import { User } from '@/types';
import Link from 'next/link';
import styles from './HomeLayout.module.css';
import { Loader } from '@/components/Loader/Loader';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLoading } from '@/hooks/useLoading';

interface HomeLayoutProps {
  users: User[];
  searchQuery?: string;
}

export const HomeLayout = ({ users, searchQuery }: HomeLayoutProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isLoading: isPageLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => {
      if (!isPageLoading) {
        setIsLoading(false);
      }
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, isPageLoading]);

  useEffect(() => {
    if (!isPageLoading) {
      setIsLoading(false);
    }
  }, [isPageLoading]);

  const handleSearchLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

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
        <UserGrid 
          users={users} 
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      </div>
      {isLoading && <Loader />}
    </main>
  );
}; 
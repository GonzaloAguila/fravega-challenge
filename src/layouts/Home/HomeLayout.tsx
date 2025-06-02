import { SearchBar } from '@/components/SearchBar/SearchBar';
import { UserGrid } from '@/components/UserGrid/UserGrid';
import { useFavorites } from '@/hooks/useFavorites';
import { User } from '@/types';
import Link from 'next/link';
import styles from './HomeLayout.module.css';

interface HomeLayoutProps {
  users: User[];
  searchQuery?: string;
}

export const HomeLayout = ({ users, searchQuery }: HomeLayoutProps) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>GitHub Users</h1>
          <Link href="/favorites" className={styles.link}>
            Ver Favoritos
          </Link>
        </div>
        
        <SearchBar />
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
    </main>
  );
}; 
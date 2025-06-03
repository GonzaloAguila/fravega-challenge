import { GetServerSideProps } from 'next';
import { User } from '@/types';
import { FavoritesLayout } from '@/layouts/Favorites/FavoritesLayout';
interface FavoritesPageProps {
  favorites: User[];
}

export default function FavoritesPage({ favorites }: FavoritesPageProps) {
  return <FavoritesLayout favorites={favorites} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {
      favorites: [],
    },
  };
}; 
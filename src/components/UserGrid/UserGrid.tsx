import { User } from '@/types';
import { UserCard } from '../UserCard/UserCard';
import styles from './UserGrid.module.css';

interface UserGridProps {
  users: User[];
  onToggleFavorite: (user: User) => void;
  isFavorite: (userId: number) => boolean;
}

export const UserGrid = ({ users, onToggleFavorite, isFavorite }: UserGridProps) => {
  if (users.length === 0 || !users) {
    return (
      <div className={styles.emptyState}>
        No se encontraron usuarios
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
}; 
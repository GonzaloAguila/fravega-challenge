import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onToggleFavorite: (user: User) => void;
  isFavorite: (userId: number) => boolean;
}

export const UserCard = ({ user, onToggleFavorite, isFavorite }: UserCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        {imageError ? (
          <div className={styles.avatarPlaceholder}>
            {user.login.charAt(0).toUpperCase()}
          </div>
        ) : (
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={64}
            height={64}
            className={styles.avatar}
            onError={() => setImageError(true)}
          />
        )}
        <div className={styles.info}>
          <h2 className={styles.name}>
            <Link href={`/users/${user.login}`}>{user.login}</Link>
          </h2>
          <p className={styles.username}>@{user.login}</p>
        </div>
      </div>
      <button
        onClick={() => onToggleFavorite(user)}
        className={`${styles.favoriteButton} ${isFavorite(user.id) ? styles.active : ''}`}
        aria-label={isFavorite(user.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        {isFavorite(user.id) ? '⭐' : '☆'}
      </button>
    </div>
  );
}; 
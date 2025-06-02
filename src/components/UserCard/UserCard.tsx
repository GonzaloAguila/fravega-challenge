import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
  onToggleFavorite: (user: User) => void;
  isFavorite: boolean;
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
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={() => onToggleFavorite(user)}
          aria-label={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
}; 
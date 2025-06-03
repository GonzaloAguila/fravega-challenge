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
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleFavorite = () => {
    setIsAnimating(true);
    onToggleFavorite(user);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatarContainer}>
        {imageError ? (
          <div className={styles.avatarPlaceholder}>
            {user.login.charAt(0).toUpperCase()}
          </div>
        ) : (
          <Image
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={100}
            height={100}
            className={styles.avatar}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className={styles.content}>
        <Link href={`/users/${user.login}`} className={styles.username}>
          {user.login}
        </Link>
        <button
          onClick={handleToggleFavorite}
          className={`${styles.favoriteButton} ${isFavorite(user.id) ? styles.favorited : ''} ${isAnimating ? styles.animate : ''}`}
          aria-label={isFavorite(user.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          ★
        </button>
      </div>
    </div>
  );
}; 
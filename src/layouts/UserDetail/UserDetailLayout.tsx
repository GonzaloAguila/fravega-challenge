import { UserDetail, Repository } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import styles from './UserDetailLayout.module.css';

interface UserDetailLayoutProps {
  user: UserDetail;
  repos: Repository[];
}

export const UserDetailLayout = ({ user, repos }: UserDetailLayoutProps) => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Volver
        </Link>

        <div className={styles.profileCard}>
          <div className={styles.profileContent}>
            <Image
              src={user?.avatar_url}
              alt={user?.login}
              className={styles.avatar}
              width={128}
              height={128}
              priority
            />
            <div className={styles.profileInfo}>
              <div className={styles.nameContainer}>
                <h1 className={styles.name}>{user?.name || user?.login}</h1>
                <a
                  href={user?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.githubLink}
                >
                  Ver en GitHub →
                </a>
              </div>
              {user?.bio && <p className={styles.bio}>{user?.bio}</p>}
              <div className={styles.stats}>
                <span>{user?.followers} seguidores</span>
                <span>{user?.following} siguiendo</span>
                <span>{user?.public_repos} repositorios</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles.sectionTitle}>Repositorios</h2>
        <div className={styles.repoGrid}>
          {repos?.map((repo) => (
            <div key={repo.id} className={styles.repoCard}>
              <h3 className={styles.repoName}>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {repo?.name}
                </a>
              </h3>
              {repo?.description && (
                <p className={styles.repoDescription}>{repo?.description}</p>
              )}
              <div className={styles.repoStats}>
                <span>⭐ {repo?.stargazers_count}</span>
                {repo?.language && <span>🔤 {repo?.language}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}; 
import Link from 'next/link';
import styles from './NotFoundLayout.module.css';

export const NotFoundLayout = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>¡Ups! 😅</h1>
        <p className={styles.message}>No pudimos encontrar el usuario que estás buscando.</p>
        <Link href="/" className={styles.button}>
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}; 
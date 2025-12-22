import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandInfo}>
          <span className={styles.brandName}>Литера</span>
          <span className={styles.slogan}>Тихое место для книг</span>
        </div>
        <nav className={styles.footerLinks}>
          <a href="#">О проекте</a>
          <a href="#">Контакты</a>
          <a href="#">Правообладателям</a>
        </nav>
      </div>
    </footer>
  );
}
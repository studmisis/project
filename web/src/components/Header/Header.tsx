import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoGroup}>
          <span className={styles.logoText}>Литера</span>
          <span className={styles.logoIcon}>
            <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.3642 19.2477C11.9684 18.7477 11.2184 18.6227 10.6976 19.0185C10.5517 19.1435 10.4267 19.2894 10.3434 19.456L0.135059 39.8935C-0.177441 40.4977 0.0725585 41.2269 0.676725 41.5394C0.843392 41.6644 1.05173 41.6644 1.23923 41.6644H15.4476C15.9059 41.6644 16.3434 41.4144 16.5517 40.9977C19.6142 34.6435 17.7184 24.9977 12.3642 19.2477ZM19.8642 0.643526C14.6976 8.62269 14.0934 18.7477 18.2809 27.2685L25.1351 40.9977C25.3642 41.4144 25.7809 41.6644 26.2392 41.6644H40.4476C40.7736 41.6644 41.0862 41.5349 41.3167 41.3043C41.5472 41.0738 41.6767 40.7612 41.6767 40.4352C41.6767 40.2477 41.6767 40.0602 41.5517 39.8935C41.5517 39.8935 22.4267 1.60186 21.8851 0.643526C21.6559 0.0810264 20.9684 -0.168974 20.3851 0.122693C20.1559 0.22686 19.9684 0.41436 19.8642 0.643526Z" fill="#C46A45"/>
            </svg>
          </span>
        </div>
        
        <h1 className={styles.mainTitle}>Твоя личная библиотека</h1>
        
        <nav className={styles.userActions}>
          <button aria-label="Закладки">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bookmark" viewBox="0 0 16 16">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
            </svg>
          </button>
          <button aria-label="Прочитано">
            <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.75 20.16L10 17.16L11.16 16L12.75 17.59L16.34 14L17.5 15.41L12.75 20.16ZM2 20C0.89 20 0 19.1 0 18V2C0 0.89 0.89 0 2 0H3V7L5.5 5.5L8 7V0H14C15.1 0 16 0.89 16 2V11.34C15.37 11.12 14.7 11 14 11C10.69 11 8 13.69 8 17C8 18.09 8.29 19.12 8.8 20H2Z" fill="#C46A45"/>
            </svg>
          </button>
          <button aria-label="Любимое">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
            </svg>
          </button>
          <button aria-label="Профиль">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
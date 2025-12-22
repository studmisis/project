import { useEffect, useState } from 'react';
import { bookService } from '../../services/api';
import { BookCard } from '../../components/BookCard/BookCard';
import styles from './MainPage.module.scss';

export function MainPage() {
  const [books, setBooks] = useState<any[]>([]);
  // Состояние для режима отображения: 'grid' или 'list'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    bookService.getAllBooks().then(setBooks).catch(console.error);
  }, []);

  const sections = [
    { title: "Самые ожидаемые новинки этого года", data: books.slice(0, 10) },
    { title: "То, что должен прочитать каждый", data: books.slice(10, 20) },
    { title: "Ученье — свет, а неученье — тьма", data: books.slice(20, 30) }
  ];

  return (
    <div className={styles.mainContainer}>
      <section className={styles.toolbar}>
        <div className={styles.searchWrapper}>
          <input type="text" placeholder="Введите название книги или имя автора" />
          <button className={styles.searchIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>
          </button>
        </div>
        <div className={styles.controls}>
          <div className={styles.dropdown}>Каталог ⌵</div>
          <div className={styles.iconBtn}>
             {/* ... иконка сортировки ... */}
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"/>
            </svg>
          </div>
          <div className={styles.iconBtn}>
            {/* ... иконка фильтра ... */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"/>
            </svg>
          </div>
          <div className={styles.viewToggle}>
            <button 
              className={viewMode === 'grid' ? styles.active : ''} 
              onClick={() => setViewMode('grid')}
            >
              <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 16.6667H16.6667V0H0M4.16667 4.16667H12.5V12.5H4.16667M20.8333 37.5H37.5V20.8333H20.8333M25 25H33.3333V33.3333H25M0 37.5H16.6667V20.8333H0M4.16667 25H12.5V33.3333H4.16667M20.8333 0V16.6667H37.5V0M33.3333 12.5H25V4.16667H33.3333V12.5Z" fill="currentColor"/>
              </svg>
            </button>
            <button 
              className={viewMode === 'list' ? styles.active : ''} 
              onClick={() => setViewMode('list')}
            >
              <svg width="38" height="34" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H8.33333V8.33333H0V0ZM12.5 2.08333V6.25H37.5V2.08333H12.5ZM0 12.5H8.33333V20.8333H0V12.5ZM12.5 14.5833V18.75H37.5V14.5833H12.5ZM0 25H8.33333V33.3333H0V25ZM12.5 27.0833V31.25H37.5V27.0833H12.5Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {sections.map((section, idx) => (
        <section key={idx} className={styles.bookSection}>
          <div className={styles.sectionHeader}>
            <h2>{section.title}</h2>
          </div>
          <div className={viewMode === 'grid' ? styles.scrollContainer : styles.listContainer}>
            {section.data.map((book: any) => (
              <div key={book.id} className={viewMode === 'grid' ? styles.cardWrapper : styles.listCardWrapper}>
                <BookCard 
                  image={book.bookImageUrl ?? 'https://avatars.mds.yandex.net/get-kinopoisk-image/6201401/de32ae33-7df3-4516-b543-6118e67a277b/600x900'}
                  title={book.bookTitle}
                  author={`${book.author.authorName} ${book.author.authorSurname}`}
                  rating="4,5/5"
                  viewType={viewMode}
                />
                {viewMode === 'list' && (
                  <div className={styles.bookDescription}>
                    <p className={styles.text}>
                      Описание: {book.bookDescription || "Уникальный сборник, который приглашает вас в увлекательное путешествие..."}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
      {viewMode === 'list' && <button className={styles.loadMore}>Загрузить еще</button>}
    </div>
  );
}
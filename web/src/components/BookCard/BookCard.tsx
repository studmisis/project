import styles from './BookCard.module.scss';

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  rating: string;
}

export function BookCard({ image, title, author, rating }: BookCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} loading="lazy" className={styles.bookImage} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>
        <p className={styles.rating}>{rating}</p>
      </div>
    </article>
  );
}
import Image from 'next/image';
import { format } from 'date-fns';
import truncateText from '../utils/truncateText';
import styles from '../styles/MovieCard.module.css';

interface MovieProps {
  movie: {
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
    genre_ids: number[];
  };
}

export default function MovieCard({ movie }: MovieProps) {
  const placeholderGenres = ['Action', 'Drama']; // Replace with real data later
  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), 'MMMM d, yyyy')
    : 'Unknown Release Date';

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : '/images/return.png'
          }
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.date}> {formattedDate}</p>
        <div className={styles.genres}>
          {placeholderGenres.map((genre, index) => (
            <span key={index} className={styles.genreTag}>
              {genre}
            </span>
          ))}
        </div>
        <p className={styles.description}>{truncateText(movie.overview || 'No description available.', 150)}</p>
      </div>
    </div>
  );
}

import { GetServerSideProps } from 'next';
import MovieCard from '../components/MovieCard';
import styles from '../styles/Layout.module.css';

interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}


export default function Home({ movies }: { movies: Movie[] }) {
  return (
    <div className={styles.container}>
      
      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
  if (!API_KEY) {
    throw new Error('API key is missing. Check your .env.local configuration.');
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=return`
  );
  const data = await response.json();
  return { props: { movies: data.results || [] } };
};

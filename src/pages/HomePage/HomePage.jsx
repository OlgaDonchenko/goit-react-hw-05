import { useEffect, useState } from "react";
import { getTrendMovies } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true);

        const movies = await getTrendMovies();
        setMovies(movies);
      } catch (error) {
        console.error("Error fetching trending movies:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <main>
      <h1>Trending Movies</h1>
      {loading && <Loader />}
      <MovieList movies={movies} />
    </main>
  );
}

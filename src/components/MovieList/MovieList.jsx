import MovieListItem from "../MovieListItem/MovieListItem";

export default function MovieList({ movies = [] }) {
  if (!Array.isArray(movies)) {
    return <div>No movies available</div>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieListItem movie={movie} />
        </li>
      ))}
    </ul>
  );
}

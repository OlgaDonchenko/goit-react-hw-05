import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { getMovieDetailsById } from "../../movies-api";
import { Suspense, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const backLinkURL = useRef(location.state ?? "/");

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.btnLink, isActive && css.active);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetailsById(movieId);
        setMovie(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const userScore = movie ? (Number(movie.vote_average) * 10).toFixed(0) : null;

  return (
    <main>
      <section className={css.containerDeteilsPage}>
        <Link to={backLinkURL.current}>Go back</Link>
        {loading && <p>Loading information...</p>}
        {movie && (
          <div className={css.box}>
            <div className={css.wrapper}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : null
                }
                alt={movie.original_title}
                width="350"
                height="500"
              />
              <div>
                <h2>{movie.original_title}</h2>
                <p>{movie.tagline}</p>
                <p>
                  <span>Release date:</span> {movie.release_date}
                </p>
                {userScore !== "0" && userScore !== null && (
                  <div>
                    <p>
                      <span>User Score:</span> {userScore}&#37;
                    </p>
                  </div>
                )}
                <h3>Overview</h3>
                <p>{movie.overview}</p>
                <h3>Genres</h3>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </section>
      <section className={css.boxInfo}>
        <nav className={css.castReview}>
          <NavLink className={buildLinkClass} to={`cast`}>
            Cast
          </NavLink>
          <NavLink className={buildLinkClass} to={`reviews`}>
            Reviews
          </NavLink>
        </nav>
        <Suspense fallback={<div>Please wait, loading page...</div>}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
}

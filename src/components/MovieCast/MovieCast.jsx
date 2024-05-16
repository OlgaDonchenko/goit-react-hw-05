import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCastById } from "../../movies-api";
import MovieCastItem from "../MovieCastItem/MovieCastItem";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        setLoading(true);
        setCast([]);
        const castData = await getMovieCastById(movieId);
        setCast(castData);
      } catch (error) {
        console.error("Error fetching cast:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading ... </p>}
      {cast && (
        <ul className={css.castList}>
          {cast.map((cast) => (
            <li key={cast.id}>
              <MovieCastItem data={cast} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { Link, useLocation } from "react-router-dom";

export default function MovieItem({ movie: { id, title } }) {
  const location = useLocation();

  return (
    <div>
      <Link to={`/movies/${id}`} state={location}>
        {title}
      </Link>
    </div>
  );
}
